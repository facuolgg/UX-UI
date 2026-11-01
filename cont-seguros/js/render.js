/* ============================================================
   Render: stepper + resumen (versión inicial, ampliable).
   El resumen se genera SIEMPRE desde `solicitud`.
   ============================================================ */

import { solicitud } from "./estado.js";

const fmtARS = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0,
});

/** Pinta el stepper. Cada HTML tiene 4 pasos (1..4). */
export function renderStepper() {
  const cont = document.querySelector("[data-stepper]");
  if (!cont) return;
  const pasos = cont.querySelectorAll("[data-step]");
  pasos.forEach((el) => {
    const n = Number(el.dataset.step);
    let state = "pending";
    if (n < solicitud.paso) state = "complete";
    else if (n === solicitud.paso) state = "active";
    el.dataset.state = state;
    el.setAttribute("aria-current", n === solicitud.paso ? "step" : "false");
  });
}

/** Pinta el resumen (barra mobile / card lateral desktop).
 *  Se usa el mismo markup y se duplica visualmente por CSS (una sola generación). */
export function renderResumen() {
  const conts = document.querySelectorAll("[data-resumen]");
  if (!conts.length) return;

  const { equipo, plan, titular } = solicitud;
  const planNombre = plan ? plan.charAt(0).toUpperCase() + plan.slice(1) : "—";
  const nombreTitular = [titular.nombre, titular.apellido].filter(Boolean).join(" ") || "—";

  conts.forEach((c) => {
    c.innerHTML = `
      <header class="mb-3">
        <h2 class="text-base font-semibold">Resumen</h2>
      </header>
      <section class="space-y-2 text-sm">
        <div class="flex justify-between"><span class="text-[var(--muted)]">Seguro</span><span>Celular</span></div>
        <div class="flex justify-between"><span class="text-[var(--muted)]">Equipo</span><span>${equipo.marca || "—"} ${equipo.modelo || ""}</span></div>
        <div class="flex justify-between"><span class="text-[var(--muted)]">Valor</span><span>${equipo.valor ? fmtARS.format(equipo.valor) : "—"}</span></div>
        <div class="flex justify-between"><span class="text-[var(--muted)]">Plan</span><span>${planNombre}</span></div>
        <div class="flex justify-between"><span class="text-[var(--muted)]">Titular</span><span>${nombreTitular}</span></div>
        <div class="flex justify-between"><span class="text-[var(--muted)]">Cuota</span><span data-resumen-cuota>${solicitud.cuota ? fmtARS.format(solicitud.cuota) : "—"}</span></div>
      </section>
    `;
  });
}

export { fmtARS };