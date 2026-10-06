"use client";
import { useEffect, useState } from "react";

export default function useLanguage() {
  const [language, setLanguage] = useState<"lt" | "en">("lt");
  useEffect(() => {
    setLanguage(localStorage.getItem("consust-language") === "en" ? "en" : "lt");
    const update = (event: Event) => setLanguage((event as CustomEvent).detail === "en" ? "en" : "lt");
    window.addEventListener("consust-language", update);
    return () => window.removeEventListener("consust-language", update);
  }, []);
  return language;
}
