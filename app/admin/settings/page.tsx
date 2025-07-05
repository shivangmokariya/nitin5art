"use client";
import { useState, useRef } from "react";

export default function AdminSettingsPage() {
  const [faviconUrl, setFaviconUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    setFaviconUrl(data.url || data.fileUrl || "");
    setLoading(false);
    if (!data.url && !data.fileUrl) {
      alert("Upload failed. Please try again.");
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!faviconUrl) {
      alert("Please upload a favicon first.");
      return;
    }
    setLoading(true);
    await fetch("/api/settings/favicon", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ faviconUrl }),
    });
    setLoading(false);
    alert("Favicon updated!");
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-serif font-bold mb-8">Settings</h1>
      <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
        <h2 className="text-xl font-semibold mb-4">Favicon Icon</h2>
        <form onSubmit={handleSave} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">Upload Favicon (.ico, .png, .svg)</label>
            <div className="flex gap-2 items-center">
              <input type="file" accept="image/x-icon,image/png,image/svg+xml" onChange={handleFileChange} className="flex-1" ref={fileInputRef} />
              <button type="button" onClick={handleUpload} disabled={loading || !file} className="btn-secondary px-4 py-2 rounded disabled:opacity-50">
                {loading ? "Uploading..." : "Upload"}
              </button>
            </div>
          </div>
          {faviconUrl && (
            <div className="flex flex-col items-center">
              <img src={faviconUrl} alt="Favicon Preview" className="rounded shadow border mb-4 max-h-16 max-w-16" />
              <span className="text-xs text-secondary-400">Preview</span>
            </div>
          )}
          <button type="submit" disabled={loading || !faviconUrl} className="btn-primary w-full py-2 rounded text-lg disabled:opacity-50">
            {loading ? "Saving..." : "Save as Favicon"}
          </button>
        </form>
      </div>
    </div>
  );
} 