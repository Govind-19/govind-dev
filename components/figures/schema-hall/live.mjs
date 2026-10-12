/*
 * Motion for the schema hall figure. Plain browser JS with no imports, so the
 * site's client component and the standalone preview page share one copy.
 *
 * The model: a connection (the carriage) travels to one school's bay, and only
 * when it has arrived does that school's schema (its drawer) slide out. Every
 * other drawer stays shut, which is the whole point of schema-per-tenant.
 */
export function mountSchemaHall(stage, readout, data) {
  const svg = stage.querySelector("svg");
  const carriage = svg.querySelector('[data-part="carriage"]');
  const drawers = data.bays.map((_, i) => svg.querySelector(`[data-part="drawer-${i}"]`));
  const fronts = data.bays.map((_, i) => svg.querySelector(`[data-part="front-${i}"] .iso-solid`));
  // one shared drawer interior (walls and module cards), moved into the drawer that opens
  const inside = svg.querySelector('[data-part="inside"]');
  let home = data.bays.findIndex((_, i) => drawers[i].contains(inside));
  const moveInside = (i) => {
    if (i === home) return;
    drawers[i].insertBefore(inside, drawers[i].firstChild);
    inside.setAttribute("transform", `translate(${data.insideDx[i][0]} ${data.insideDx[i][1]})`);
    home = i;
  };
  const still = window.matchMedia("(prefers-reduced-motion: reduce)");
  const TOUR = [2, 5, 0, 4, 6, 1, 3];
  const name = (i) => `school_${String(i + 1).padStart(2, "0")}`;

  let target = TOUR[0];
  let x = data.bays[target];
  const open = data.bays.map((_, i) => (i === target ? 1 : 0));
  let touring = !still.matches;
  let clock = 0;
  let step = 0;
  let frame = 0;
  let last = 0;
  let visible = false;
  let idle = 0;

  function draw() {
    const dx = x - data.start;
    carriage.setAttribute("transform", `translate(${(data.ax[0] * dx).toFixed(2)} ${(data.ax[1] * dx).toFixed(2)})`);
    drawers.forEach((el, i) => {
      const d = data.travel * open[i];
      el.setAttribute("transform", `translate(${(data.ay[0] * d).toFixed(2)} ${(data.ay[1] * d).toFixed(2)})`);
      const lit = open[i] > 0.5;
      if (lit !== fronts[i].hasAttribute("data-lit")) fronts[i].toggleAttribute("data-lit", lit);
    });
    const arrived = Math.abs(x - data.bays[target]) < 0.5 && open[target] > 0.97;
    const text = arrived
      ? `search_path = ${name(target)} · 1 of ${data.bays.length} schemas open`
      : `connecting · ${name(target)}`;
    if (readout && readout.textContent !== text) readout.textContent = text;
    stage.setAttribute("aria-valuenow", String(target + 1));
    stage.setAttribute("aria-valuetext", text);
  }

  function tick(now) {
    const dt = last ? Math.min((now - last) / 1000, 1 / 30) : 1 / 60;
    last = now;
    const calm = still.matches;
    if (touring) {
      clock += dt;
      if (clock > 4) {
        clock = 0;
        step = (step + 1) % TOUR.length;
        target = TOUR[step];
      }
    }
    const tx = data.bays[target];
    x = calm ? tx : x + (tx - x) * (1 - Math.exp(-dt / 0.32));
    if (Math.abs(tx - x) < 0.02) x = tx;
    // one connection, one schema: the next drawer waits until every other is shut
    const shut = open.every((value, i) => i === target || value === 0);
    const there = Math.abs(tx - x) < 1.5 && shut;
    if (there) moveInside(target);
    let moving = x !== tx;
    open.forEach((value, i) => {
      const want = i === target && there ? 1 : 0;
      const next = calm ? want : value + (want - value) * (1 - Math.exp(-dt / 0.2));
      open[i] = Math.abs(want - next) < 0.002 ? want : next;
      if (open[i] !== want) moving = true;
    });
    draw();
    frame = visible && (touring || moving) ? requestAnimationFrame(tick) : 0;
  }

  const run = () => {
    if (!frame && visible) {
      last = 0;
      frame = requestAnimationFrame(tick);
    }
  };
  const steer = (index) => {
    touring = false;
    target = Math.max(0, Math.min(data.bays.length - 1, index));
    window.clearTimeout(idle);
    idle = window.setTimeout(() => {
      touring = !still.matches;
      clock = 0;
      step = Math.max(0, TOUR.indexOf(target));
      run();
    }, 4000);
    run();
  };

  const observer = new IntersectionObserver(
    (entries) => {
      visible = entries[entries.length - 1].isIntersecting;
      if (visible) run();
    },
    { rootMargin: "120px 0px" },
  );
  observer.observe(stage);

  const onMove = (event) => {
    const box = svg.getBoundingClientRect();
    const fx = (event.clientX - box.left) / box.width;
    let best = 0;
    data.bayFx.forEach((f, i) => {
      if (Math.abs(f - fx) < Math.abs(data.bayFx[best] - fx)) best = i;
    });
    if (best !== target || touring) steer(best);
  };
  const onKey = (event) => {
    let to = null;
    if (event.key === "ArrowRight" || event.key === "ArrowUp") to = target + 1;
    if (event.key === "ArrowLeft" || event.key === "ArrowDown") to = target - 1;
    if (event.key === "Home") to = 0;
    if (event.key === "End") to = data.bays.length - 1;
    if (to === null) return;
    event.preventDefault();
    steer(to);
  };
  stage.addEventListener("pointermove", onMove);
  stage.addEventListener("pointerdown", onMove);
  stage.addEventListener("keydown", onKey);
  draw();

  return () => {
    cancelAnimationFrame(frame);
    window.clearTimeout(idle);
    observer.disconnect();
    stage.removeEventListener("pointermove", onMove);
    stage.removeEventListener("pointerdown", onMove);
    stage.removeEventListener("keydown", onKey);
  };
}
