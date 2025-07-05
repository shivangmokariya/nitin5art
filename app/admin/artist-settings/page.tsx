'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Upload, Save, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface ArtistSettings {
  artistImageUrl: string;
  artistName: string;
  artistExperience: string;
  aboutText: string;
}

// Helper to convert Google Drive share link to direct image link
function getDirectImageUrl(url: string) {
  if (!url) return '';
  // Match Google Drive file ID
  const match = url.match(/(?:\/d\/|id=)([\w-]{25,})/);
  if (match) {
    return `https://drive.google.com/uc?export=view&id=${match[1]}`;
  }
  return url;
}

export default function ArtistSettingsPage() {
  const router = useRouter();
  const [settings, setSettings] = useState<ArtistSettings>({
    artistImageUrl: '',
    artistName: 'Professional Artist',
    artistExperience: '15+ Years Experience',
    aboutText: 'With over 15 years of experience in paint sketch artistry, I\'ve dedicated my life to capturing the world\'s beauty through color and texture. Each piece is created with passion and attention to detail, ensuring that every artwork tells a unique story.'
  });
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  console.log(settings,'settings');
  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/settings/artist-image');
      const data = await response.json();
      if (data.artistImageUrl) {
        setSettings(prev => ({ ...prev, artistImageUrl: data.artistImageUrl, aboutText:data.aboutText, artistName:data.artistName, artistExperience:data.artistExperience }));
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading(true);
    // Show local preview
    setPreviewUrl(URL.createObjectURL(file));
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        throw new Error('Upload failed');
      }
      const data = await response.json();
      setSettings(prev => ({ ...prev, artistImageUrl: data.url }));
      toast.success('Image uploaded successfully!');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/settings/artist-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          artistImageUrl: settings.artistImageUrl,
          artistName: settings.artistName,
          artistExperience: settings.artistExperience,
          aboutText: settings.aboutText,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save settings');
      }

      toast.success('Settings saved successfully!');
    } catch (error) {
      console.error('Save error:', error);
      toast.error('Failed to save settings');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-secondary-900 mb-2">Artist Settings</h1>
        <p className="text-secondary-600">Manage your artist profile and image</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold text-secondary-900 mb-4">Artist Image</h2>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-secondary-700 mb-2">
            Current Image
          </label>
          {previewUrl && (
            <div className="relative w-64 h-48 rounded-lg overflow-hidden border">
              <img
                src={previewUrl}
                alt="Artist Preview"
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-secondary-700 mb-2">
            Upload New Image
          </label>
          <div className="flex items-center space-x-4">
            <label className="cursor-pointer bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 inline-flex items-center">
              <Upload className="h-4 w-4 mr-2" />
              {uploading ? 'Uploading...' : 'Choose File'}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                disabled={uploading}
              />
            </label>
            {uploading && <Loader2 className="h-4 w-4 animate-spin text-primary-600" />}
          </div>
          <p className="text-sm text-secondary-500 mt-2">
            Recommended size: 800x600px or larger. Max file size: 5MB
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold text-secondary-900 mb-4">Artist Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              Artist Name
            </label>
            <input
              type="text"
              value={settings.artistName}
              onChange={(e) => setSettings(prev => ({ ...prev, artistName: e.target.value }))}
              className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              Experience
            </label>
            <input
              type="text"
              value={settings.artistExperience}
              onChange={(e) => setSettings(prev => ({ ...prev, artistExperience: e.target.value }))}
              className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="e.g., 15+ Years Experience"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-2">
            About Text
          </label>
          <textarea
            value={settings.aboutText}
            onChange={(e) => setSettings(prev => ({ ...prev, aboutText: e.target.value }))}
            rows={4}
            className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Tell visitors about yourself and your art..."
          />
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          onClick={() => router.back()}
          className="px-6 py-2 border border-secondary-300 text-secondary-700 rounded-lg hover:bg-secondary-50 transition-colors duration-200"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          disabled={loading}
          className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors duration-200 inline-flex items-center disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </>
          )}
        </button>
      </div>
    </div>
  );
} 