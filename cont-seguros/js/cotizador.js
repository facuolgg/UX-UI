/* ============================================================
   Cálculo de cuota — fórmula del PDF.
   cuota = round(valor * tasaAnual / 12 * factorAntiguedad)
   ============================================================ */

export function calcularCuota(valor, tasaAnual, antiguedad) {
  const factor = factorAntiguedad(antiguedad);
  return Math.round((Number(valor) * Number(tasaAnual) / 12) * factor);
}

export function factorAntiguedad(antiguedad) {
  switch (antiguedad) {
    case "menos1":  return 1.0;   // menos de 1 año
    case "1a2":     return 1.1;   // 1 a 2 años
    case "mas2":    return 1.25;  // más de 2 años
    default:        return 1.0;
  }
}

/* ---- Test manual en consola (ejecutar una vez al cargar) ---- */
export function testCotizador() {
  const casos = [
    [600000, 0.04, "menos1", 2000],
    [600000, 0.06, "menos1", 3000],
    [600000, 0.09, "menos1", 4500],
    [600000, 0.04, "1a2",   2200],
    [600000, 0.06, "1a2",   3300],
    [600000, 0.09, "1a2",   4950],
    [1200000, 0.04, "mas2", 5000],
    [1200000, 0.06, "mas2", 7500],
    [1200000, 0.09, "mas2", 11250],
  ];
  let ok = true;
  for (const [v, t, a, esp] of casos) {
    const got = calcularCuota(v, t, a);
    if (got !== esp) {
      ok = false;
      console.error(`✗ valor=${v} tasa=${t} ant=${a} → ${got} (esperado ${esp})`);
    }
  }
  console.log(ok ? "✓ cotizador: 9/9 casos OK" : "✗ cotizador: hay fallos");
  return ok;
}