"use client";

import { useEffect, useState } from "react";
import PublicHeader from "../components/PublicHeader";
import PublicFooter from "../components/PublicFooter";

type Lang = "lt" | "en";

const copy = {
  lt: {
    menu: ["Pradžia", "Apie mus", "Projektai", "Straipsniai", "Kontaktai"],
    switch: "EN", label: "NEVYRIAUSYBINĖ ORGANIZACIJA · KAUNAS",
    hero: "Ateitis nėra vieta, į kurią einame.", heroAccent: "Tai kryptis, kurią kuriame.",
    intro: "CONSUST padeda jauniems žmonėms pasiruošti pokyčiams — nuo pirmojo karjeros sprendimo iki aktyvaus dalyvavimo Europoje.",
    explore: "Leistis į kelionę", partner: "Tapti partneriu",
    facts: [["2014", "įkurta Kaune"], ["20+", "projektų patirtis"], ["Europa", "mūsų veikimo laukas"]],
    missionTag: "MŪSŲ KOMPASAS", mission: "Galimybės turi būti prieinamos kiekvienam.",
    missionText: "Todėl kuriame mokymosi patirtis, kurios ne tik perduoda žinias, bet ir augina pasitikėjimą, savarankiškumą bei bendrystę.",
    values: [["01", "Smalsumas", "Klausiame, tyrinėjame ir mokomės veikdami."], ["02", "Įtrauktis", "Skirtingi gebėjimai kuria stipresnę bendruomenę."], ["03", "Tęstinumas", "Idėją vertiname pagal jos ilgalaikį poveikį."]],
    workTag: "KĄ VEIKIAME", workTitle: "Pokyčio laboratorija.",
    work: [["Karjera", "Padedame jauniems žmonėms atpažinti savo stiprybes ir drąsiai žengti į darbo rinką.", "↗  JAUNIMO ĮGALINIMAS"], ["Skaitmena", "Technologijas paverčiame kūrybos, bendradarbiavimo ir naujų galimybių įrankiu.", "↗  PRAKTINIAI ĮGŪDŽIAI"], ["Tvarumas", "Jungiame strategiją su kasdieniais sprendimais organizacijose ir bendruomenėse.", "↗  ATSAKINGAS AUGIMAS"], ["Judėjimas", "Kuriame sporto ir lauko veiklas įvairių fizinių gebėjimų žmonėms.", "↗  ĮTRAUKUS DALYVAVIMAS"]],
    projectsTag: "MŪSŲ MARŠRUTAS", projectsTitle: "Iš Kauno — į bendrą Europos patirtį.",
    projects: [["2021", "Digitalize", "Jaunimo darbuotojų skaitmeninės kompetencijos", "KA153"], ["2021", "Control Guide Against Environmental Pollution", "Aplinkosauga ir europinės vertybės", "KA152"], ["2025", "Making the Right Career Choices", "Sąmoningi jaunimo karjeros pasirinkimai", "KA152"], ["2025", "Create, Edit, Employ", "Vaizdo įgūdžiai geresnei ateičiai", "KA153"]],
    contactTag: "KITA STOTELĖ", contact: "Kurkime tai, ko dar nėra.", contactText: "Ieškote patikimo partnerio Erasmus+ projektui, mokymams ar jaunimo iniciatyvai? Pradėkime nuo pokalbio.", write: "Pradėti pokalbį", city: "Kaunas · Lietuva · Europa",
  },
  en: {
    menu: ["Home", "About", "Projects", "Articles", "Contact"], switch: "LT", label: "NON-GOVERNMENTAL ORGANISATION · KAUNAS",
    hero: "The future is not a place we are going.", heroAccent: "It is a direction we create.",
    intro: "CONSUST helps young people prepare for change — from their first career decision to active participation in Europe.", explore: "Start the journey", partner: "Become a partner",
    facts: [["2014", "founded in Kaunas"], ["20+", "projects of experience"], ["Europe", "our field of action"]],
    missionTag: "OUR COMPASS", mission: "Opportunity should be accessible to everyone.", missionText: "We create learning experiences that build not only knowledge, but confidence, independence and connection.",
    values: [["01", "Curiosity", "We ask, explore and learn by doing."], ["02", "Inclusion", "Different abilities make a stronger community."], ["03", "Continuity", "We judge an idea by its lasting impact."]],
    workTag: "WHAT WE DO", workTitle: "A laboratory for change.",
    work: [["Careers", "We help young people recognise their strengths and enter the labour market with confidence.", "↗  YOUTH EMPOWERMENT"], ["Digital", "We turn technology into a tool for creativity, collaboration and new opportunity.", "↗  PRACTICAL SKILLS"], ["Sustainability", "We connect strategy with everyday decisions in organisations and communities.", "↗  RESPONSIBLE GROWTH"], ["Movement", "We create sport and outdoor activities for people of different physical abilities.", "↗  INCLUSIVE PARTICIPATION"]],
    projectsTag: "OUR ROUTE", projectsTitle: "From Kaunas to shared European experience.",
    projects: [["2021", "Digitalize", "Digital competences for youth workers", "KA153"], ["2021", "Control Guide Against Environmental Pollution", "Environment and European values", "KA152"], ["2025", "Making the Right Career Choices", "Informed career choices for young people", "KA152"], ["2025", "Create, Edit, Employ", "Video skills for a better future", "KA153"]],
    contactTag: "NEXT STOP", contact: "Let's create what does not exist yet.", contactText: "Looking for a reliable partner for an Erasmus+ project, training or youth initiative? Let's begin with a conversation.", write: "Start a conversation", city: "Kaunas · Lithuania · Europe",
  }
};

export default function Home() {
  const [lang, setLang] = useState<Lang>("lt");
  useEffect(() => {
    if (localStorage.getItem("consust-language") === "en") setLang("en");
    const update = (event: Event) => setLang((event as CustomEvent<Lang>).detail);
    window.addEventListener("consust-language", update);
    return () => window.removeEventListener("consust-language", update);
  }, []);
  const t = copy[lang];
  return <main className="home-page" id="top">
    <PublicHeader />
    <div className="atlas-content">
      <section className="atlas-hero">
        <div className="topline"><span>{t.label}</span><span>54.8985°N / 23.9036°E</span></div>
        <div className="hero-map" aria-hidden="true"><div className="route-line"/><i className="point p1"/><i className="point p2"/><i className="point p3"/><span className="map-label m1">KAUNAS</span><span className="map-label m2">EUROPE</span></div>
        <div className="hero-statement"><p>CONSUST / ASTA</p><h1>{t.hero}<br/><em>{t.heroAccent}</em></h1></div>
        <div className="hero-intro"><p>{t.intro}</p><div><a href="#misija">{t.explore} ↓</a><a className="outline" href="#kontaktai">{t.partner} ↗</a></div></div>
        <div className="fact-strip">{t.facts.map(f=><div key={f[0]}><strong>{f[0]}</strong><span>{f[1]}</span></div>)}</div>
      </section>

      <section className="compass" id="misija">
        <div className="section-code"><span>02 / 06</span><b>{t.missionTag}</b></div>
        <div className="compass-rose" aria-hidden="true"><span>N</span><i/><b>✦</b></div>
        <div className="mission-copy"><h2>{t.mission}</h2><p>{t.missionText}</p></div>
        <div className="values">{t.values.map(v=><article key={v[0]}><span>{v[0]}</span><h3>{v[1]}</h3><p>{v[2]}</p></article>)}</div>
      </section>

      <section className="lab" id="veiklos">
        <div className="section-code light"><span>03 / 06</span><b>{t.workTag}</b></div>
        <h2>{t.workTitle}</h2>
        <div className="lab-grid">{t.work.map((w,i)=><article key={w[0]} className={`lab-card c${i}`}><div className="lab-icon" aria-hidden="true">{["↗","⌘","◌","≈"][i]}</div><span>0{i+1}</span><h3>{w[0]}</h3><p>{w[1]}</p><small>{w[2]}</small></article>)}</div>
      </section>

      <section className="route" id="projektai">
        <div className="section-code"><span>04 / 06</span><b>{t.projectsTag}</b></div>
        <h2>{t.projectsTitle}</h2>
        <div className="timeline">{t.projects.map((p,i)=><article key={p[1]}><div className="year">{p[0]}<i/></div><div className="project-no">0{i+1}</div><h3>{p[1]}</h3><p>{p[2]}</p><span>{p[3]}</span></article>)}</div>
      </section>

      <section className="station" id="kontaktai">
        <div className="section-code"><span>05 / 05</span><b>{t.contactTag}</b></div>
        <div className="station-grid"><div><h2>{t.contact}</h2><p>{t.contactText}</p><a href="mailto:vsi.asta.info@gmail.com">{t.write}<span>↗</span></a></div><div className="radar" aria-hidden="true"><i/><i/><i/><b>KAUNAS</b></div></div>
      </section>
      <PublicFooter />
    </div>
  </main>;
}
