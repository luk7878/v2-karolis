"use client";
import { useEffect,useState } from "react";
import { supabase } from "../lib/supabase";
import PublicHeader from "./PublicHeader";
import PublicFooter from "./PublicFooter";

const projectFallback=[
 {id:"p1",slug:"create-edit-employ",project_year:"2025",programme:"Erasmus+ KA153",title_lt:"Create, Edit, Employ",summary_lt:"Vaizdo kūrimo įgūdžiai geresnei profesinei ateičiai.",status:"published"},
 {id:"p2",slug:"making-the-right-career-choices",project_year:"2025",programme:"Erasmus+ KA152",title_lt:"Making the Right Career Choices",summary_lt:"Sąmoningi ir informuoti jaunimo karjeros pasirinkimai.",status:"published"},
 {id:"p3",slug:"digitalize",project_year:"2021",programme:"Erasmus+ KA153",title_lt:"Digitalize",summary_lt:"Skaitmeninių kompetencijų stiprinimas jaunimo darbuotojams.",status:"published"},
 {id:"p4",slug:"environmental-pollution",project_year:"2021",programme:"Erasmus+ KA152",title_lt:"Control Guide Against Environmental Pollution",summary_lt:"Aplinkosauga, europinės vertybės ir jaunimo bendradarbiavimas.",status:"published"},
];
const articleFallback=[
 {id:"a1",slug:"karjeros-kompasas",published_at:"2026-06-12",title_lt:"Karjeros kompasas: kaip rinktis nežinomybės laikais",excerpt_lt:"Penki klausimai, padedantys jaunuoliui sprendimą paversti kryptimi.",status:"published"},
 {id:"a2",slug:"skaitmeninis-pasitikejimas",published_at:"2026-04-18",title_lt:"Skaitmeninis pasitikėjimas yra daugiau nei įgūdžiai",excerpt_lt:"Kodėl technologinis raštingumas prasideda nuo smalsumo, o ne nuo programos.",status:"published"},
 {id:"a3",slug:"judejimas-visiems",published_at:"2026-02-05",title_lt:"Judėjimas visiems: kaip veiklą padaryti įtraukią",excerpt_lt:"Praktiniai principai planuojant sportą skirtingų fizinių gebėjimų grupei.",status:"published"},
];
export default function ContentListing({kind}:{kind:"articles"|"projects"}){const [rows,setRows]=useState<Record<string,string>[]>([]);const [loading,setLoading]=useState(true);useEffect(()=>{supabase.from(kind).select("*").eq("status","published").order("published_at",{ascending:false}).then(({data})=>{setRows((data?.length?data:(kind==="projects"?projectFallback:articleFallback)) as unknown as Record<string,string>[]);setLoading(false)})},[kind]);const project=kind==="projects";return <main className="inner-page"><PublicHeader/><section className={`catalog-hero ${project?"project-catalog":"article-catalog"}`}><span>{project?"02 / PROJEKTAI":"03 / STRAIPSNIAI"}</span><h1>{project?<>Darbai, kurie juda <em>per Europą.</em></>:<>Žinios, kurios padeda <em>veikti.</em></>}</h1><p>{project?"Vykdomi ir įgyvendinti Erasmus+ projektai, jaunimo mainai bei mokymų iniciatyvos.":"Praktinės įžvalgos apie karjerą, skaitmeninį pasaulį, tvarumą ir įtrauktį."}</p></section><section className="catalog-list">{loading?<p>Kraunama…</p>:rows.map((r,i)=><a href={`/${kind}/${r.slug}`} key={r.id} className="catalog-card"><div><span>{String(i+1).padStart(2,"0")}</span><b>{project?(r.programme||"PROJEKTAS"):"ĮŽVALGOS"}</b></div><div><time>{project?r.project_year:new Date(r.published_at).getFullYear()}</time><h2>{r.title_lt}</h2><p>{project?r.summary_lt:r.excerpt_lt}</p></div><i>↗</i></a>)}</section><PublicFooter/></main>}
