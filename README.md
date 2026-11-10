# Naše nebe 💛

Webová hra k 4. výročí. Lucinka spojuje 12 skutečných hvězd, které 27. 11. 2022 v 1:00 tvořily nad Frýdlantem srdce. Každá hvězda odemkne jednu vzpomínku.

## Spuštění

```bash
npm install
npm run dev
```

Pak otevři http://localhost:3000.

## Co upravit

Všechno, co budeš měnit, je v souboru **`data/vzpominky.ts`**:

- **12 vzpomínek**: nadpis, datum, text a fotka (pořadí odpovídá pořadí hvězd)
- **úvodní otázka**: text otázky a povolené odpovědi (bez diakritiky, malými písmeny). Vypneš ji nastavením `zapnuto: false`.
- **`vyhra`**: výherní obrazovka „Vyhrála jsi!“ hned po spojení celého srdce
- **`finale`**: závěrečný vzkaz pod galerií všech dvanácti vzpomínek

## Jak hra běží

1. Úvodní otázka → úvodní karta.
2. Bliká vždy jen jedna hvězda. Klepnutím se otevře karta s fotkou a popisem; zavřít ji lze **jen** tlačítkem *Pokračovat*, pak začne blikat další hvězda.
3. Po 12. hvězdě se srdce dokreslí a vyplní.
4. Objeví se výherní obrazovka **„Vyhrála jsi!“**.
5. Tlačítkem se otevře galerie: celé srdce a všech 12 vzpomínek s fotkami pohromadě, dole závěrečný vzkaz.

## Ukládání postupu

Postup se průběžně ukládá do prohlížeče (`localStorage`, klíč `nase-nebe-postup`), takže obnovení stránky, zamčení telefonu ani zavření záložky hru nevrátí na začátek. Ukládá se jen fáze, počet spojených hvězd a to, jestli je srdce hotové – nic se nikam neodesílá.

Úplně dole pod závěrečným vzkazem je nenápadné tlačítko **„Spojit hvězdy znovu“**, kterým se dá hra přehrát od začátku (třeba když ji bude chtít někomu ukázat). Přeskočí úvodní otázku a začne rovnou úvodní kartou.

Postup je uložený v konkrétním prohlížeči, takže na jiném telefonu začne hra od začátku.

## Fotky

Leží v `public/fotky/` a jsou zmenšené na 825 × 1100 px (dohromady 1,7 MB místo původních 11,5 MB, aby se hra načetla i na mobilních datech). Nezmenšené originály jsou ve složce `fotky-originaly/`, která se do gitu ani na Vercel nenahrává.

| # | Vzpomínka | Soubor |
|---|---|---|
| 1 | Dvě kočky | `dve-kocky.jpeg` |
| 2 | Halloween párty | `halloween-party.jpeg` |
| 3 | Společná oslava 18. narozenin | `oslava-18.jpeg` |
| 4 | Akvárium v Barceloně | `barcelona.jpeg` |
| 5 | Maturitní ples | `maturitni-ples.jpeg` |
| 6 | Sjezd trpaslíků | `trpaslici-wroclaw.jpeg` |
| 7 | Na výletě v pražské ZOO | `zoo.jpeg` |
| 8 | Malta 2026 | `malta.jpeg` |
| 9 | Madeira 2026 | `madeira.jpeg` |
| 10 | Madeirský obídek | `madeira-obidek.jpeg` |
| 11 | Zábava na betonku | `betonek.jpeg` |
| 12 | Gdaňsk 2026 | `gdansk.jpeg` |

Když chceš fotku vyměnit, dej novou do `public/fotky/` pod stejným názvem. Názvy souborů drž bez mezer a diakritiky – Vercel běží na Linuxu, kde se velikost písmen rozlišuje. Pokud fotka chybí, karta místo ní zobrazí zlatou hvězdičku a hra funguje dál.

## Ikona (favicon)

Next.js si ikony bere podle názvu souboru, nemusí se nikam registrovat:

- `app/favicon.ico` – ikona v záložce prohlížeče
- `app/icon.png` – 192 × 192, moderní prohlížeče
- `app/apple-icon.png` – 180 × 180, iPhone „Přidat na plochu“
- `public/icons/icon-192.png` a `icon-512.png` – ikony pro `app/manifest.ts`

Když budeš chtít jinou ikonu, přepiš tyhle soubory. Nezmenšené originály z favicon.io jsou v `ikony-originaly/` (mimo git i Vercel).

`data/sky.json` neměň. Obsahuje přesně spočítanou oblohu, stejnou jako na obraze.

> **Pozor:** nespouštěj `npm run build`, když zároveň běží `npm run dev` – oba zapisují do složky `.next` a dev server se tím rozbije. Když se to stane, zastav ho, smaž `.next` a spusť `npm run dev` znovu.

## Nasazení na Vercel (zdarma)

1. Nahraj projekt do (klidně soukromého) GitHub repozitáře.
2. Na vercel.com dej **Add New → Project**, vyber repozitář a dej **Deploy**.
3. Získanou adresu si můžeš v nastavení projektu přejmenovat na něco nenápadného.

Stránka má zakázané indexování vyhledávači, takže ji nikdo náhodou nenajde.

Po nasazení z adresy vyrob QR kód na zadní stranu rámu.
