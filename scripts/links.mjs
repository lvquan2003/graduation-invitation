// node scripts/links.mjs http://localhost:3000
import fs from "node:fs";
const base = (process.argv[2] || "http://localhost:3000").replace(/\/$/, "");
const guests = JSON.parse(fs.readFileSync("guests.json", "utf8"));
const join = (n) => { const a = [].concat(n).filter(Boolean); return a.length < 2 ? a[0] || "" : a.slice(0, -1).join(", ") + " & " + a.at(-1); };
const out = guests.map((g) => { const n = join(g.name); return `${n}: ${base}/?to=${encodeURIComponent(n)}`; }).join("\n");
fs.writeFileSync("links.txt", out + "\n");
console.log(out);