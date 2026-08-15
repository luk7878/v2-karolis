"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function PublicHeader() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<"lt" | "en">("lt");
  const pathname = usePathname();
  useEffect(() => { if (localStorage.getItem("consust-language") === "en") setLang("en"); }, []);
  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);
  const toggleLanguage = () => {
    const next = lang === "lt" ? "en" : "lt";
    setLang(next);
    localStorage.setItem("consust-language", next);
    document.documentElement.lang = next;
    window.dispatchEvent(new CustomEvent("consust-language", { detail: next }));
  };
  const nav = lang === "lt"
    ? [["/", "Pradžia"], ["/apie-mus", "Apie mus"], ["/projektai", "Projektai"], ["/straipsniai", "Straipsniai"], ["/kontaktai", "Kontaktai"]]
    : [["/", "Home"], ["/apie-mus", "About"], ["/projektai", "Projects"], ["/straipsniai", "Articles"], ["/kontaktai", "Contact"]];
  return <>
    <header className="public-header">
      <a className="public-logo" href="/" aria-label="CONSUST pradinis puslapis"><i>C</i><span>CONSUST</span></a>
      <nav id="public-navigation" className={open ? "open" : ""} aria-label="Pagrindinė navigacija">
        {nav.map(([href, label], index) => <a className={pathname === href ? "active" : ""} href={href} key={href}><b>0{index + 1}</b>{label}</a>)}
        <div className="mobile-nav-meta"><span>Kaunas · Lietuva · Europa</span><span>OID E10242627</span></div>
      </nav>
      <div className="header-actions">
        <button className="language-switch" onClick={toggleLanguage} aria-label="Keisti kalbą">{lang === "lt" ? "EN" : "LT"}</button>
        <a className="header-contact" href="/kontaktai">{lang === "lt" ? "Susisiekti" : "Contact us"}<span>↗</span></a>
        <button className={`public-menu ${open ? "is-open" : ""}`} onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="public-navigation" aria-label={open ? "Uždaryti meniu" : "Atverti meniu"}><span/><span/></button>
      </div>
    </header>
    {open && <button className="menu-backdrop" onClick={() => setOpen(false)} aria-label="Uždaryti meniu"/>}
  </>;
}
