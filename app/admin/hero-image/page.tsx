'use client';
import { useState, useEffect, useRef } from 'react';

export default function HeroImageAdmin() {
  const [url, setUrl] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch('/api/settings/hero-image')
      .then(res => res.json())
      .then(data => setUrl(data.heroImageUrl));
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });
    const data = await res.json();
    const imageUrl = data.url || data.fileUrl || '';
    setUrl(imageUrl);
    setLoading(false);
    if (!imageUrl) {
      alert('Upload failed. Please try again.');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) {
      alert('Please upload an image first.');
      return;
    }
    setLoading(true);
    await fetch('/api/settings/hero-image', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ heroImageUrl: url }),
    });
    setLoading(false);
    alert('Hero image updated!');
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    fetch('/api/settings/hero-image')
      .then(res => res.json())
      .then(data => setUrl(data.heroImageUrl));
  };

  return (
    <div className="flex justify-center items-center min-h-[60vh] bg-gradient-to-br from-secondary-50 to-white">
      <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-lg border border-secondary-100">
        <h1 className="text-3xl font-serif font-bold text-primary-700 mb-8 text-center">Update Hero Image</h1>
        <form onSubmit={handleSave} className="space-y-8">
          <div>
            <label className="block text-base font-semibold text-secondary-700 mb-3">Upload Hero Image</label>
            <div
              className={`flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-6 transition-colors duration-200 ${dragActive ? 'border-primary-500 bg-primary-50' : 'border-secondary-200 bg-secondary-50'}`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => fileInputRef.current?.click()}
              style={{ cursor: 'pointer' }}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                ref={fileInputRef}
              />
              <span className="text-secondary-500 mb-2">Drag & drop or click to select an image</span>
              {file && <span className="text-primary-600 font-medium">{file.name}</span>}
            </div>
            <button
              type="button"
              onClick={handleUpload}
              disabled={loading || !file}
              className="mt-4 w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 rounded-lg transition disabled:opacity-50"
            >
              {loading ? 'Uploading...' : 'Upload & Preview'}
            </button>
          </div>
          {url && (
            <div className="flex flex-col items-center">
              <img src={url} alt="Hero Preview" className="rounded-xl shadow-lg border mb-4 max-h-56 object-contain" />
              <span className="text-xs text-secondary-400">Preview</span>
            </div>
          )}
          <button
            type="submit"
            disabled={loading || !url}
            className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 rounded-xl text-lg shadow transition disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Save as Hero Image'}
          </button>
        </form>
      </div>
    </div>
  );
} 