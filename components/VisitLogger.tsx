"use client";
import { useEffect } from "react";

export default function VisitLogger() {
  useEffect(() => {
    fetch("/api/visits", { method: "POST" });
  }, []);
  return null;
} 