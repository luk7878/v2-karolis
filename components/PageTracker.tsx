"use client";
import { useEffect } from "react";
import { supabase } from "../lib/supabase";
export default function PageTracker({ path }: { path: string }) {
  useEffect(() => {
    const key = `viewed:${path}:${new Date().toISOString().slice(0, 10)}`;
    if (localStorage.getItem(key)) return;
    localStorage.setItem(key, "1");
    void supabase.from("page_views").insert({ path });
  }, [path]);
  return null;
}
