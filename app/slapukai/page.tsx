import PublicHeader from "../../components/PublicHeader";
import PublicFooter from "../../components/PublicFooter";
export default function CookiesPage() {
  return (
    <main className="legal-page">
      <PublicHeader />
      <article>
        <div className="section-label">[ SKAIDRUMAS ]</div>
        <h1>Slapukų informacija</h1>
        <p className="legal-lead">
          Šiuo metu svetainė nenaudoja reklamos ar lankytojų sekimo slapukų.
        </p>
        <h2>Būtinieji duomenys</h2>
        <p>
          Svetainė gali naudoti techniškai būtiną naršyklės saugyklą pasirinktai
          kalbai įsiminti ir administratoriaus prisijungimo sesijai palaikyti.
          Be šių duomenų dalis funkcijų neveiktų tinkamai.
        </p>
        <h2>Analitika ir rinkodara</h2>
        <p>
          Šiuo metu nenaudojame nebūtinųjų analitikos ar rinkodaros slapukų. Jei
          ateityje juos įdiegsime, prieš aktyvuodami paprašysime jūsų
          pasirinkimo ir atnaujinsime šį puslapį.
        </p>
        <h2>Kaip valdyti slapukus</h2>
        <p>
          Savo naršyklėje galite peržiūrėti, blokuoti ar ištrinti svetainės
          duomenis. Ištrynus būtinus duomenis gali tekti iš naujo pasirinkti
          kalbą arba prisijungti.
        </p>
        <h2>Klausimai</h2>
        <p>
          Dėl privatumo ar slapukų rašykite{" "}
          <a href="mailto:vsi.asta.info@gmail.com">
            vsi.asta.info@gmail.com
          </a>
          .
        </p>
      </article>
      <PublicFooter />
    </main>
  );
}
