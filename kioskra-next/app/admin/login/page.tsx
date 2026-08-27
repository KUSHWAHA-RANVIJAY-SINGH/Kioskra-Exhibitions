"use client";

import React, { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Lock, Mail, ArrowRight, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const { status } = useSession();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/admin/dashboard");
    }
  }, [status, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError("Invalid email or password. Please try again.");
        setLoading(false);
      } else {
        router.push("/admin/dashboard");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  };

  if (status === "loading" || status === "authenticated") {
    return (
      <div className="min-h-screen bg-[#F5F4F1] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#2F6BFF]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F4F1] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-28">
      <div className="max-w-md w-full space-y-8 bg-[#191A1A] p-8 sm:p-10 rounded-3xl border border-white/5 shadow-2xl relative overflow-hidden text-white">
        {/* Architectural Design Accents */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#2F6BFF]/10 rounded-full filter blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-white/5 rounded-full filter blur-3xl pointer-events-none" />

        <div className="text-center relative z-10">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#2F6BFF] block mb-2">
            Secure CMS Gateway
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-white font-sans">
            Kioskra Admin
          </h2>
          <p className="mt-2 text-xs text-white/60">
            Sign in to manage inquiries, projects, and exhibition SEO pages.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6 relative z-10">
          {error && (
            <div className="p-4 rounded-xl bg-red-950/50 border border-red-500/30 text-red-400 text-xs font-semibold text-center">
              {error}
            </div>
          )}

          <div className="space-y-4">
            {/* Email input */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-white/80">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40">
                  <Mail className="w-4 h-4" />
                </span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@kioskra.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-[#2F6BFF] focus:bg-white/10 transition-all"
                />
              </div>
            </div>

            {/* Password input */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-white/80">
                Password
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40">
                  <Lock className="w-4 h-4" />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-[#2F6BFF] focus:bg-white/10 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 bg-[#2F6BFF] text-white font-bold text-xs uppercase tracking-widest py-3.5 rounded-xl hover:brightness-110 transition-all shadow-lg shadow-[#2F6BFF]/25 cursor-pointer disabled:opacity-50 mt-2 border-none"
          >
            <span>{loading ? "Verifying..." : "Access Control"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
