/* ============================================================
   Arranque: detecta la página y dispara el render que corresponde.
   ============================================================ */

import { cargarEstado, guardarEstado, solicitud } from "./estado.js";
import { renderStepper, renderResumen } from "./render.js";
import { testCotizador } from "./cotizador.js";
import { protegerRuta, RUTAS } from "./navegacion.js";

document.addEventListener("DOMContentLoaded", () => {
  cargarEstado();

  // Test del cotizador solo en modo desarrollo / primera carga
  if (sessionStorage.getItem("cubri:test-cotizador") !== "ok") {
    testCotizador();
    sessionStorage.setItem("cubri:test-cotizador", "ok");
  }

  const page = document.body.dataset.page; // definido en cada HTML
  const paso = Number(document.body.dataset.paso || 0);

  // Protección de rutas (no deja entrar a pago sin datos, etc.)
  if ([2, 3, 4, 5, 6].includes(paso)) protegerRuta(paso);

  // Render común
  renderStepper();
  renderResumen();

  // Render específico por página
  const renders = {
    inicio:      () => {},
    cotizacion:  () => {},
    planes:      () => {},
    datos:       () => {},
    pago:        () => {},
    exito:       () => {},
    error:       () => {},
  };
  renders[page]?.();

  // Persistir al salir (back/forward y cierre)
  window.addEventListener("pagehide", guardarEstado);
});

export { RUTAS, solicitud };