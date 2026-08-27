"use client";

import React, { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Plus, Search, Download, FolderKanban, Users, RefreshCw, LogOut, Calendar, X, Edit, Trash } from "lucide-react";

interface LeadItem {
  _id: string;
  clientName: string;
  company?: string;
  email: string;
  phone: string;
  eventCity?: string;
  requirement?: string;
  configuredLayout?: {
    shape?: string;
    width?: number;
    depth?: number;
    height?: number;
    themeColor?: string;
    features?: string[];
    estimatedPriceRange?: string;
  };
  message?: string;
  status: "New" | "Contacted" | "Closed";
  createdAt: string;
}

interface ProjectItem {
  _id: string;
  title: string;
  slug: string;
  category: string;
  clientName: string;
  location: string;
  featuredImage: string;
  createdAt: string;
}

interface ExhibitionItem {
  _id: string;
  title: string;
  slug: string;
  startDate: string;
  endDate: string;
  location: string;
  venue: string;
  descriptionMarkdown: string;
  featuredImage: string;
  status: "Draft" | "Published";
  createdAt: string;
}

export default function AdminDashboardPage() {
  const { status } = useSession();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<"leads" | "projects" | "events">("leads");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Data lists
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [exhibitions, setExhibitions] = useState<ExhibitionItem[]>([]);
  
  // Loading states
  const [loadingLeads, setLoadingLeads] = useState(false);
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [loadingExhibitions, setLoadingExhibitions] = useState(false);

  // Modals state
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isExhibitionModalOpen, setIsExhibitionModalOpen] = useState(false);
  const [isEditProjectModalOpen, setIsEditProjectModalOpen] = useState(false);
  const [isEditExhibitionModalOpen, setIsEditExhibitionModalOpen] = useState(false);

  // Add Project Form State
  const [newProject, setNewProject] = useState({
    title: "",
    clientName: "",
    location: "",
    category: "Custom Stalls",
    featuredImage: "",
  });

  // Edit Project Form State
  const [editingProject, setEditingProject] = useState({
    _id: "",
    title: "",
    clientName: "",
    location: "",
    category: "Custom Stalls",
    featuredImage: "",
  });

  // Add Exhibition Form State
  const [newExhibition, setNewExhibition] = useState({
    title: "",
    startDate: "",
    endDate: "",
    location: "",
    venue: "",
    descriptionMarkdown: "",
    featuredImage: "",
    status: "Published" as "Draft" | "Published",
  });

  // Edit Exhibition Form State
  const [editingExhibition, setEditingExhibition] = useState({
    _id: "",
    title: "",
    startDate: "",
    endDate: "",
    location: "",
    venue: "",
    descriptionMarkdown: "",
    featuredImage: "",
    status: "Published" as "Draft" | "Published",
  });

  // Action feedback states
  const [actionError, setActionError] = useState("");
  const [actionSubmitting, setActionSubmitting] = useState(false);

  // Route protection
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  const fetchLeads = async () => {
    setLoadingLeads(true);
    try {
      const res = await fetch("/api/leads");
      if (res.ok) {
        const data = await res.json();
        if (data.leads) {
          setLeads(data.leads);
        }
      }
    } catch (err) {
      console.error("Failed to fetch leads:", err);
    } finally {
      setLoadingLeads(false);
    }
  };

  const fetchProjects = async () => {
    setLoadingProjects(true);
    try {
      const res = await fetch("/api/projects");
      if (res.ok) {
        const data = await res.json();
        if (data.projects) {
          setProjects(data.projects);
        }
      }
    } catch (err) {
      console.error("Failed to fetch projects:", err);
    } finally {
      setLoadingProjects(false);
    }
  };

  const fetchExhibitions = async () => {
    setLoadingExhibitions(true);
    try {
      const res = await fetch("/api/exhibitions");
      if (res.ok) {
        const data = await res.json();
        if (data.exhibitions) {
          setExhibitions(data.exhibitions);
        }
      }
    } catch (err) {
      console.error("Failed to fetch exhibitions:", err);
    } finally {
      setLoadingExhibitions(false);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      fetchLeads();
      fetchProjects();
      fetchExhibitions();
    }
  }, [status]);

  // Lead status update
  const handleUpdateLeadStatus = async (leadId: string, newStatus: "New" | "Contacted" | "Closed") => {
    try {
      const res = await fetch(`/api/leads/${leadId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setLeads((prev) =>
          prev.map((lead) => (lead._id === leadId ? { ...lead, status: newStatus } : lead))
        );
      } else {
        console.error("Failed to update status");
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  // Export CSV
  const handleExportCSV = () => {
    if (filteredLeads.length === 0) return;
    const headers = ["Client Name", "Company", "Email", "Phone", "City", "Requirement", "Status", "Date"];
    const rows = filteredLeads.map((lead) => [
      `"${lead.clientName.replace(/"/g, '""')}"`,
      `"${(lead.company || "").replace(/"/g, '""')}"`,
      `"${lead.email}"`,
      `"${lead.phone}"`,
      `"${(lead.eventCity || "").replace(/"/g, '""')}"`,
      `"${(lead.requirement || "").replace(/"/g, '""')}"`,
      `"${lead.status}"`,
      `"${new Date(lead.createdAt).toLocaleDateString("en-IN")}"`,
    ]);
    const csvContent = "data:text/csv;charset=utf-8,"
      + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Kioskra_Leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Helper to generate URL-friendly slug
  const generateSlug = (text: string) =>
    text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

  // Add Project Submission
  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionError("");
    setActionSubmitting(true);

    const slug = generateSlug(newProject.title);
    const payload = { ...newProject, slug, galleryImages: [], description: "" };

    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setIsProjectModalOpen(false);
        setNewProject({
          title: "",
          clientName: "",
          location: "",
          category: "Custom Stalls",
          featuredImage: "",
        });
        fetchProjects();
      } else {
        const errorData = await res.json();
        setActionError(errorData.error || "Failed to create project.");
      }
    } catch (err) {
      setActionError("Unexpected error occurred.");
    } finally {
      setActionSubmitting(false);
    }
  };

  // Edit Project Action Handlers
  const openEditProjectModal = (project: ProjectItem) => {
    setActionError("");
    setEditingProject({
      _id: project._id,
      title: project.title,
      clientName: project.clientName,
      location: project.location,
      category: project.category,
      featuredImage: project.featuredImage,
    });
    setIsEditProjectModalOpen(true);
  };

  const handleEditProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionError("");
    setActionSubmitting(true);

    try {
      const res = await fetch(`/api/projects/${editingProject._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingProject),
      });

      if (res.ok) {
        setIsEditProjectModalOpen(false);
        fetchProjects();
      } else {
        const errorData = await res.json();
        setActionError(errorData.error || "Failed to update project.");
      }
    } catch (err) {
      setActionError("Unexpected error occurred.");
    } finally {
      setActionSubmitting(false);
    }
  };

  const handleDeleteProject = async (projectId: string) => {
    if (!confirm("Are you sure you want to delete this project? This cannot be undone.")) return;
    try {
      const res = await fetch(`/api/projects/${projectId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchProjects();
      } else {
        alert("Failed to delete the project.");
      }
    } catch (err) {
      console.error("Delete project error:", err);
    }
  };

  // Add Exhibition Submission
  const handleAddExhibition = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionError("");
    setActionSubmitting(true);

    const slug = generateSlug(newExhibition.title);
    const payload = { ...newExhibition, slug };

    try {
      const res = await fetch("/api/exhibitions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setIsExhibitionModalOpen(false);
        setNewExhibition({
          title: "",
          startDate: "",
          endDate: "",
          location: "",
          venue: "",
          descriptionMarkdown: "",
          featuredImage: "",
          status: "Published",
        });
        fetchExhibitions();
      } else {
        const errorData = await res.json();
        setActionError(errorData.error || "Failed to create exhibition.");
      }
    } catch (err) {
      setActionError("Unexpected error occurred.");
    } finally {
      setActionSubmitting(false);
    }
  };

  // Edit Exhibition Action Handlers
  const openEditExhibitionModal = (ex: ExhibitionItem) => {
    setActionError("");
    setEditingExhibition({
      _id: ex._id,
      title: ex.title,
      startDate: new Date(ex.startDate).toISOString().split("T")[0],
      endDate: new Date(ex.endDate).toISOString().split("T")[0],
      location: ex.location,
      venue: ex.venue,
      descriptionMarkdown: ex.descriptionMarkdown,
      featuredImage: ex.featuredImage,
      status: ex.status,
    });
    setIsEditExhibitionModalOpen(true);
  };

  const handleEditExhibition = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionError("");
    setActionSubmitting(true);

    try {
      const res = await fetch(`/api/exhibitions/${editingExhibition._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingExhibition),
      });

      if (res.ok) {
        setIsEditExhibitionModalOpen(false);
        fetchExhibitions();
      } else {
        const errorData = await res.json();
        setActionError(errorData.error || "Failed to update exhibition.");
      }
    } catch (err) {
      setActionError("Unexpected error occurred.");
    } finally {
      setActionSubmitting(false);
    }
  };

  const handleDeleteExhibition = async (exhibitionId: string) => {
    if (!confirm("Are you sure you want to delete this exhibition? This cannot be undone.")) return;
    try {
      const res = await fetch(`/api/exhibitions/${exhibitionId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchExhibitions();
      } else {
        alert("Failed to delete the exhibition.");
      }
    } catch (err) {
      console.error("Delete exhibition error:", err);
    }
  };

  // Filtering leads based on search query
  const filteredLeads = leads.filter((lead) => {
    const q = searchQuery.toLowerCase();
    return (
      lead.clientName.toLowerCase().includes(q) ||
      lead.email.toLowerCase().includes(q) ||
      (lead.company && lead.company.toLowerCase().includes(q)) ||
      (lead.requirement && lead.requirement.toLowerCase().includes(q))
    );
  });

  // Filtering projects based on search query
  const filteredProjects = projects.filter((project) => {
    const q = searchQuery.toLowerCase();
    return (
      project.title.toLowerCase().includes(q) ||
      project.clientName.toLowerCase().includes(q) ||
      project.location.toLowerCase().includes(q)
    );
  });

  // Filtering exhibitions based on search query
  const filteredExhibitions = exhibitions.filter((ex) => {
    const q = searchQuery.toLowerCase();
    return (
      ex.title.toLowerCase().includes(q) ||
      ex.venue.toLowerCase().includes(q) ||
      ex.location.toLowerCase().includes(q)
    );
  });

  if (status === "loading" || status === "unauthenticated") {
    return (
      <div className="min-h-screen bg-[#F5F4F1] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#2F6BFF]"></div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20 min-h-screen bg-warm text-dark px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto relative">
      {/* Dashboard Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 pb-6 border-b border-stone gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#2F6BFF]">
            Kioskra CMS Portal
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-dark">
            Admin Management Dashboard
          </h1>
        </div>

        {/* Tab Selection & Logout */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => { setActiveTab("leads"); setSearchQuery(""); }}
            className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === "leads"
                ? "bg-dark text-white shadow-md"
                : "bg-white text-dark hover:bg-stone"
            }`}
          >
            Leads Overview ({leads.length})
          </button>
          <button
            onClick={() => { setActiveTab("projects"); setSearchQuery(""); }}
            className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === "projects"
                ? "bg-dark text-white shadow-md"
                : "bg-white text-dark hover:bg-stone"
            }`}
          >
            Projects CMS ({projects.length})
          </button>
          <button
            onClick={() => { setActiveTab("events"); setSearchQuery(""); }}
            className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === "events"
                ? "bg-dark text-white shadow-md"
                : "bg-white text-dark hover:bg-stone"
            }`}
          >
            Events CMS ({exhibitions.length})
          </button>

          <hr className="w-px h-6 bg-stone border-none hidden sm:block" />

          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider bg-rose-100 hover:bg-rose-200 text-rose-800 transition-all cursor-pointer border-none"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div className="p-6 rounded-2xl bg-white border border-stone shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#2F6BFF] flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-extrabold block">{leads.length}</span>
            <span className="text-xs text-dark/60 uppercase font-bold tracking-wider">
              Total Inquiries & 3D Configs
            </span>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-stone shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <FolderKanban className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-extrabold block">{projects.length}</span>
            <span className="text-xs text-dark/60 uppercase font-bold tracking-wider">
              Active Projects
            </span>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-stone shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-extrabold block">{exhibitions.length}</span>
            <span className="text-xs text-dark/60 uppercase font-bold tracking-wider">
              SEO Exhibitions Calendar
            </span>
          </div>
        </div>
      </div>

      {/* Leads Table Section */}
      {activeTab === "leads" && (
        <div className="bg-white rounded-3xl border border-stone p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
            <div className="flex items-center gap-3">
              <h3 className="text-xl font-extrabold text-dark">Inquiries & Configured Leads</h3>
              <button
                onClick={fetchLeads}
                className="p-2 rounded-full hover:bg-stone text-dark/60 transition-colors border-none cursor-pointer"
                title="Refresh leads"
              >
                <RefreshCw className={`w-4 h-4 ${loadingLeads ? "animate-spin" : ""}`} />
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-end">
              <button
                onClick={handleExportCSV}
                disabled={filteredLeads.length === 0}
                className="inline-flex items-center gap-1.5 bg-neutral-900 text-white font-semibold text-xs px-4 py-2 rounded-xl hover:bg-neutral-800 shadow-md cursor-pointer disabled:opacity-50 border-none"
              >
                <Download className="w-4 h-4" />
                <span>Export CSV</span>
              </button>

              <div className="relative flex-grow sm:flex-grow-0">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-dark/40" />
                <input
                  type="text"
                  placeholder="Search leads..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-2 rounded-xl bg-warm border border-stone text-xs font-semibold focus:outline-none focus:border-[#2F6BFF]"
                />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-stone text-dark/60 font-bold uppercase tracking-wider">
                  <th className="py-3 px-4">Client Name</th>
                  <th className="py-3 px-4">Company</th>
                  <th className="py-3 px-4">Contact</th>
                  <th className="py-3 px-4">City</th>
                  <th className="py-3 px-4">Requirement / Configured Specs</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone/60 text-dark font-medium">
                {filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-dark/50">
                      No leads recorded yet. Submissions from the contact section or 3D Configurator will appear here.
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead) => (
                    <tr key={lead._id} className="hover:bg-warm/50 transition-colors">
                      <td className="py-4 px-4 font-bold text-dark">{lead.clientName}</td>
                      <td className="py-4 px-4">{lead.company || "—"}</td>
                      <td className="py-4 px-4">
                        <div>{lead.email}</div>
                        <div className="text-[11px] text-dark/50">{lead.phone}</div>
                      </td>
                      <td className="py-4 px-4">{lead.eventCity || "—"}</td>
                      <td className="py-4 px-4">
                        <div className="font-semibold text-[#2F6BFF]">
                          {lead.requirement || "Custom Exhibition Inquiry"}
                        </div>
                        {lead.configuredLayout?.estimatedPriceRange && (
                          <div className="text-[10px] text-dark/70 font-mono mt-0.5">
                            Est: {lead.configuredLayout.estimatedPriceRange}
                          </div>
                        )}
                        {lead.message && (
                          <div className="text-[10px] text-dark/50 mt-1 max-w-sm overflow-hidden text-ellipsis line-clamp-2">
                            {lead.message}
                          </div>
                        )}
                      </td>
                      <td className="py-4 px-4">
                        <select
                          value={lead.status}
                          onChange={(e) => handleUpdateLeadStatus(lead._id, e.target.value as any)}
                          className={`px-2.5 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider border focus:outline-none cursor-pointer ${
                            lead.status === "New"
                              ? "bg-amber-50 border-amber-300 text-amber-800"
                              : lead.status === "Contacted"
                              ? "bg-blue-50 border-blue-300 text-blue-800"
                              : "bg-emerald-50 border-emerald-300 text-emerald-800"
                          }`}
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Closed">Closed</option>
                        </select>
                      </td>
                      <td className="py-4 px-4 text-right text-dark/50">
                        {new Date(lead.createdAt).toLocaleDateString("en-IN")}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Projects CMS Section */}
      {activeTab === "projects" && (
        <div className="bg-white rounded-3xl border border-stone p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
            <div className="flex items-center gap-3">
              <h3 className="text-xl font-extrabold text-dark">Portfolio Projects Management</h3>
              <button
                onClick={fetchProjects}
                className="p-2 rounded-full hover:bg-stone text-dark/60 transition-colors border-none cursor-pointer"
                title="Refresh projects"
              >
                <RefreshCw className={`w-4 h-4 ${loadingProjects ? "animate-spin" : ""}`} />
              </button>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <div className="relative flex-grow sm:flex-grow-0">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-dark/40" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-2 rounded-xl bg-warm border border-stone text-xs font-semibold focus:outline-none focus:border-[#2F6BFF]"
                />
              </div>

              <button
                onClick={() => setIsProjectModalOpen(true)}
                className="inline-flex items-center gap-1.5 bg-[#2F6BFF] text-white font-semibold text-xs px-5 py-2.5 rounded-full hover:bg-blue-600 shadow-md cursor-pointer border-none"
              >
                <Plus className="w-4 h-4" />
                <span>Add Project</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-stone text-dark/60 font-bold uppercase tracking-wider">
                  <th className="py-3 px-4">Thumbnail</th>
                  <th className="py-3 px-4">Project Title</th>
                  <th className="py-3 px-4">Slug</th>
                  <th className="py-3 px-4">Client</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Created Date</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone/60 text-dark font-medium">
                {filteredProjects.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-8 text-center text-dark/50">
                      No portfolio projects recorded yet. Click "+ Add Project" to record one.
                    </td>
                  </tr>
                ) : (
                  filteredProjects.map((project) => (
                    <tr key={project._id} className="hover:bg-warm/50 transition-colors">
                      <td className="py-3 px-4">
                        <div className="relative w-12 h-10 rounded-lg overflow-hidden bg-neutral-900 border border-stone">
                          <img
                            src={project.featuredImage}
                            alt={project.title}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      </td>
                      <td className="py-3 px-4 font-bold text-dark">{project.title}</td>
                      <td className="py-3 px-4 font-mono text-dark/50 text-[10px]">{project.slug}</td>
                      <td className="py-3 px-4">{project.clientName}</td>
                      <td className="py-3 px-4">{project.location}</td>
                      <td className="py-3 px-4">
                        <span className="px-2.5 py-1 rounded bg-stone/50 font-bold uppercase text-[9px]">
                          {project.category}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-dark/50">
                        {new Date(project.createdAt).toLocaleDateString("en-IN")}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => openEditProjectModal(project)}
                            className="p-1.5 rounded-lg hover:bg-stone text-dark/70 hover:text-dark transition-all cursor-pointer border-none bg-transparent"
                            title="Edit Project"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteProject(project._id)}
                            className="p-1.5 rounded-lg hover:bg-rose-50 text-rose-600 hover:text-rose-800 transition-all cursor-pointer border-none bg-transparent"
                            title="Delete Project"
                          >
                            <Trash className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Events CMS Section */}
      {activeTab === "events" && (
        <div className="bg-white rounded-3xl border border-stone p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
            <div className="flex items-center gap-3">
              <h3 className="text-xl font-extrabold text-dark">SEO Exhibition Events Calendar</h3>
              <button
                onClick={fetchExhibitions}
                className="p-2 rounded-full hover:bg-stone text-dark/60 transition-colors border-none cursor-pointer"
                title="Refresh exhibitions"
              >
                <RefreshCw className={`w-4 h-4 ${loadingExhibitions ? "animate-spin" : ""}`} />
              </button>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <div className="relative flex-grow sm:flex-grow-0">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-dark/40" />
                <input
                  type="text"
                  placeholder="Search events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-2 rounded-xl bg-warm border border-stone text-xs font-semibold focus:outline-none focus:border-[#2F6BFF]"
                />
              </div>

              <button
                onClick={() => setIsExhibitionModalOpen(true)}
                className="inline-flex items-center gap-1.5 bg-[#2F6BFF] text-white font-semibold text-xs px-5 py-2.5 rounded-full hover:bg-blue-600 shadow-md cursor-pointer border-none"
              >
                <Plus className="w-4 h-4" />
                <span>Add Event</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-stone text-dark/60 font-bold uppercase tracking-wider">
                  <th className="py-3 px-4">Banner</th>
                  <th className="py-3 px-4">Exhibition Title</th>
                  <th className="py-3 px-4">Slug</th>
                  <th className="py-3 px-4">Venue & Location</th>
                  <th className="py-3 px-4">Date Range</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Created Date</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone/60 text-dark font-medium">
                {filteredExhibitions.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-8 text-center text-dark/50">
                      No SEO exhibitions recorded yet. Click "+ Add Event" to publish one.
                    </td>
                  </tr>
                ) : (
                  filteredExhibitions.map((ex) => (
                    <tr key={ex._id} className="hover:bg-warm/50 transition-colors">
                      <td className="py-3 px-4">
                        <div className="relative w-12 h-10 rounded-lg overflow-hidden bg-neutral-900 border border-stone">
                          <img
                            src={ex.featuredImage}
                            alt={ex.title}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      </td>
                      <td className="py-3 px-4 font-bold text-dark">{ex.title}</td>
                      <td className="py-3 px-4 font-mono text-dark/50 text-[10px]">{ex.slug}</td>
                      <td className="py-3 px-4">
                        <div>{ex.venue}</div>
                        <div className="text-[10px] text-dark/50">{ex.location}</div>
                      </td>
                      <td className="py-3 px-4">
                        {new Date(ex.startDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" })} - {new Date(ex.endDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2.5 py-1 rounded font-bold uppercase text-[9px] ${
                          ex.status === "Published"
                            ? "bg-emerald-50 border border-emerald-300 text-emerald-800"
                            : "bg-stone border border-stone-300 text-dark/60"
                        }`}>
                          {ex.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-dark/50">
                        {new Date(ex.createdAt).toLocaleDateString("en-IN")}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => openEditExhibitionModal(ex)}
                            className="p-1.5 rounded-lg hover:bg-stone text-dark/70 hover:text-dark transition-all cursor-pointer border-none bg-transparent"
                            title="Edit Exhibition"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteExhibition(ex._id)}
                            className="p-1.5 rounded-lg hover:bg-rose-50 text-rose-600 hover:text-rose-800 transition-all cursor-pointer border-none bg-transparent"
                            title="Delete Exhibition"
                          >
                            <Trash className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* 1. ADD PORTFOLIO PROJECT MODAL */}
      {/* ==================================================== */}
      {isProjectModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-[#191A1A] border border-white/10 rounded-3xl p-6 sm:p-8 text-white relative shadow-2xl animate-fade-in">
            <button
              onClick={() => setIsProjectModalOpen(false)}
              className="absolute top-5 right-5 text-white/50 hover:text-white transition-colors border-none bg-transparent cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-extrabold mb-1">Create Portfolio Project</h3>
            <p className="text-xs text-white/60 mb-6">Register a completed design or turnkey booth in the catalog.</p>

            {actionError && (
              <div className="p-3 rounded-lg bg-red-950/50 border border-red-500/25 text-red-400 text-xs font-semibold text-center mb-4">
                {actionError}
              </div>
            )}

            <form onSubmit={handleAddProject} className="space-y-4">
              <div className="flex flex-col gap-1">
                <label className="text-[9px] font-bold uppercase tracking-wider text-white/80">Project Title *</label>
                <input
                  type="text"
                  required
                  value={newProject.title}
                  onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                  placeholder="e.g. Voltas Smart Living Pavilion"
                  className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-[#2F6BFF]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-bold uppercase tracking-wider text-white/80">Client Name *</label>
                  <input
                    type="text"
                    required
                    value={newProject.clientName}
                    onChange={(e) => setNewProject({ ...newProject, clientName: e.target.value })}
                    placeholder="e.g. Voltas India"
                    className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-[#2F6BFF]"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-bold uppercase tracking-wider text-white/80">Location *</label>
                  <input
                    type="text"
                    required
                    value={newProject.location}
                    onChange={(e) => setNewProject({ ...newProject, location: e.target.value })}
                    placeholder="e.g. Pragati Maidan, Delhi"
                    className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-[#2F6BFF]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-bold uppercase tracking-wider text-white/80">Category *</label>
                  <select
                    value={newProject.category}
                    onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#191A1A] border border-white/10 text-white text-xs focus:outline-none focus:border-[#2F6BFF]"
                  >
                    <option value="Custom Stalls">Custom Stalls</option>
                    <option value="Double Decker">Double Decker</option>
                    <option value="Turnkey Solutions">Turnkey Solutions</option>
                    <option value="3D Renders">3D Renders</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-bold uppercase tracking-wider text-white/80">Image URL *</label>
                  <input
                    type="text"
                    required
                    value={newProject.featuredImage}
                    onChange={(e) => setNewProject({ ...newProject, featuredImage: e.target.value })}
                    placeholder="e.g. /images/Designs/1.png"
                    className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-[#2F6BFF]"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsProjectModalOpen(false)}
                  className="px-4 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/5 hover:bg-white/10 text-white border-none cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionSubmitting}
                  className="px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#2F6BFF] hover:brightness-110 text-white border-none cursor-pointer disabled:opacity-50"
                >
                  {actionSubmitting ? "Creating..." : "Save Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* 2. EDIT PORTFOLIO PROJECT MODAL */}
      {/* ==================================================== */}
      {isEditProjectModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-[#191A1A] border border-white/10 rounded-3xl p-6 sm:p-8 text-white relative shadow-2xl animate-fade-in">
            <button
              onClick={() => setIsEditProjectModalOpen(false)}
              className="absolute top-5 right-5 text-white/50 hover:text-white transition-colors border-none bg-transparent cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-extrabold mb-1">Edit Portfolio Project</h3>
            <p className="text-xs text-white/60 mb-6">Modify details of an existing portfolio entry.</p>

            {actionError && (
              <div className="p-3 rounded-lg bg-red-950/50 border border-red-500/25 text-red-400 text-xs font-semibold text-center mb-4">
                {actionError}
              </div>
            )}

            <form onSubmit={handleEditProject} className="space-y-4">
              <div className="flex flex-col gap-1">
                <label className="text-[9px] font-bold uppercase tracking-wider text-white/80">Project Title *</label>
                <input
                  type="text"
                  required
                  value={editingProject.title}
                  onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-[#2F6BFF]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-bold uppercase tracking-wider text-white/80">Client Name *</label>
                  <input
                    type="text"
                    required
                    value={editingProject.clientName}
                    onChange={(e) => setEditingProject({ ...editingProject, clientName: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-[#2F6BFF]"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-bold uppercase tracking-wider text-white/80">Location *</label>
                  <input
                    type="text"
                    required
                    value={editingProject.location}
                    onChange={(e) => setEditingProject({ ...editingProject, location: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-[#2F6BFF]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-bold uppercase tracking-wider text-white/80">Category *</label>
                  <select
                    value={editingProject.category}
                    onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#191A1A] border border-white/10 text-white text-xs focus:outline-none focus:border-[#2F6BFF]"
                  >
                    <option value="Custom Stalls">Custom Stalls</option>
                    <option value="Double Decker">Double Decker</option>
                    <option value="Turnkey Solutions">Turnkey Solutions</option>
                    <option value="3D Renders">3D Renders</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-bold uppercase tracking-wider text-white/80">Image URL *</label>
                  <input
                    type="text"
                    required
                    value={editingProject.featuredImage}
                    onChange={(e) => setEditingProject({ ...editingProject, featuredImage: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-[#2F6BFF]"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsEditProjectModalOpen(false)}
                  className="px-4 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/5 hover:bg-white/10 text-white border-none cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionSubmitting}
                  className="px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#2F6BFF] hover:brightness-110 text-white border-none cursor-pointer disabled:opacity-50"
                >
                  {actionSubmitting ? "Saving..." : "Update Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* 3. ADD SEO EXHIBITION EVENT MODAL */}
      {/* ==================================================== */}
      {isExhibitionModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-2xl bg-[#191A1A] border border-white/10 rounded-3xl p-6 sm:p-8 text-white relative shadow-2xl overflow-y-auto max-h-[90vh] animate-fade-in">
            <button
              onClick={() => setIsExhibitionModalOpen(false)}
              className="absolute top-5 right-5 text-white/50 hover:text-white transition-colors border-none bg-transparent cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-extrabold mb-1">Create SEO Exhibition Event</h3>
            <p className="text-xs text-white/60 mb-6">Register a new trade show on the public directory with JSON-LD Schema enabled.</p>

            {actionError && (
              <div className="p-3 rounded-lg bg-red-950/50 border border-red-500/25 text-red-400 text-xs font-semibold text-center mb-4">
                {actionError}
              </div>
            )}

            <form onSubmit={handleAddExhibition} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-bold uppercase tracking-wider text-white/80">Exhibition Title *</label>
                  <input
                    type="text"
                    required
                    value={newExhibition.title}
                    onChange={(e) => setNewExhibition({ ...newExhibition, title: e.target.value })}
                    placeholder="e.g. Plastindia 2027"
                    className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-[#2F6BFF]"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-bold uppercase tracking-wider text-white/80">Banner Image URL *</label>
                  <input
                    type="text"
                    required
                    value={newExhibition.featuredImage}
                    onChange={(e) => setNewExhibition({ ...newExhibition, featuredImage: e.target.value })}
                    placeholder="e.g. /images/Designs/51.png"
                    className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-[#2F6BFF]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-bold uppercase tracking-wider text-white/80">Start Date *</label>
                  <input
                    type="date"
                    required
                    value={newExhibition.startDate}
                    onChange={(e) => setNewExhibition({ ...newExhibition, startDate: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#191A1A] border border-white/10 text-white text-xs focus:outline-none focus:border-[#2F6BFF]"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-bold uppercase tracking-wider text-white/80">End Date *</label>
                  <input
                    type="date"
                    required
                    value={newExhibition.endDate}
                    onChange={(e) => setNewExhibition({ ...newExhibition, endDate: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#191A1A] border border-white/10 text-white text-xs focus:outline-none focus:border-[#2F6BFF]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-bold uppercase tracking-wider text-white/80">Venue Name *</label>
                  <input
                    type="text"
                    required
                    value={newExhibition.venue}
                    onChange={(e) => setNewExhibition({ ...newExhibition, venue: e.target.value })}
                    placeholder="e.g. Pragati Maidan"
                    className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-[#2F6BFF]"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-bold uppercase tracking-wider text-white/80">Location City *</label>
                  <input
                    type="text"
                    required
                    value={newExhibition.location}
                    onChange={(e) => setNewExhibition({ ...newExhibition, location: e.target.value })}
                    placeholder="e.g. New Delhi"
                    className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-[#2F6BFF]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-bold uppercase tracking-wider text-white/80">Status</label>
                  <select
                    value={newExhibition.status}
                    onChange={(e) => setNewExhibition({ ...newExhibition, status: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl bg-[#191A1A] border border-white/10 text-white text-xs focus:outline-none focus:border-[#2F6BFF]"
                  >
                    <option value="Published">Published</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[9px] font-bold uppercase tracking-wider text-white/80">Description Markdown *</label>
                <textarea
                  required
                  rows={4}
                  value={newExhibition.descriptionMarkdown}
                  onChange={(e) => setNewExhibition({ ...newExhibition, descriptionMarkdown: e.target.value })}
                  placeholder="### Key Benefits
* High exposure...
* Networking opportunities..."
                  className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-[#2F6BFF] resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsExhibitionModalOpen(false)}
                  className="px-4 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/5 hover:bg-white/10 text-white border-none cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionSubmitting}
                  className="px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#2F6BFF] hover:brightness-110 text-white border-none cursor-pointer disabled:opacity-50"
                >
                  {actionSubmitting ? "Publishing..." : "Save Event"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* 4. EDIT SEO EXHIBITION EVENT MODAL */}
      {/* ==================================================== */}
      {isEditExhibitionModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-2xl bg-[#191A1A] border border-white/10 rounded-3xl p-6 sm:p-8 text-white relative shadow-2xl overflow-y-auto max-h-[90vh] animate-fade-in">
            <button
              onClick={() => setIsEditExhibitionModalOpen(false)}
              className="absolute top-5 right-5 text-white/50 hover:text-white transition-colors border-none bg-transparent cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-extrabold mb-1">Edit SEO Exhibition Event</h3>
            <p className="text-xs text-white/60 mb-6">Modify trade show details in the event directory.</p>

            {actionError && (
              <div className="p-3 rounded-lg bg-red-950/50 border border-red-500/25 text-red-400 text-xs font-semibold text-center mb-4">
                {actionError}
              </div>
            )}

            <form onSubmit={handleEditExhibition} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-bold uppercase tracking-wider text-white/80">Exhibition Title *</label>
                  <input
                    type="text"
                    required
                    value={editingExhibition.title}
                    onChange={(e) => setEditingExhibition({ ...editingExhibition, title: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-[#2F6BFF]"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-bold uppercase tracking-wider text-white/80">Banner Image URL *</label>
                  <input
                    type="text"
                    required
                    value={editingExhibition.featuredImage}
                    onChange={(e) => setEditingExhibition({ ...editingExhibition, featuredImage: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-[#2F6BFF]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-bold uppercase tracking-wider text-white/80">Start Date *</label>
                  <input
                    type="date"
                    required
                    value={editingExhibition.startDate}
                    onChange={(e) => setEditingExhibition({ ...editingExhibition, startDate: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#191A1A] border border-white/10 text-white text-xs focus:outline-none focus:border-[#2F6BFF]"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-bold uppercase tracking-wider text-white/80">End Date *</label>
                  <input
                    type="date"
                    required
                    value={editingExhibition.endDate}
                    onChange={(e) => setEditingExhibition({ ...editingExhibition, endDate: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#191A1A] border border-white/10 text-white text-xs focus:outline-none focus:border-[#2F6BFF]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-bold uppercase tracking-wider text-white/80">Venue Name *</label>
                  <input
                    type="text"
                    required
                    value={editingExhibition.venue}
                    onChange={(e) => setEditingExhibition({ ...editingExhibition, venue: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-[#2F6BFF]"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-bold uppercase tracking-wider text-white/80">Location City *</label>
                  <input
                    type="text"
                    required
                    value={editingExhibition.location}
                    onChange={(e) => setEditingExhibition({ ...editingExhibition, location: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-[#2F6BFF]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-bold uppercase tracking-wider text-white/80">Status</label>
                  <select
                    value={editingExhibition.status}
                    onChange={(e) => setEditingExhibition({ ...editingExhibition, status: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl bg-[#191A1A] border border-white/10 text-white text-xs focus:outline-none focus:border-[#2F6BFF]"
                  >
                    <option value="Published">Published</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[9px] font-bold uppercase tracking-wider text-white/80">Description Markdown *</label>
                <textarea
                  required
                  rows={4}
                  value={editingExhibition.descriptionMarkdown}
                  onChange={(e) => setEditingExhibition({ ...editingExhibition, descriptionMarkdown: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-[#2F6BFF] resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsEditExhibitionModalOpen(false)}
                  className="px-4 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/5 hover:bg-white/10 text-white border-none cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionSubmitting}
                  className="px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#2F6BFF] hover:brightness-110 text-white border-none cursor-pointer disabled:opacity-50"
                >
                  {actionSubmitting ? "Saving..." : "Update Event"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
