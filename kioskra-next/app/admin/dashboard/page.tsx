"use client";

import React, { useState, useEffect } from "react";
import { Plus, Search, Download, FolderKanban, Users, Eye, RefreshCw } from "lucide-react";

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

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<"leads" | "projects">("leads");
  const [searchQuery, setSearchQuery] = useState("");
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchLeads = async () => {
    setLoading(true);
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
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const filteredLeads = leads.filter((lead) => {
    const q = searchQuery.toLowerCase();
    return (
      lead.clientName.toLowerCase().includes(q) ||
      lead.email.toLowerCase().includes(q) ||
      (lead.company && lead.company.toLowerCase().includes(q)) ||
      (lead.requirement && lead.requirement.toLowerCase().includes(q))
    );
  });

  return (
    <div className="pt-28 pb-20 min-h-screen bg-warm text-dark px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto">
      {/* Dashboard Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 pb-6 border-b border-stone gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-accent-blue">
            Kioskra CMS Portal
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-dark">
            Admin Management Dashboard
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab("leads")}
            className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === "leads"
                ? "bg-dark text-white shadow-md"
                : "bg-white text-dark hover:bg-stone"
            }`}
          >
            Leads Overview ({leads.length})
          </button>
          <button
            onClick={() => setActiveTab("projects")}
            className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === "projects"
                ? "bg-dark text-white shadow-md"
                : "bg-white text-dark hover:bg-stone"
            }`}
          >
            Projects CMS
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div className="p-6 rounded-2xl bg-white border border-stone shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-accent-blue/10 text-accent-blue flex items-center justify-center">
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
            <span className="text-2xl font-extrabold block">18</span>
            <span className="text-xs text-dark/60 uppercase font-bold tracking-wider">
              Active Projects
            </span>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-stone shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Eye className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-extrabold block">100%</span>
            <span className="text-xs text-dark/60 uppercase font-bold tracking-wider">
              NDA & Security Assured
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
                className="p-2 rounded-full hover:bg-stone text-dark/60 transition-colors"
                title="Refresh leads"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
              </button>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="relative flex-grow sm:flex-grow-0">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-dark/40" />
                <input
                  type="text"
                  placeholder="Search leads..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  suppressHydrationWarning
                  className="pl-9 pr-4 py-2 rounded-xl bg-warm border border-stone text-xs font-semibold focus:outline-none focus:border-accent-blue"
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
                        <div className="font-semibold text-accent-blue">
                          {lead.requirement || "Custom Exhibition Inquiry"}
                        </div>
                        {lead.configuredLayout?.estimatedPriceRange && (
                          <div className="text-[10px] text-dark/70 font-mono mt-0.5">
                            Est: {lead.configuredLayout.estimatedPriceRange}
                          </div>
                        )}
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            lead.status === "New"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-emerald-100 text-emerald-800"
                          }`}
                        >
                          {lead.status}
                        </span>
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
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-extrabold text-dark">Portfolio Projects Management</h3>
            <button className="inline-flex items-center gap-2 bg-accent-blue text-white font-semibold text-xs px-5 py-2.5 rounded-full hover:bg-blue-600 shadow-md cursor-pointer">
              <Plus className="w-4 h-4" />
              <span>Add New Project</span>
            </button>
          </div>
          <div className="py-12 text-center text-dark/50 text-xs font-semibold uppercase tracking-wider">
            Connected to Mongoose Project Schema. Use /api/projects POST to add custom projects.
          </div>
        </div>
      )}
    </div>
  );
}
