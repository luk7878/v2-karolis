"use client";
import { useEffect, useState } from "react";

export default function PublicHeader() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<"lt"|"en">("lt");
  useEffect(()=>{ if(localStorage.getItem("consust-language") === "en") setLang("en"); },[]);
  const toggle=()=>{const n=lang==="lt"?"en":"lt";setLang(n);localStorage.setItem("consust-language",n);document.documentElement.lang=n;window.dispatchEvent(new CustomEvent("consust-language",{detail:n}));};
  const nav=lang==="lt"?[["/apie-mus","Apie mus"],["/projektai","Projektai"],["/straipsniai","Straipsniai"],["/kontaktai","Kontaktai"]]:[["/apie-mus","About"],["/projektai","Projects"],["/straipsniai","Articles"],["/kontaktai","Contact"]];
  return <header className="public-header"><a className="public-logo" href="/"><i>C</i><span>CONSUST</span></a><nav className={open?"open":""}>{nav.map(n=><a href={n[0]} key={n[0]}>{n[1]}</a>)}</nav><div><button onClick={toggle}>{lang==="lt"?"EN":"LT"} ↗</button><button className="public-menu" onClick={()=>setOpen(!open)}>{open?"×":"☰"}</button></div></header>;
}
