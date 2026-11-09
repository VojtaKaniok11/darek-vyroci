// ============================================================
//  TADY UPRAVUJEŠ OBSAH HRY
// ============================================================
//  - Každá vzpomínka patří jedné hvězdě srdce (v pořadí, jak je
//    Lucinka bude spojovat – řazeno chronologicky od nejstarší).
//  - Musí jich být přesně 12.
//  - foto: název souboru ve složce public/fotky (např. "zoo.jpeg"),
//    nebo null, když fotka nebude.
// ============================================================

export type Vzpominka = {
  nadpis: string;
  datum?: string;
  text: string;
  foto: string | null;
};

export const vzpominky: Vzpominka[] = [
  {
    nadpis: "Dvě kočky",
    datum: "30. října 2023",
    text: "Nejstarší fotka na celém seznamu. Nemohl jsem vynechat dvě kočky, za kterými se nelze neotočit.",
    foto: "dve-kocky.jpeg",
  },
  {
    nadpis: "Halloween párty",
    datum: "18. listopadu 2023",
    text: "Na téhle párty jsme spolu nebyli ještě ani rok. Teď už jsou to čtyři – no neletí ten čas?",
    foto: "halloween-party.jpeg",
  },
  {
    nadpis: "Společná oslava 18. narozenin",
    datum: "6. dubna 2024",
    text: "Sice bylo osmnáct jen jednomu z nás dvou, ale oslavili jsme to společně a večer jsme si užili.",
    foto: "oslava-18.jpeg",
  },
  {
    nadpis: "Akvárium v Barceloně",
    datum: "19. května 2024",
    text: "Co by to bylo za dárek, kdyby v něm nebyla naše společná dovolená v Barceloně. Moc jsme si ji užili a určitě ji zopakujeme.",
    foto: "barcelona.jpeg",
  },
  {
    nadpis: "Maturitní ples",
    datum: "28. února 2025",
    text: "Jedinečný den, na který nikdo z nás nezapomene. Ples před zkouškou „dospělosti“.",
    foto: "maturitni-ples.jpeg",
  },
  {
    nadpis: "Sjezd trpaslíků",
    datum: "6. srpna 2025 · Wrocław",
    text: "Dovolená v Polsku – naše první s Tondou a Terkou „na cestách po Polsku“.",
    foto: "trpaslici-wroclaw.jpeg",
  },
  {
    nadpis: "Na výletě v pražské ZOO",
    datum: "21. září 2025",
    text: "Společný výlet do pražské ZOO, ve které jsme byli oba dva poprvé. Všechna zvířátka se nám moc líbila.",
    foto: "zoo.jpeg",
  },
  {
    nadpis: "Malta 2026",
    datum: "20. června 2026",
    text: "Nechtěl jsem na „moc suché místo“, tak jsem vybral jedno z nejsušších a nejteplejších, co šlo.",
    foto: "malta.jpeg",
  },
  {
    nadpis: "Madeira 2026",
    datum: "20. června 2026",
    text: "Jedna z mnoha nejkrásnějších dovolených, které jsme spolu strávili – a ještě strávíme.",
    foto: "madeira.jpeg",
  },
  {
    nadpis: "Madeirský obídek",
    datum: "21. června 2026 · Santana",
    text: "Na Madeiře jsme nelenili. Tenhle chutný obídek byl z vesnice Santana.",
    foto: "madeira-obidek.jpeg",
  },
  {
    nadpis: "Zábava na betonku",
    datum: "1. srpna 2026",
    text: "Tohle je z léta, kdy jsme šli zapařit na betonek. Díky bohu, že bydlíme tak blízko.",
    foto: "betonek.jpeg",
  },
  {
    nadpis: "Gdaňsk 2026",
    datum: "14. srpna 2026",
    text: "Nemohl jsem si odepřít fotku s naším polibkem. Tím to začalo ve Višňové a pokračuje to dál – i tímhle z naší dovolené v Gdaňsku. Miluju tě!",
    foto: "gdansk.jpeg",
  },
];

// Úvodní otázka – Lucinka musí odpovědět, aby se hra odemkla.
// Odpověď se porovnává bez diakritiky a velikosti písmen a stačí, když napsaná
// odpověď některé z těchto slov obsahuje. Proto se píšou základy slov: "zabav"
// uzná i „na zábavě“ nebo „zábavu“, "frydlant" uzná i „ve Frýdlantu“.
// Když nechceš otázku vůbec, nastav zapnuto: false.
export const otazka = {
  zapnuto: true,
  text: "Kde jsme se poprvé potkali?",
  odpovedi: ["frydlant", "oldies", "zabav"],
};

// Výherní obrazovka – objeví se hned po spojení celého srdce.
export const vyhra = {
  nadtitulek: "12 z 12 hvězd · srdce je celé",
  nadpis: "Vyhrála jsi!",
  text:
    "Spojila jsi všech dvanáct hvězd a složila srdce, které nad námi svítilo tu noc, " +
    "kdy to všechno začalo. A víš, co jsi vyhrála? Mě. Ještě na hodně dlouho.",
  cena: "Hlavní výhra: jeden Vojta · bez možnosti vrácení ♥",
};

// Závěrečný vzkaz pod galerií všech vzpomínek.
export const finale = {
  nadpis: "Krásné výročí, Lucinko",
  text: "Čtyři roky, dvanáct hvězd a spousta dalších vzpomínek, které ještě nejsou na žádné fotce. Děkuju, že jsi se mnou.",
  podpis: "Tvůj Vojta",
};
