/* ============================================================
   Redirección entre páginas + protección de pasos.
   ============================================================ */

import { solicitud, guardarEstado } from "./estado.js";

export const RUTAS = {
  inicio:    "index.html",
  cotizacion: "cotizacion.html",
  planes:    "planes.html",
  datos:     "datos.html",
  pago:      "pago.html",
  exito:     "exito.html",
  error:     "error.html",
};

/** Navega a una ruta guardando el estado antes. */
export function ir(ruta) {
  guardarEstado();
  window.location.href = ruta;
}

/**
 * Protege la página actual según el paso permitido.
 * Se llama al DOMContentLoaded de cada HTML, después de cargarEstado().
 * @param {number} pasoActual  número de paso de la página (1..4, 5, 6)
 */
export function protegerRuta(pasoActual) {
  const p = solicitud.paso;
  // Si el paso del estado no coincide con el de la página y el paso
  // del estado es "anterior", redirigimos al que corresponde.
  if (pasoActual === 1 && p >= 2) return; // se permite volver a editar
  if (pasoActual === 2 && !equipoValido()) return ir(RUTAS.cotizacion);
  if (pasoActual === 3 && !equipoValido()) return ir(RUTAS.cotizacion);
  if (pasoActual === 4 && !titularValido()) return ir(RUTAS.datos);
  if (pasoActual === 5 && !solicitud.poliza) return ir(RUTAS.inicio);
  if (pasoActual === 6 && solicitud.poliza) return ir(RUTAS.exito);
}

/** Helpers locales de validez de paso (no dependen de validaciones.js
 *  para evitar ciclos; son chequeos de "estado mínimo"). */
function equipoValido() {
  const { marca, modelo, valor, antiguedad } = solicitud.equipo;
  return !!marca && modelo.length >= 2 && valor >= 100000 && valor <= 2500000 && !!antiguedad;
}
function titularValido() {
  const t = solicitud.titular;
  return (
    t.nombre.length >= 2 && t.apellido.length >= 2 &&
    /^\d{7,8}$/.test(t.dni) && !!t.nacimiento &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t.email) &&
    /^\d{10}$/.test(t.celular.replace(/[\s-]/g, "")) &&
    t.terminos === true
  );
}