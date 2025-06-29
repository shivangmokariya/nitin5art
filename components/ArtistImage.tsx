"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Palette } from "lucide-react";

interface ArtistImageProps {
  artistName?: string;
  artistExperience?: string;
}

interface ArtistData {
  artistImageUrl: string;
  artistName: string;
  artistExperience: string;
}

export default function ArtistImage({ 
  artistName: propArtistName = "Professional Artist", 
  artistExperience: propArtistExperience = "15+ Years Experience" 
}: ArtistImageProps) {
  const [artistData, setArtistData] = useState<ArtistData>({
    artistImageUrl: '/uploads/default-artist.jpg',
    artistName: propArtistName,
    artistExperience: propArtistExperience
  });
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const fetchArtistData = async () => {
      try {
        const response = await fetch('/api/settings/artist-image');
        const data = await response.json();
        console.log('Artist data from API:', data); // Debug log
        
        if (data.artistImageUrl) {
          setArtistData({
            artistImageUrl: data.artistImageUrl,
            artistName: data.artistName || propArtistName,
            artistExperience: data.artistExperience || propArtistExperience
          });
        }
      } catch (error) {
        console.error('Error fetching artist data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArtistData();
  }, [propArtistName, propArtistExperience]);

  const handleImageError = () => {
    console.error('Image failed to load:', artistData.artistImageUrl);
    setImageError(true);
  };

  if (loading) {
    return (
      <div className="relative">
        <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl bg-secondary-200 animate-pulse">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-secondary-400">Loading...</div>
          </div>
        </div>
        <div className="absolute -bottom-6 -right-6 bg-primary-600 text-white p-6 rounded-lg">
          <Palette className="h-8 w-8 mb-2" />
          <p className="font-semibold">{artistData.artistName}</p>
          <p className="text-sm opacity-90">{artistData.artistExperience}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl">
        {imageError ? (
          <div className="w-full h-full bg-secondary-200 flex items-center justify-center">
            <div className="text-center">
              <Palette className="h-16 w-16 text-secondary-400 mx-auto mb-2" />
              <p className="text-secondary-500">Image not available</p>
            </div>
          </div>
        ) : artistData.artistImageUrl.startsWith('/uploads/') ? (
          // Use regular img tag for local uploads
          <img
            src={artistData.artistImageUrl}
            alt="Artist working in studio"
            className="w-full h-full object-cover"
            onError={handleImageError}
          />
        ) : (
          // Use Next.js Image for external URLs
          <Image
            src={artistData.artistImageUrl}
            alt="Artist working in studio"
            fill
            className="object-cover"
            onError={handleImageError}
          />
        )}
      </div>
      <div className="absolute -bottom-6 -right-6 bg-primary-600 text-white p-6 rounded-lg">
        <Palette className="h-8 w-8 mb-2" />
        <p className="font-semibold">{artistData.artistName}</p>
        <p className="text-sm opacity-90">{artistData.artistExperience}</p>
      </div>
    </div>
  );
} 