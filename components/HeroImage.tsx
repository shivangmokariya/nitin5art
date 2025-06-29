"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function HeroImage() {
  const [url, setUrl] = useState('');

  useEffect(() => {
    fetch('/api/settings/hero-image')
      .then(res => res.json())
      .then(data => setUrl(data.heroImageUrl));
  }, []);

  if (!url) return null; // or a placeholder

  return (
    <div className="relative animate-slide-up">
      <div className="relative w-full aspect-[3/1] rounded-2xl overflow-hidden shadow-2xl">
        <Image
          src={url}
          alt="Hero"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>
    </div>
  );
} 