"use client";
import { useEffect, useState } from "react";

export default function DynamicAboutText() {
  const [aboutText, setAboutText] = useState("");

  useEffect(() => {
    fetch("/api/settings/artist-image")
      .then(res => res.json())
      .then(data => setAboutText(data.aboutText || ""));
  }, []);

  if (!aboutText) return <span>Loading...</span>;
  return <span>{aboutText}</span>;
} 