'use client';
import { useState, useEffect, useRef } from 'react';

export default function HeroImageAdmin() {
  const [url, setUrl] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
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
    console.log('Upload response:', data);
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
    // Refresh preview from backend
    fetch('/api/settings/hero-image')
      .then(res => res.json())
      .then(data => setUrl(data.heroImageUrl));
  };

  return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-serif font-bold text-secondary-900 mb-6 text-center">Update Hero Image</h1>
        <form onSubmit={handleSave} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">Upload Hero Image</label>
            <div className="flex gap-2">
              <input type="file" accept="image/*" onChange={handleFileChange} className="flex-1" ref={fileInputRef} />
              <button type="button" onClick={handleUpload} disabled={loading || !file} className="btn-secondary px-4 py-2 rounded disabled:opacity-50">
                {loading ? 'Uploading...' : 'Upload'}
              </button>
            </div>
          </div>
          {url && (
            <div className="flex flex-col items-center">
              <img src={url} alt="Hero Preview" className="rounded shadow border mb-4 max-h-48" />
            </div>
          )}
          <button type="submit" disabled={loading || !url} className="btn-primary w-full py-2 rounded text-lg disabled:opacity-50">
            {loading ? 'Saving...' : 'Save as Hero Image'}
          </button>
        </form>
      </div>
    </div>
  );
} 