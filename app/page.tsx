"use client";

import { useEffect, useState } from "react";

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
    peopleTag: "EKSPERTŲ TINKLAS", peopleTitle: "Patirtis iš švietimo, verslo, tvarumo ir sporto.",
    people: [["MS", "Mindaugas Samuolaitis", "Direktorius · karjeros valdymas", "20+ projektų"], ["AA", "Audronė Alijošiūtė-Paulauskienė", "Tvarumo ekspertė", "20+ metų patirties"], ["DG", "Deimantas Gaidamavičius", "IT ir projektų vadovas", "Erasmus+ koordinatorius"], ["BS", "Birutė Statkevičienė", "Įtraukaus sporto ekspertė", "Olimpinė patirtis"], ["MS", "Marija Stravinskaitė", "Projektų koordinatorė", "15+ Erasmus+ veiklų"]],
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
    peopleTag: "EXPERT NETWORK", peopleTitle: "Experience across education, business, sustainability and sport.",
    people: [["MS", "Mindaugas Samuolaitis", "Director · career management", "20+ projects"], ["AA", "Audronė Alijošiūtė-Paulauskienė", "Sustainability expert", "20+ years experience"], ["DG", "Deimantas Gaidamavičius", "IT & project manager", "Erasmus+ coordinator"], ["BS", "Birutė Statkevičienė", "Inclusive sport expert", "Olympic experience"], ["MS", "Marija Stravinskaitė", "Project coordinator", "15+ Erasmus+ activities"]],
    contactTag: "NEXT STOP", contact: "Let's create what does not exist yet.", contactText: "Looking for a reliable partner for an Erasmus+ project, training or youth initiative? Let's begin with a conversation.", write: "Start a conversation", city: "Kaunas · Lithuania · Europe",
  }
};

export default function Home() {
  const [lang, setLang] = useState<Lang>("lt");
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);
  const t = copy[lang];
  const links = ["/", "/apie-mus", "/projektai", "/straipsniai", "/kontaktai"];
  return <main className="atlas" id="top">
    <aside className={`rail ${menuOpen ? "open" : ""}`}>
      <a className="atlas-logo" href="#top" onClick={() => setMenuOpen(false)}><i>C</i><span>CONSUST</span></a>
      <nav>{t.menu.map((x,i)=><a key={x} href={links[i]} onClick={() => setMenuOpen(false)}><b>0{i+1}</b>{x}</a>)}</nav>
      <button onClick={() => setLang(lang === "lt" ? "en" : "lt")}>{t.switch}<span>↗</span></button>
      <small>OID<br/>E10242627</small>
    </aside>
    <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Atverti meniu">{menuOpen ? "×" : "☰"}</button>

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

      <section className="network" id="zmones">
        <div className="section-code light"><span>05 / 06</span><b>{t.peopleTag}</b></div>
        <h2>{t.peopleTitle}</h2>
        <div className="network-grid">{t.people.map((p,i)=><article key={p[1]}><div className={`portrait tone${i}`}><span>{p[0]}</span><i>{String(i+1).padStart(2,"0")}</i></div><h3>{p[1]}</h3><p>{p[2]}</p><small>{p[3]}</small></article>)}</div>
      </section>

      <section className="station" id="kontaktai">
        <div className="section-code"><span>06 / 06</span><b>{t.contactTag}</b></div>
        <div className="station-grid"><div><h2>{t.contact}</h2><p>{t.contactText}</p><a href="mailto:vsi.asta.info@gmail.com">{t.write}<span>↗</span></a></div><div className="radar" aria-hidden="true"><i/><i/><i/><b>KAUNAS</b></div></div>
        <footer><div><strong>CONSUST</strong><span>{t.city}</span></div><div><a href="mailto:vsi.asta.info@gmail.com">vsi.asta.info@gmail.com</a><a href="tel:+37069962328">+370 699 62328</a></div><small>© {new Date().getFullYear()} · Alternative Solutions for a Sustainable Future</small></footer>
      </section>
    </div>
  </main>;
}
