"use client";

import { useEffect, useMemo, useState } from "react";
import sky from "@/data/sky.json";
import { vzpominky, otazka, vyhra, finale } from "@/data/vzpominky";

type Faze = "zamek" | "uvod" | "hra" | "vyhra" | "galerie";

const GOLD = "#C7A27C";

const bezDiakritiky = (s: string) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();

function sparklePath(r: number) {
  const k = r * 0.22;
  return `M0,${-r} Q${k},${-k} ${r},0 Q${k},${k} 0,${r} Q${-k},${k} ${-r},0 Q${-k},${-k} 0,${-r}Z`;
}

export default function NaseNebe() {
  const [faze, setFaze] = useState<Faze>(otazka.zapnuto ? "zamek" : "uvod");
  const [odpoved, setOdpoved] = useState("");
  const [chyba, setChyba] = useState(false);
  const [spojeno, setSpojeno] = useState(0); // kolik hvězd už je spojených
  const [otevrena, setOtevrena] = useState<number | null>(null);
  const [hlaska, setHlaska] = useState<string | null>(null);
  const [hotovo, setHotovo] = useState(false);

  const stars = sky.stars as [number, number, number][];
  const [vx, vy, vw, vh] = sky.viewBox;

  const defs = `
    <radialGradient id="glow"><stop offset="0%" stop-color="#E8B4C1" stop-opacity="0.7"/>
    <stop offset="100%" stop-color="#E8B4C1" stop-opacity="0"/></radialGradient>`;

  const svgBase = useMemo(() => ({ __html: defs + sky.base + sky.outline }), [defs]);

  useEffect(() => {
    if (!hlaska) return;
    const t = setTimeout(() => setHlaska(null), 2200);
    return () => clearTimeout(t);
  }, [hlaska]);

  const zkontroluj = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = otazka.odpovedi.some((a) => bezDiakritiky(odpoved).includes(bezDiakritiky(a)));
    if (ok) setFaze("uvod");
    else {
      setChyba(true);
      setTimeout(() => setChyba(false), 600);
    }
  };

  const odemkniDalsi = () => {
    setSpojeno(spojeno + 1);
    setOtevrena(spojeno);
  };

  const zavriVzpominku = () => {
    setOtevrena(null);
    if (spojeno === stars.length && !hotovo) {
      setHotovo(true);
      setTimeout(() => setFaze("vyhra"), 2800);
    }
  };

  const vzpominka = otevrena !== null ? vzpominky[otevrena] : null;

  const body = stars.slice(0, spojeno).map(([x, y]) => `${x},${y}`).join(" ");
  const cely = stars.map(([x, y]) => `${x},${y}`).join(" ");
  const popisekY = Math.max(...stars.map((s) => s[1])) + 9;
  const popisekX = stars.reduce((a, s) => a + s[0], 0) / stars.length;

  // ---------------- zámek ----------------
  if (faze === "zamek") {
    return (
      <main className="stranka stred">
        <div className="karta uvodni">
          <p className="nadtitulek">Pro Lucinku</p>
          <h1 className="titulek">Než vstoupíš…</h1>
          <p className="podtitulek">{otazka.text}</p>
          <form onSubmit={zkontroluj} className={chyba ? "formular chyba" : "formular"}>
            <input
              value={odpoved}
              onChange={(e) => setOdpoved(e.target.value)}
              placeholder="Tvoje odpověď"
              autoFocus
            />
            <button type="submit">Odemknout</button>
          </form>
        </div>
      </main>
    );
  }

  // ---------------- úvod ----------------
  if (faze === "uvod") {
    return (
      <main className="stranka stred">
        <div className="karta uvodni">
          <p className="nadtitulek">27. 11. 2022 – 27. 11. 2026</p>
          <h1 className="titulek">Naše nebe</h1>
          <p className="podtitulek">
            Tu noc, kdy jsme se dali dohromady, tvořilo nad Frýdlantem dvanáct hvězd srdce.
            Spoj je jednu po druhé – každá ukrývá jednu naši vzpomínku. Jdou přesně po sobě,
            jak se staly: od té nejstarší až po tu poslední.
          </p>
          <button className="tlacitko" onClick={() => setFaze("hra")}>
            Začít
          </button>
        </div>
      </main>
    );
  }

  // ---------------- galerie: celé srdce + všech 12 vzpomínek ----------------
  if (faze === "galerie") {
    return (
      <main className="stranka galerie">
        <header className="hlavicka">
          <p className="nadtitulek">12 / 12 hvězd · srdce je celé</p>
          <h1 className="titulek maly">Naše nebe</h1>
        </header>

        <div className="nebe-obal male">
          <svg viewBox={`${vx} ${vy} ${vw} ${vh}`} className="nebe" role="img" aria-label="Celé srdce">
            <g dangerouslySetInnerHTML={svgBase} />
            <polygon points={cely} className="vypln hotova" />
            <polygon points={cely} fill="none" stroke={GOLD} strokeWidth={0.5} strokeLinejoin="round" />
            {stars.map(([x, y, mag], i) => {
              const r = Math.max(0.45, 1.1 * Math.pow(10, -0.12 * (mag + 1)));
              return (
                <g key={i} transform={`translate(${x},${y})`} className="hvezda spojena">
                  <circle r={Math.max(r * 3.2, 4)} fill="url(#glow)" className="zare" />
                  <path d={sparklePath(Math.max(r * 2.3, 2))} className="tvar" />
                </g>
              );
            })}
            <text x={popisekX} y={popisekY} textAnchor="middle" className="popisek hotovy">
              Lucinka &amp; Vojta
            </text>
          </svg>
        </div>

        <p className="napoveda">Dvanáct hvězd, dvanáct vzpomínek – všechny pohromadě.</p>

        <div className="mrizka">
          {vzpominky.map((v, i) => (
            <article key={i} className="karta mala">
              {v.foto ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={`/fotky/${v.foto}`} alt={v.nadpis} className="foto mala" loading="lazy" />
              ) : (
                <div className="foto mala placeholder">✦</div>
              )}
              <p className="nadtitulek">Hvězda {i + 1}</p>
              <h2 className="titulek stredni">{v.nadpis}</h2>
              {v.datum && <p className="datum">{v.datum}</p>}
              <p className="text bez-mezery">{v.text}</p>
            </article>
          ))}
        </div>

        <div className="karta vzkaz">
          <div className="srdicko">♥</div>
          <h2 className="titulek">{finale.nadpis}</h2>
          <p className="text">{finale.text}</p>
          <p className="podpis">{finale.podpis}</p>
        </div>
      </main>
    );
  }

  // ---------------- hra ----------------
  return (
    <main className="stranka hra">
      <header className="hlavicka">
        <p className="nadtitulek">27. 11. 2022 · Frýdlant</p>
        <h1 className="titulek maly">Naše nebe</h1>
        <p className="postup">
          {hotovo ? "Srdce je celé ♥" : `Spojeno ${spojeno} / ${stars.length} hvězd`}
        </p>
      </header>

      <div className="nebe-obal">
        <svg viewBox={`${vx} ${vy} ${vw} ${vh}`} className="nebe" role="img" aria-label="Naše nebe">
          <g dangerouslySetInnerHTML={svgBase} />

          {!hotovo && otevrena === null && (
            <rect x={vx} y={vy} width={vw} height={vh} fill="transparent"
              onClick={() => setHlaska("Hledej hvězdu, která bliká ✨")} />
          )}

          {hotovo && <polygon points={cely} className="vypln" />}

          {spojeno > 1 && (
            <polyline points={body} fill="none" stroke={GOLD} strokeWidth={0.5}
              strokeLinejoin="round" strokeLinecap="round" />
          )}
          {hotovo && (
            <line x1={stars[stars.length - 1][0]} y1={stars[stars.length - 1][1]}
              x2={stars[0][0]} y2={stars[0][1]} stroke={GOLD} strokeWidth={0.5}
              strokeLinecap="round" className="posledni" />
          )}

          {stars.map(([x, y, mag], i) => {
            const r = Math.max(0.45, 1.1 * Math.pow(10, -0.12 * (mag + 1)));
            const stav = i < spojeno ? "spojena" : i === spojeno && !hotovo ? "dalsi" : "cekajici";
            return (
              <g key={i} transform={`translate(${x},${y})`} className={`hvezda ${stav}`}>
                <circle r={Math.max(r * 3.2, stav === "dalsi" ? 5.5 : 4)} fill="url(#glow)" className="zare" />
                <path d={sparklePath(Math.max(r * 2.3, stav === "cekajici" ? 1.4 : 2))} className="tvar" />
              </g>
            );
          })}

          {/* Nejbližší dvě hvězdy dělí jen 3 jednotky, takže terče se nesmí překrývat
              přes střed sousedky. Velký terč aktivní hvězdy je proto dole a malé
              terče už spojených hvězd (r < 3) nad ním – žádný z nich nezakryje střed. */}
          {!hotovo && otevrena === null && (
            <>
              {spojeno < stars.length && (
                <circle cx={stars[spojeno][0]} cy={stars[spojeno][1]} r={8} fill="transparent"
                  className="terc" onClick={odemkniDalsi} />
              )}
              {stars.slice(0, spojeno).map(([x, y], i) => (
                <circle key={i} cx={x} cy={y} r={1.4} fill="transparent" className="terc"
                  onClick={() => setOtevrena(i)} />
              ))}
            </>
          )}

          {hotovo && (
            <text x={popisekX} y={popisekY} textAnchor="middle" className="popisek">
              Lucinka &amp; Vojta
            </text>
          )}
        </svg>
        {hlaska && <div className="hlaska">{hlaska}</div>}
      </div>

      <p className="napoveda">
        {hotovo
          ? "Tohle souhvězdí nikdo jiný na světě nemá."
          : spojeno === 0
            ? "Klepni na hvězdu, která bliká ✨"
            : "Pokračuj na další blikající hvězdu"}
      </p>

      {vzpominka && (
        <div className="prekryv">
          <div className="karta vzpominka">
            <p className="nadtitulek">Hvězda {otevrena! + 1} z {stars.length}</p>
            {vzpominka.foto ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={`/fotky/${vzpominka.foto}`} alt={vzpominka.nadpis} className="foto" />
            ) : (
              <div className="foto placeholder">✦</div>
            )}
            <h2 className="titulek stredni">{vzpominka.nadpis}</h2>
            {vzpominka.datum && <p className="datum">{vzpominka.datum}</p>}
            <p className="text">{vzpominka.text}</p>
            <button className="tlacitko" onClick={zavriVzpominku}>
              {spojeno === stars.length && !hotovo
                ? "Dokončit srdce ♥"
                : otevrena === spojeno - 1
                  ? "Pokračovat"
                  : "Zavřít"}
            </button>
          </div>
        </div>
      )}

      {faze === "vyhra" && (
        <div className="prekryv vyhra-obal">
          <div className="srdicka" aria-hidden="true">
            {Array.from({ length: 9 }, (_, i) => (
              <span key={i} style={{ "--i": i } as React.CSSProperties}>♥</span>
            ))}
          </div>
          <div className="karta vzpominka vyhra">
            <div className="srdicko velke">♥</div>
            <p className="nadtitulek">{vyhra.nadtitulek}</p>
            <h2 className="titulek">{vyhra.nadpis}</h2>
            <p className="text">{vyhra.text}</p>
            <p className="cena">{vyhra.cena}</p>
            <button className="tlacitko" onClick={() => setFaze("galerie")}>
              Ukázat všech 12 vzpomínek
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
