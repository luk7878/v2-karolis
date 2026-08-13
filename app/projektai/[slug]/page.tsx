import ContentDetail from "../../../components/ContentDetail";
import type { Metadata } from "next";
export async function generateMetadata({
  params,
}: {
  params: { slug: string } | Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const url = `https://gxpvlpintkerbikxydze.supabase.co/rest/v1/projects?slug=eq.${encodeURIComponent(slug)}&select=*`;
  const rows = await fetch(url, {
    headers: { apikey: "sb_publishable_8I00zO971BLGJn9-VmFxlA_ST4QA6ok" },
  })
    .then((r) => (r.ok ? r.json() : []))
    .catch(() => []);
  const x = rows[0] || {};
  return {
    title: x.seo_title_lt || x.title_lt || "Projektas — CONSUST",
    description: x.seo_description_lt || x.summary_lt || "",
    openGraph: x.social_image_url
      ? { images: [x.social_image_url] }
      : undefined,
  };
}
export default function ProjectPage() {
  return <ContentDetail kind="projects" />;
}
