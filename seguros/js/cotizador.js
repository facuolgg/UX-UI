export const FACTORES_ANTIGUEDAD = {
  menos_1: 1.00,
  '1_a_2': 1.10,
  mas_2: 1.25
};

export const formateadorMoneda = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  maximumFractionDigits: 0
});

export function formatearMoneda(valor) {
  return formateadorMoneda.format(valor);
}

export function obtenerFactorAntiguedad(antiguedad) {
  if (antiguedad === 'menos_1' || antiguedad === 'menos de 1 año' || antiguedad === 'menos-1') {
    return 1.00;
  }
  if (antiguedad === '1_a_2' || antiguedad === '1 a 2 años' || antiguedad === '1-2') {
    return 1.10;
  }
  if (antiguedad === 'mas_2' || antiguedad === 'más de 2 años' || antiguedad === 'mas de 2 años' || antiguedad === 'mas-2') {
    return 1.25;
  }
  return 1.00;
}

/**
 * cuota = Math.round(valor * tasaAnual / 12 * factorAntiguedad)
 */
export function calcularCuota(valor, tasaAnual, antiguedad) {
  const factor = obtenerFactorAntiguedad(antiguedad);
  const numValor = typeof valor === 'number' ? valor : Number(String(valor).replace(/\D/g, '')) || 0;
  return Math.round((numValor * tasaAnual / 12) * factor);
}
