"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

function BrushLoader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center z-10">
      <svg width="120" height="120" viewBox="0 0 120 120" className="animate-spin-slow">
        <ellipse
          cx="60"
          cy="60"
          rx="50"
          ry="50"
          fill="none"
          stroke="url(#brushGradient)"
          strokeWidth="12"
          strokeDasharray="40 30"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="brushGradient" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
            <stop stopColor="#f59e42" />
            <stop offset="0.3" stopColor="#3b82f6" />
            <stop offset="0.6" stopColor="#10b981" />
            <stop offset="1" stopColor="#ef4444" />
          </linearGradient>
        </defs>
      </svg>
      <style jsx>{`
        .animate-spin-slow {
          animation: spin 1.2s linear infinite;
        }
        @keyframes spin {
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default function HeroImage() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/settings/hero-image')
      .then(res => res.json())
      .then(data => setUrl(data.heroImageUrl));
  }, []);

  return (
    <div className="relative animate-slide-up">
      <div className="relative w-full aspect-[6/8] rounded-2xl overflow-hidden shadow-2xl bg-secondary-200">
        {loading && <BrushLoader />}
        {url && (
          <Image
            src={url}
            alt="Hero"
            fill
            className="object-cover"
            priority
            onLoadingComplete={() => setLoading(false)}
            onError={() => setLoading(false)}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>
    </div>
  );
} 