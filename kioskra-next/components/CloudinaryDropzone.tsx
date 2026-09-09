"use client";

import React, { useState, useRef } from "react";
import { UploadCloud, Image as ImageIcon, Loader2, X, CheckCircle2 } from "lucide-react";

interface CloudinaryDropzoneProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export default function CloudinaryDropzone({
  value,
  onChange,
  label = "Featured Image",
}: CloudinaryDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file (PNG, JPG, WEBP, etc.).");
      return;
    }

    setError("");
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok || !data.url) {
        throw new Error(data.error || "Failed to upload image to Cloudinary.");
      }

      onChange(data.url);
    } catch (err: any) {
      console.error("Cloudinary Dropzone Upload Error:", err);
      setError(err?.message || "Image upload failed. Try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleUpload(e.target.files[0]);
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-[11px] font-bold uppercase tracking-wider text-dark/70">
        {label} * (Cloudinary Drag & Drop)
      </label>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept="image/*"
        className="hidden"
      />

      {value ? (
        <div className="relative w-full h-44 rounded-2xl overflow-hidden border border-stone bg-neutral-900 group">
          <img src={value} alt="Uploaded preview" className="w-full h-full object-cover" />
          
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 p-4">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-3.5 py-1.5 rounded-xl bg-white text-dark text-xs font-bold shadow hover:bg-stone transition-all cursor-pointer border-none"
            >
              Replace Image
            </button>
            <button
              type="button"
              onClick={() => onChange("")}
              className="p-1.5 rounded-xl bg-rose-600 text-white text-xs font-bold hover:bg-rose-700 transition-all cursor-pointer border-none"
              title="Remove image"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="absolute bottom-2 left-2 bg-emerald-600/90 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-md flex items-center gap-1 shadow">
            <CheckCircle2 className="w-3 h-3" />
            <span>Cloudinary Hosted</span>
          </div>
        </div>
      ) : (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => !uploading && fileInputRef.current?.click()}
          className={`w-full h-36 rounded-2xl border-2 border-dashed transition-all flex flex-col items-center justify-center gap-2 p-4 text-center cursor-pointer ${
            isDragging
              ? "border-[#2F6BFF] bg-[#2F6BFF]/10 scale-[1.01]"
              : "border-stone/80 bg-warm hover:bg-stone/30"
          }`}
        >
          {uploading ? (
            <div className="flex flex-col items-center gap-2 text-[#2F6BFF]">
              <Loader2 className="w-8 h-8 animate-spin" />
              <span className="text-xs font-bold">Uploading to Cloudinary...</span>
            </div>
          ) : (
            <>
              <div className="w-10 h-10 rounded-full bg-[#2F6BFF]/10 text-[#2F6BFF] flex items-center justify-center">
                <UploadCloud className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-dark block">
                  Drag & Drop image here, or <span className="text-[#2F6BFF] underline">browse file</span>
                </span>
                <span className="text-[10px] text-dark/50 block mt-0.5">
                  Supports PNG, JPG, WEBP • Max 10MB (Cloudinary Storage)
                </span>
              </div>
            </>
          )}
        </div>
      )}

      {error && (
        <span className="text-[10px] font-bold text-rose-500">{error}</span>
      )}

      {/* Manual URL entry fallback option */}
      <div className="flex items-center gap-2 mt-1">
        <ImageIcon className="w-3.5 h-3.5 text-dark/40" />
        <input
          type="text"
          placeholder="Or paste direct image URL (e.g., https://res.cloudinary.com/...)"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-1.5 rounded-lg bg-warm border border-stone text-dark text-[11px] focus:outline-none focus:border-[#2F6BFF]"
        />
      </div>
    </div>
  );
}
