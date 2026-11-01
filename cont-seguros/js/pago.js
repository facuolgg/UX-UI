/* ============================================================
   Pago simulado + generación de póliza.
   NUNCA usar tarjetas reales.
   ============================================================ */

/**
 * @param {string} numero  número de tarjeta (con o sin espacios)
 * @returns {Promise<{ok: boolean, motivo?: string}>}
 */
export function simularPago(numero) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const limpio = String(numero).replace(/\s/g, "");
      resolve(
        limpio === "4000000000000002"
          ? { ok: false, motivo: "Tarjeta rechazada" }
          : { ok: true }
      );
    }, 1500);
  });
}

let contadorPoliza = 1;

/** Genera POL-AAAA-NNNNNN. Contador persistido en sessionStorage. */
export function generarPoliza() {
  const KEY = "cubri:contador-poliza";
  let n = Number(sessionStorage.getItem(KEY));
  if (!Number.isFinite(n) || n <= 0) n = 1;
  sessionStorage.setItem(KEY, String(n + 1));
  const anio = new Date().getFullYear();
  return `POL-${anio}-${String(n).padStart(6, "0")}`;
}