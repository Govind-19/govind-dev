/*
 * Builds the "schema hall" figure on the home page: an architect's model of the
 * Maahita school ERP.
 *
 *   plinth and steps  the deploy base (Docker + Nginx on DigitalOcean)
 *   colonnade         the Express API layer every request passes through
 *   hall of drawers   PostgreSQL, one schema per school, each holding the same
 *                     15 module cards (admissions, timetable, marks, fees ...)
 *   stepped attic     the React frontend people actually see
 *   carriage + key    one connection; it sets search_path, so only the drawer
 *                     at its bay can slide out
 *
 * Run `node scripts/figures/schema-hall/build.mjs` after changing anything here.
 * It writes components/figures/schema-hall/art.generated.ts for the site and a
 * light and dark preview page into the folder given by --preview (optional).
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import * as k from "../iso/iso-kit.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const SITE = join(HERE, "..", "..", "..");
const OUT = join(SITE, "components", "figures", "schema-hall");

const WIDTH = 600;
const HEIGHT = 440;

/* ---------- the world, in units of about 1 px of the model ---------- */
const BASE = { x: -162, y: -70, w: 324, d: 170, r: 8 };
const BASE_Z = -22;
const BASE_TOP = -12;
const STEP_LOW = { x: -148, y: -58, w: 296, d: 108, r: 2 };
const STEP_TOP = { x: -141, y: -51, w: 282, d: 95, r: 2 };

const CELLA = { x: -118, y: -34, w: 236, d: 52, r: 1.5 };
const CELLA_H = 84;
const FACE_Y = CELLA.y + CELLA.d; // 18, the face the drawers come out of

const COL_Y = 28;
const COL_XS = [-126, -90, -54, -18, 18, 54, 90, 126];
const BAYS = COL_XS.slice(0, -1).map((x) => x + 18);
const SIDE = [-36, -4];

const OPEN = { z0: 34, z1: 56, half: 11.5 };
const TRAVEL = 18;
const CARDS = 15; // module tables per school schema
const START_BAY = 2;

const RAILS = [66, 78];
const CARRIAGE_Z = BASE_TOP + 3; // rides on the rail tops

const P = k.fitProjection(
  [
    ...k.boxCorners(BASE, BASE_Z - 5, BASE_TOP),
    [-139, -47, 96.5],
    [139, 41, 96.5],
    [0, 0, 168],
    [-10, -9, 168],
    [10, 5, 168],
  ],
  WIDTH,
  HEIGHT,
  { pad: 18, azimuth: 58 },
);

const at = (p) => k.iso(p, P);
const S = (paths, style) => k.solidSvg(paths, style);
const L = (d, style) => k.lineSvg(d, style);
const D = (points, style) => k.dotsSvg(points, style);
const slab = (plan, z, h, steps = 3, bevel = 0) => k.slabOf(plan, z, h, P, steps, bevel);
const depth = (p) => k.depthOf(p, P);
const byDepth = (points) => [...points].sort((a, b) => depth([a[0], a[1], 0]) - depth([b[0], b[1], 0]));
const closed = (points3) => k.pathOf(points3.map(at), true);
const fmt = (n) => Math.round(n * 100) / 100;

/** A closed rectangle on the vertical face y = fy. */
const faceRect = (x0, x1, z0, z1, fy) => closed([[x0, fy, z0], [x1, fy, z0], [x1, fy, z1], [x0, fy, z1]]);

/** An arched opening (round top) on the vertical face y = fy. */
function archOn(cx, half, z0, spring, fy) {
  const pts = [[cx - half, fy, z0], [cx + half, fy, z0], [cx + half, fy, spring]];
  for (let i = 1; i < 24; i++) {
    const a = (Math.PI * i) / 24;
    pts.push([cx + half * Math.cos(a), fy, spring + half * Math.sin(a)]);
  }
  pts.push([cx - half, fy, spring]);
  return closed(pts);
}

function hull(points) {
  const pts = [...points].sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const cross = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  const lower = [];
  for (const p of pts) {
    while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], p) <= 0) lower.pop();
    lower.push(p);
  }
  const upper = [];
  for (const p of [...pts].reverse()) {
    while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], p) <= 0) upper.pop();
    upper.push(p);
  }
  return k.pathOf([...lower.slice(0, -1), ...upper.slice(0, -1)], true);
}

/* ---------- base: a display plinth on four feet ---------- */
function base() {
  const out = [`<path class="iso-halo" d="${k.haloOf(BASE, BASE_Z - 5, 15, P)}"/>`];
  for (const [x, y] of byDepth(k.corners(BASE, 24))) {
    out.push(S(k.cylinder(x, y, 7, BASE_Z - 5, 1.6, P, 28), { tone: "lo" }));
    out.push(S(k.cylinder(x, y, 5.4, BASE_Z - 3.4, 3.4, P, 28), { tone: "mid" }));
  }
  out.push(S(slab(BASE, BASE_Z, BASE_TOP - BASE_Z, 8, 1.6), { tone: "mid", inner: L(k.sideSeam(BASE, BASE_Z + 4, P, 8), { tone: "faint" }) }));
  out.push(L(k.planOutline(k.insetPlan(BASE, 5), BASE_TOP, P), { tone: "lo" }));
  const screws = k.corners(BASE, 10);
  out.push(L(screws.map(([x, y]) => k.ring(x, y, 2.2, BASE_TOP, P, 16)).join(""), { tone: "lo" }));
  out.push(D(screws.map(([x, y]) => at([x, y, BASE_TOP])), { size: 0.5 }));
  return out.join("");
}

/* the stylobate: two broad steps the building stands on */
function steps() {
  return [
    S(slab(STEP_LOW, BASE_TOP, 6, 4, 0.8), { tone: "mid" }),
    S(slab(STEP_TOP, BASE_TOP + 6, 6, 4, 0.8), { tone: "mid" }),
  ].join("");
}

/* ruler, label plate, rails and end stops on the forecourt */
function forecourt() {
  const out = [];
  const strip = { x: -146, y: 90, w: 292, d: 6, r: 1 };
  out.push(S(slab(strip, BASE_TOP, 0.6, 3), { tone: "lo", crease: "none" }));
  const ticks = k.topTicks(strip.x + 4, strip.x + strip.w - 4, 4, 5, strip.y + 0.8, BASE_TOP + 0.6, [2, 3.6], P);
  out.push(L(ticks.minor, { tone: "lo" }), L(ticks.major, { tone: "mid" }));
  out.push(D([at([strip.x + 2, strip.y + 3, BASE_TOP + 0.6]), at([strip.x + strip.w - 2, strip.y + 3, BASE_TOP + 0.6])], { size: 0.45 }));

  const plate = { x: -150, y: 53, w: 44, d: 10, r: 1 };
  out.push(S(slab(plate, BASE_TOP, 0.8, 4), { tone: "lo", crease: "none" }));
  out.push(L(k.planOutline(k.insetPlan(plate, 1.4), BASE_TOP + 0.8, P, 3), { tone: "faint" }));
  out.push(k.faceTextSvg(k.topMatrix([plate.x + plate.w / 2, plate.y + 6.6], BASE_TOP + 0.8, P, "x"), "MAAHITA ERP", { size: 3.4, tone: "mid", anchor: "middle" }));
  out.push(D([at([plate.x + 3, plate.y + 5, BASE_TOP + 0.8]), at([plate.x + plate.w - 3, plate.y + 5, BASE_TOP + 0.8])], { size: 0.45 }));

  for (const y of RAILS) {
    out.push(S(slab({ x: -150, y, w: 300, d: 4, r: 1 }, BASE_TOP, 3, 3, 0.4), { tone: "mid" }));
    out.push(D([-144, -72, 0, 72, 144].map((x) => at([x, y + 2, BASE_TOP + 3])), { size: 0.4, tone: "lo" }));
  }
  for (const x of [-156, 150]) {
    out.push(S(slab({ x, y: 62, w: 6, d: 24, r: 1.2 }, BASE_TOP, 7, 3, 0.5), { tone: "mid" }));
    out.push(D([at([x + 3, 66, BASE_TOP + 7]), at([x + 3, 82, BASE_TOP + 7])], { size: 0.45 }));
  }
  return out.join("");
}

/* ---------- a fluted Doric column: plinth, torus, shaft, echinus, abacus ---------- */
function column(cx, cy) {
  const out = [];
  out.push(S(slab({ x: cx - 6, y: cy - 6, w: 12, d: 12, r: 0.8 }, 0, 1.6, 3, 0.4), { tone: "mid" }));
  out.push(S(k.cylinder(cx, cy, 5.6, 1.6, 1.8, P, 20), { tone: "mid" }));
  out.push(S(k.cylinder(cx, cy, 4.4, 3.4, 72.6, P, 20), { tone: "mid", crease: "none", inner: L(k.knurl(cx, cy, 4.4, 3.4, 76, 14, P, 0.5), { tone: "faint" }) }));
  out.push(S(k.cylinder(cx, cy, 5.4, 76, 2.4, P, 20), { tone: "mid" }));
  out.push(S(slab({ x: cx - 6.5, y: cy - 6.5, w: 13, d: 13, r: 0.8 }, 78.4, 5.6, 3, 0.4), { tone: "mid" }));
  return out.join("");
}

/* ---------- the hall: one drawer per school schema ---------- */
function cella() {
  const out = [];
  const courses = [30, 62].map((z) => L(k.sideSeam(CELLA, z, P, 3), { tone: "faint" })).join("");
  out.push(S(slab(CELLA, 0, CELLA_H, 3, 0.6), { tone: "mid", inner: courses }));
  for (const c of BAYS) {
    const x0 = c - OPEN.half;
    const x1 = c + OPEN.half;
    // the opening: a dark void, the recess floor and the left reveal wall, then its rim
    out.push(`<path class="hall-void" d="${faceRect(x0, x1, OPEN.z0, OPEN.z1, FACE_Y)}"/>`);
    out.push(`<path class="iso-top" d="${closed([[x0, FACE_Y - 4, OPEN.z0], [x1, FACE_Y - 4, OPEN.z0], [x1, FACE_Y, OPEN.z0], [x0, FACE_Y, OPEN.z0]])}"/>`);
    out.push(`<path class="iso-shade" data-shade="2" d="${closed([[x0, FACE_Y - 4, OPEN.z0], [x0, FACE_Y, OPEN.z0], [x0, FACE_Y, OPEN.z1], [x0, FACE_Y - 4, OPEN.z1]])}"/>`);
    out.push(L(faceRect(x0, x1, OPEN.z0, OPEN.z1, FACE_Y), { tone: "lo" }));
    // a small number plate above each opening
    out.push(L(faceRect(c - 4, c + 4, 60, 64.5, FACE_Y), { tone: "faint" }));
  }
  return out.join("");
}

/**
 * What is inside a drawer: its floor, walls and the 15 module cards. Only one
 * drawer is ever open, so there is one shared copy, built in bay 0; the live
 * code moves it into whichever drawer is opening and shifts it along x.
 */
function inside() {
  const c = BAYS[0];
  const out = [];
  const x0 = c - 10.5;
  out.push(S(slab({ x: x0, y: -2, w: 21, d: 20, r: 0.4 }, 34.5, 1, 2), { tone: "mid", crease: "none" }));
  out.push(S(slab({ x: x0, y: -2, w: 21, d: 0.8, r: 0.2 }, 35.5, 18, 2), { tone: "mid" }));
  out.push(S(slab({ x: x0, y: -1.2, w: 0.8, d: 19.2, r: 0.2 }, 35.5, 18, 2), { tone: "mid" }));
  for (let j = 0; j < CARDS; j++) {
    const y = -0.6 + 1.2 * j;
    out.push(S(slab({ x: c - 9.4, y, w: 18.8, d: 0.45, r: 0.1 }, 35.5, 12, 1), { tone: "lo", crease: "none" }));
  }
  out.push(S(slab({ x: c + 9.7, y: -1.2, w: 0.8, d: 19.2, r: 0.2 }, 35.5, 18, 2), { tone: "mid" }));
  return `<g data-part="inside" transform="${k.translateAlong(P, [BAYS[START_BAY] - c, 0, 0])}">${out.join("")}</g>`;
}

/** One drawer front, built shut; the live code slides it out along +y by TRAVEL. */
function drawer(c, i) {
  const front = [];
  front.push(S(slab({ x: c - 11, y: FACE_Y, w: 22, d: 2.5, r: 0.6 }, OPEN.z0, OPEN.z1 - OPEN.z0, 3, 0.5), { tone: "hi", crease: "lo", lit: i === START_BAY }));
  const fy = FACE_Y + 2.5;
  front.push(L(faceRect(c - 6, c + 6, 48, 52.5, fy), { tone: "lo" }));
  front.push(D([at([c - 7.6, fy, 50.2]), at([c + 7.6, fy, 50.2])], { size: 0.4 }));
  front.push(S(slab({ x: c - 1.2, y: fy, w: 2.4, d: 1.4, r: 0.4 }, 42.6, 2.8, 2), { tone: "mid", crease: "none" }));
  front.push(S(slab({ x: c - 5, y: fy + 1.4, w: 10, d: 1.6, r: 0.6 }, 42.4, 3.2, 3), { tone: "mid" }));

  // clip to what can be seen: the opening, swept out of the face toward the viewer
  const rect = [[c - OPEN.half, OPEN.z0], [c + OPEN.half, OPEN.z0], [c + OPEN.half, OPEN.z1 + 0.6], [c - OPEN.half, OPEN.z1 + 0.6]];
  const clip = hull([...rect.map(([x, z]) => at([x, FACE_Y, z])), ...rect.map(([x, z]) => at([x, FACE_Y + 60, z]))]);
  const open = i === START_BAY ? TRAVEL : 0;
  return `<clipPath id="hall-bay-${i}"><path d="${clip}"/></clipPath><g clip-path="url(#hall-bay-${i})"><g data-part="drawer-${i}" transform="${k.translateAlong(P, [0, open, 0])}">${i === START_BAY ? inside() : ""}<g data-part="front-${i}">${front.join("")}</g></g></g>`;
}

/* ---------- entablature and the stepped attic (the frontend) ---------- */
function entablature() {
  const out = [];
  const arch = { x: -134, y: -42, w: 268, d: 78, r: 1 };
  out.push(S(slab(arch, CELLA_H, 8, 3, 0.6), { tone: "mid", inner: L(k.sideSeam(arch, CELLA_H + 3, P, 3), { tone: "faint" }) }));
  const fy = arch.y + arch.d;
  for (const x of COL_XS) out.push(L(faceRect(x - 2.2, x + 2.2, CELLA_H + 4.2, CELLA_H + 7.2, fy), { tone: "lo" }));
  out.push(S(slab({ x: -139, y: -47, w: 278, d: 88, r: 1.5 }, CELLA_H + 8, 4.5, 4, 0.8), { tone: "mid" }));
  return out.join("");
}

function attic() {
  const out = [];
  const t1 = { x: -104, y: -30, w: 208, d: 54, r: 1 };
  out.push(S(slab(t1, 96.5, 27.5, 3, 0.6), { tone: "mid" }));
  const f1 = t1.y + t1.d;
  for (const cx of [-68, -34, 0, 34, 68]) {
    out.push(`<path class="hall-void" d="${archOn(cx, 9, 101, 110, f1)}"/>`);
    out.push(L(archOn(cx, 9, 101, 110, f1), { tone: "lo" }));
  }
  out.push(S(slab({ x: -107, y: -33, w: 214, d: 60, r: 1.2 }, 124, 2, 3, 0.5), { tone: "mid" }));

  const t2 = { x: -78, y: -22, w: 156, d: 38, r: 1 };
  out.push(S(slab(t2, 126, 16, 3, 0.6), { tone: "mid" }));
  for (const cx of [-37, 0, 37]) {
    out.push(`<path class="hall-void" d="${faceRect(cx - 7, cx + 7, 130, 138, t2.y + t2.d)}"/>`);
    out.push(L(faceRect(cx - 7, cx + 7, 130, 138, t2.y + t2.d), { tone: "lo" }));
  }
  const t3 = { x: -36, y: -14, w: 72, d: 22, r: 1 };
  out.push(S(slab(t3, 142, 14, 3, 0.6), { tone: "mid" }));
  const f3 = t3.y + t3.d;
  out.push(L(k.sideRing([0, f3, 149], 4.4, "y", P, 32), { tone: "lo" }));
  out.push(L(k.sideRing([0, f3, 149], 2.6, "y", P, 24), { tone: "faint" }));
  out.push(D([at([0, f3, 149])], { size: 0.55, tone: "hi" }));
  out.push(S(slab({ x: -10, y: -9, w: 20, d: 14, r: 0.8 }, 156, 12, 3, 0.5), { tone: "mid" }));
  return out.join("");
}

/* ---------- the connection: a carriage on the rails with a key ---------- */
function carriage() {
  const out = [];
  const plate = { x: -15, y: 63, w: 30, d: 22, r: 2 };
  out.push(`<path class="iso-halo" d="${k.haloOf(k.insetPlan(plate, 3), CARRIAGE_Z, 0.1, P)}" style="filter:blur(4px)"/>`);
  out.push(S(slab(plate, CARRIAGE_Z, 4, 5, 0.5), { tone: "mid" }));
  out.push(D([-10, -4, 4, 10].map((x) => at([x, plate.y + plate.d - 2.4, CARRIAGE_Z + 4])), { size: 0.4, tone: "lo" }));
  const top = CARRIAGE_Z + 4;
  out.push(S(k.cylinder(0, 74, 3.8, top, 2, P, 24), { tone: "mid" }));
  out.push(S(k.cylinder(0, 74, 2.6, top + 2, 20, P, 24), { tone: "mid", crease: "none", inner: L(k.sideArc(0, 74, 2.6, top + 12, P, 16), { tone: "faint" }) }));
  // the key: a rod pointing at the bay, with two bits, held by the head block
  const rodZ = top + 17;
  out.push(S(slab({ x: -1.1, y: 47.5, w: 2.2, d: 1.6, r: 0.3 }, rodZ - 2.6, 2.6, 2), { tone: "hi", crease: "lo" }));
  out.push(S(slab({ x: -1.1, y: 51, w: 2.2, d: 1.6, r: 0.3 }, rodZ - 1.8, 1.8, 2), { tone: "hi", crease: "lo" }));
  out.push(S(slab({ x: -1.1, y: 46, w: 2.2, d: 23, r: 0.6 }, rodZ, 2.2, 3), { tone: "hi", crease: "lo" }));
  out.push(S(slab({ x: -6, y: 69, w: 12, d: 10, r: 1 }, top + 14, 9, 3, 0.4), { tone: "hi", crease: "lo" }));
  out.push(D([at([-3.5, 76, top + 23]), at([3.5, 76, top + 23])], { size: 0.45 }));
  // a knurled thumb knob on the front face
  out.push(S(slab({ x: 7, y: plate.y + plate.d - 1, w: 3, d: 3.4, r: 0.8 }, CARRIAGE_Z + 0.6, 2.8, 2), { tone: "mid", crease: "none" }));
  out.push(S(k.cylinder(8.5, plate.y + plate.d + 4.4, 2.6, CARRIAGE_Z, 5, P, 20), { tone: "mid" }));
  out.push(L(k.knurl(8.5, plate.y + plate.d + 4.4, 2.6, CARRIAGE_Z, CARRIAGE_Z + 5, 18, P), { tone: "lo" }));
  return `<g data-part="carriage" transform="${k.translateAlong(P, [BAYS[START_BAY], 0, 0])}">${out.join("")}</g>`;
}

/* ---------- painter's order ---------- */
const body = [base(), steps(), forecourt()];
for (const y of SIDE) body.push(column(-126, y)); // behind the hall's left wall
body.push(cella());
for (const y of SIDE) body.push(column(126, y));
// front row, far to near: column, then the drawer in the bay to its right
COL_XS.forEach((x, i) => {
  body.push(column(x, COL_Y));
  if (i < BAYS.length) body.push(drawer(BAYS[i], i));
});
body.push(entablature(), attic(), carriage());

const label =
  "An architect's model of the Maahita school ERP. On a display plinth, a colonnade stands in front of a hall of seven drawers, one PostgreSQL schema per school, each holding the same fifteen module cards. A carriage on a rail in front carries a key; wherever it stops, only the drawer at that bay slides out, because each connection sets its own search path.";
const svg = k.figureSvg({ width: WIDTH, height: HEIGHT, label, body });

const ax = k.axisVector(P, [1, 0, 0]);
const ay = k.axisVector(P, [0, 1, 0]);
const DATA = {
  bays: BAYS,
  start: 0,
  travel: TRAVEL,
  ax: ax.map(fmt),
  ay: ay.map(fmt),
  bayFx: BAYS.map((c) => fmt(at([c, FACE_Y + 4, 45])[0] / WIDTH)),
  insideDx: BAYS.map((c) => k.axisVector(P, [c - BAYS[0], 0, 0]).map(fmt)),
};
const READOUT = `search_path = school_0${START_BAY + 1} · 1 of ${BAYS.length} schemas open`;

writeFileSync(
  join(OUT, "art.generated.ts"),
  `// Generated by scripts/figures/schema-hall/build.mjs. Do not edit by hand.\n` +
    `export const HALL_SVG = ${JSON.stringify(svg)};\n` +
    `export const HALL_DATA = ${JSON.stringify(DATA)};\n` +
    `export const HALL_READOUT = ${JSON.stringify(READOUT)};\n`,
);
console.log(`wrote art.generated.ts (${Math.round(svg.length / 1024)} KB svg)`);

/* ---------- optional standalone preview pages for capture and line checks ---------- */
const pi = process.argv.indexOf("--preview");
if (pi > 0) {
  const dir = process.argv[pi + 1];
  const css = readFileSync(join(OUT, "schema-hall.css"), "utf8");
  const live = readFileSync(join(OUT, "live.mjs"), "utf8").replace("export function", "function");
  for (const theme of ["light", "dark"]) {
    const page = `<!doctype html><html lang="en" data-theme="${theme}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Schema hall</title><style>
:root{--color-paper:#f4f1e8;--color-line:#d8d2c0;--font-mono:ui-monospace,Menlo,Consolas,monospace}
html[data-theme="dark"]{--color-paper:#1f1f1e;--color-line:#3a3a37}
*{box-sizing:border-box}body{margin:0;background:var(--color-paper);font:14px/1.6 system-ui,sans-serif}
main{width:min(704px,100% - 32px);margin:48px auto}
${css}</style></head><body><main class="hall">
<figure class="iso-figure"><div class="iso-plate"><div class="iso-plate-corners" aria-hidden="true"><span class="iso-plate-corner" data-corner="fig">Fig 1</span><span class="iso-plate-corner" data-corner="title">The architect</span><span class="iso-plate-corner" data-corner="hint">Hover a bay</span><span class="iso-plate-corner" data-corner="readout" data-readout>${READOUT}</span></div>
<div class="iso-stage" tabindex="0" role="slider" aria-label="Schema hall: arrow keys move the connection between schools" aria-valuemin="1" aria-valuemax="${BAYS.length}" aria-valuenow="${START_BAY + 1}">${svg}</div></div></figure>
</main><script type="module">${live}
mountSchemaHall(document.querySelector(".iso-stage"), document.querySelector("[data-readout]"), ${JSON.stringify(DATA)});
</script></body></html>`;
    writeFileSync(join(dir, `schema-hall${theme === "light" ? "" : "-dark"}.html`), page);
  }
  console.log("wrote previews to", dir);
}
