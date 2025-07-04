'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

const categories = [
  'tanjore-paintings',
  'sketch-painting',
  'oil-paintings',
  'portraits',
];

const sections = [
  { value: 'hero', label: 'Hero Section' },
  { value: 'carousel', label: 'Carousel' },
  { value: 'gallery', label: 'Gallery' },
];

export default function ArtworkManagementPage() {
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [section, setSection] = useState(sections[0].value);
  const [uploading, setUploading] = useState(false);
  const [artworks, setArtworks] = useState<any[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch artworks from the backend
  useEffect(() => {
    fetch('/api/paintings')
      .then(res => res.json())
      .then(data => setArtworks(data.paintings || []));
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    setUploading(true);
    try {
      // 1. Upload image to backend
      const formData = new FormData();
      formData.append('file', file);
      const uploadRes = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const uploadData = await uploadRes.json();
      if (!uploadData.url) throw new Error('Image upload failed');

      // 2. Save painting metadata to DB
      const paintingRes = await fetch('/api/paintings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          description,
          category,
          imageUrl: uploadData.url,
          section,
          seo: {
            title,
            description,
            alt: title,
            keywords: [category, section],
          },
          tags: [category, section],
          featured: section === 'hero' || section === 'carousel',
        }),
      });
      const paintingData = await paintingRes.json();
      if (!paintingRes.ok) throw new Error(paintingData.error || 'Failed to save painting');

      setArtworks([paintingData, ...artworks]);
      setFile(null);
      setPreview(null);
      setTitle('');
      setDescription('');
      setCategory(categories[0]);
      setSection(sections[0].value);
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (err) {
      alert((err as Error).message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-serif font-bold text-secondary-900 mb-6">Artwork Management</h1>
      <div className="bg-white rounded-lg shadow p-6 mb-8 max-w-2xl">
        <h2 className="text-lg font-semibold mb-4">Upload New Artwork</h2>
        <form onSubmit={handleUpload} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              ref={fileInputRef}
              className="block w-full text-sm"
              required
            />
            {preview && (
              <div className="mt-2">
                <Image
                  src={preview}
                  alt="Preview"
                  width={320}
                  height={200}
                  className="rounded shadow border"
                />
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="input-field"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="input-field"
              rows={2}
              required
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Category</label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="input-field"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Section</label>
              <select
                value={section}
                onChange={e => setSection(e.target.value)}
                className="input-field"
              >
                {sections.map(sec => (
                  <option key={sec.value} value={sec.value}>{sec.label}</option>
                ))}
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="btn-primary w-full mt-2"
            disabled={uploading}
          >
            {uploading ? 'Uploading...' : 'Upload Artwork'}
          </button>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Uploaded Artworks</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {artworks.length === 0 && (
            <div className="text-secondary-500 col-span-full">No artworks uploaded yet.</div>
          )}
          {artworks.map(art => (
            <div key={art._id || art.id} className="border rounded-lg p-3 bg-secondary-50">
              <Image
                src={art.imageUrl || art.url}
                alt={art.title}
                width={320}
                height={200}
                className="rounded shadow mb-2"
              />
              <div className="font-semibold text-secondary-900">{art.title}</div>
              <div className="text-sm text-secondary-600 mb-1">{art.description}</div>
              <div className="text-xs text-secondary-500 mb-1">Category: {art.category}</div>
              <div className="text-xs text-primary-600 font-medium">Section: {sections.find(s => s.value === (art.section || (art.featured ? 'carousel' : 'gallery')))?.label}</div>

              <div className="mt-2">
                <span className="inline-block bg-primary-100 text-primary-700 px-2 py-1 rounded text-xs">Preview for: {sections.find(s => s.value === (art.section || (art.featured ? 'carousel' : 'gallery')))?.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 