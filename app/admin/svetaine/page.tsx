"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";
import MediaUpload from "../../../components/admin/MediaUpload";
type Tab = "home" | "team" | "partners" | "stats";
type Item = Record<string, string | number | boolean> & { id: string };
const blankTeam = {
  name: "",
  role_lt: "",
  role_en: "",
  bio_lt: "",
  bio_en: "",
  image_url: "",
  email: "",
  sort_order: 0,
  is_visible: true,
};
const blankPartner = {
  name: "",
  logo_url: "",
  website_url: "",
  sort_order: 0,
  is_visible: true,
};
export default function SiteAdmin() {
  const [tab, setTab] = useState<Tab>("home"),
    [ready, setReady] = useState(false),
    [message, setMessage] = useState(""),
    [settings, setSettings] = useState<Record<string, string | number>>({}),
    [team, setTeam] = useState<Item[]>([]),
    [partners, setPartners] = useState<Item[]>([]),
    [views, setViews] = useState<{ path: string; count: number }[]>([]),
    [draft, setDraft] =
      useState<Record<string, string | number | boolean>>(blankTeam),
    [editing, setEditing] = useState<string | null>(null);
  useEffect(() => {
    void load();
  }, []);
  async function load() {
    const { data: a } = await supabase.auth.getUser();
    if (!a.user) return location.replace("/admin");
    const { data: p } = await supabase
      .from("profiles")
      .select("is_admin")
      .eq("id", a.user.id)
      .single();
    if (!p?.is_admin) return location.replace("/admin");
    const [s, t, pa, v] = await Promise.all([
      supabase.from("site_settings").select("*").single(),
      supabase.from("team_members").select("*").order("sort_order"),
      supabase.from("partners").select("*").order("sort_order"),
      supabase.from("page_views").select("path"),
    ]);
    setSettings(s.data || {});
    setTeam((t.data || []) as Item[]);
    setPartners((pa.data || []) as Item[]);
    const counts: Record<string, number> = {};
    (v.data || []).forEach((x) => (counts[x.path] = (counts[x.path] || 0) + 1));
    setViews(
      Object.entries(counts)
        .map(([path, count]) => ({ path, count }))
        .sort((a, b) => b.count - a.count),
    );
    setReady(true);
  }
  const set = (k: string, v: string | number) =>
    setSettings({ ...settings, [k]: v });
  async function saveSettings() {
    const { error } = await supabase
      .from("site_settings")
      .update(settings)
      .eq("id", "main");
    setMessage(error ? error.message : "Svetainės nustatymai išsaugoti");
  }
  function begin(type: "team" | "partners", item?: Item) {
    setTab(type);
    setEditing(item?.id || null);
    setDraft(item || (type === "team" ? blankTeam : blankPartner));
  }
  async function saveItem() {
    const table = tab === "team" ? "team_members" : "partners";
    const { id, ...payload } = draft as Item;
    const q = editing
      ? supabase.from(table).update(payload).eq("id", editing)
      : supabase.from(table).insert(payload);
    const { error } = await q;
    if (error) return setMessage(error.message);
    setMessage("Išsaugota");
    setEditing(null);
    setDraft(tab === "team" ? blankTeam : blankPartner);
    await load();
  }
  async function remove(table: string, id: string) {
    if (!confirm("Ištrinti?")) return;
    await supabase.from(table).delete().eq("id", id);
    await load();
  }
  if (!ready) return <main className="admin-loading">Kraunama…</main>;
  return (
    <main className="site-admin">
      <header className="studio-top">
        <div>
          <span className="brand-mark">C</span>
          <b>Svetainės valdymas</b>
        </div>
        <div className="studio-top-actions">
          <a href="/admin">← Turinio studija</a>
          {message && <span className="save-message">✓ {message}</span>}
        </div>
      </header>
      <nav className="site-admin-tabs">
        {(["home", "team", "partners", "stats"] as Tab[]).map((x) => (
          <button
            className={tab === x ? "active" : ""}
            onClick={() => {
              setTab(x);
              setEditing(null);
            }}
            key={x}
          >
            {x === "home"
              ? "Pagrindinis"
              : x === "team"
                ? "Komanda"
                : x === "partners"
                  ? "Partneriai"
                  : "Statistika"}
          </button>
        ))}
      </nav>
      <section className="site-admin-body">
        {tab === "home" && (
          <div className="settings-form">
            <div className="block-heading">
              <span>01</span>
              <div>
                <h2>Pagrindinis puslapis</h2>
                <p>Keiskite pagrindinę žinutę, vaizdą ir poveikio rodiklius.</p>
              </div>
            </div>
            <div className="editor-two">
              <label>
                Hero antraštė LT
                <textarea
                  value={String(settings.hero_title_lt || "")}
                  onChange={(e) => set("hero_title_lt", e.target.value)}
                />
              </label>
              <label>
                Hero antraštė EN
                <textarea
                  value={String(settings.hero_title_en || "")}
                  onChange={(e) => set("hero_title_en", e.target.value)}
                />
              </label>
              <label>
                Hero tekstas LT
                <textarea
                  value={String(settings.hero_text_lt || "")}
                  onChange={(e) => set("hero_text_lt", e.target.value)}
                />
              </label>
              <label>
                Hero tekstas EN
                <textarea
                  value={String(settings.hero_text_en || "")}
                  onChange={(e) => set("hero_text_en", e.target.value)}
                />
              </label>
            </div>
            <label>
              Pagrindinė nuotrauka
              <input
                value={String(settings.hero_image_url || "")}
                onChange={(e) => set("hero_image_url", e.target.value)}
              />
            </label>
            <MediaUpload
              label="Įkelti pagrindinę nuotrauką"
              value={String(settings.hero_image_url || "")}
              onChange={(v) => set("hero_image_url", v)}
            />
            <div className="impact-inputs">
              <label>
                Projektai
                <input
                  type="number"
                  value={Number(settings.impact_projects || 0)}
                  onChange={(e) => set("impact_projects", +e.target.value)}
                />
              </label>
              <label>
                Šalys
                <input
                  type="number"
                  value={Number(settings.impact_countries || 0)}
                  onChange={(e) => set("impact_countries", +e.target.value)}
                />
              </label>
              <label>
                Dalyviai
                <input
                  type="number"
                  value={Number(settings.impact_participants || 0)}
                  onChange={(e) => set("impact_participants", +e.target.value)}
                />
              </label>
            </div>
            <button
              className="studio-publish settings-save"
              onClick={() => void saveSettings()}
            >
              Išsaugoti pakeitimus
            </button>
          </div>
        )}
        {(tab === "team" || tab === "partners") && (
          <div className="manage-grid">
            <div>
              <div className="manage-head">
                <h2>{tab === "team" ? "Komandos nariai" : "Partneriai"}</h2>
                <button onClick={() => begin(tab)}>＋ Pridėti</button>
              </div>
              {(tab === "team" ? team : partners).map((item) => (
                <article className="manage-row" key={item.id}>
                  <div>
                    {String(item.image_url || item.logo_url) ? (
                      <img
                        src={String(item.image_url || item.logo_url)}
                        alt=""
                      />
                    ) : (
                      <span>{String(item.name).slice(0, 2).toUpperCase()}</span>
                    )}
                  </div>
                  <strong>{String(item.name)}</strong>
                  <small>{item.is_visible ? "Rodoma" : "Paslėpta"}</small>
                  <button onClick={() => begin(tab, item)}>Redaguoti</button>
                  <button
                    onClick={() =>
                      void remove(
                        tab === "team" ? "team_members" : "partners",
                        item.id,
                      )
                    }
                  >
                    ×
                  </button>
                </article>
              ))}
            </div>
            <div className="manage-form">
              <h3>{editing ? "Redaguoti" : "Naujas įrašas"}</h3>
              <label>
                Pavadinimas / vardas
                <input
                  value={String(draft.name || "")}
                  onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                />
              </label>
              {tab === "team" ? (
                <>
                  <div className="editor-two">
                    <label>
                      Pareigos LT
                      <input
                        value={String(draft.role_lt || "")}
                        onChange={(e) =>
                          setDraft({ ...draft, role_lt: e.target.value })
                        }
                      />
                    </label>
                    <label>
                      Pareigos EN
                      <input
                        value={String(draft.role_en || "")}
                        onChange={(e) =>
                          setDraft({ ...draft, role_en: e.target.value })
                        }
                      />
                    </label>
                  </div>
                  <label>
                    Biografija LT
                    <textarea
                      value={String(draft.bio_lt || "")}
                      onChange={(e) =>
                        setDraft({ ...draft, bio_lt: e.target.value })
                      }
                    />
                  </label>
                  <label>
                    Biografija EN
                    <textarea
                      value={String(draft.bio_en || "")}
                      onChange={(e) =>
                        setDraft({ ...draft, bio_en: e.target.value })
                      }
                    />
                  </label>
                  <label>
                    Nuotrauka
                    <input
                      value={String(draft.image_url || "")}
                      onChange={(e) =>
                        setDraft({ ...draft, image_url: e.target.value })
                      }
                    />
                  </label>
                  <MediaUpload
                    label="Įkelti nuotrauką"
                    value={String(draft.image_url || "")}
                    onChange={(v) => setDraft({ ...draft, image_url: v })}
                  />
                </>
              ) : (
                <>
                  <label>
                    Interneto svetainė
                    <input
                      value={String(draft.website_url || "")}
                      onChange={(e) =>
                        setDraft({ ...draft, website_url: e.target.value })
                      }
                    />
                  </label>
                  <label>
                    Logotipas
                    <input
                      value={String(draft.logo_url || "")}
                      onChange={(e) =>
                        setDraft({ ...draft, logo_url: e.target.value })
                      }
                    />
                  </label>
                  <MediaUpload
                    label="Įkelti logotipą"
                    value={String(draft.logo_url || "")}
                    onChange={(v) => setDraft({ ...draft, logo_url: v })}
                  />
                </>
              )}
              <div className="editor-two">
                <label>
                  Eiliškumas
                  <input
                    type="number"
                    value={Number(draft.sort_order || 0)}
                    onChange={(e) =>
                      setDraft({ ...draft, sort_order: +e.target.value })
                    }
                  />
                </label>
                <label className="studio-check">
                  <input
                    type="checkbox"
                    checked={Boolean(draft.is_visible)}
                    onChange={(e) =>
                      setDraft({ ...draft, is_visible: e.target.checked })
                    }
                  />{" "}
                  Rodyti svetainėje
                </label>
              </div>
              <button className="settings-save" onClick={() => void saveItem()}>
                Išsaugoti
              </button>
            </div>
          </div>
        )}
        {tab === "stats" && (
          <div className="stats-panel">
            <div className="block-heading">
              <span>04</span>
              <div>
                <h2>Svetainės statistika</h2>
                <p>Puslapių peržiūros nuo statistikos įjungimo.</p>
              </div>
            </div>
            <div className="stat-cards">
              <div>
                <strong>{views.reduce((n, x) => n + x.count, 0)}</strong>
                <span>visos peržiūros</span>
              </div>
              <div>
                <strong>{views.length}</strong>
                <span>lankyti puslapiai</span>
              </div>
            </div>
            <div className="stats-list">
              {views.map((x, i) => (
                <div key={x.path}>
                  <span>{i + 1}</span>
                  <strong>{x.path}</strong>
                  <b>{x.count}</b>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
