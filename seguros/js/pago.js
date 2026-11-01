/**
 * Simulación de pago y generación de número de póliza
 */

export function simularPago(numero) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const limpio = String(numero || '').replace(/\s/g, '');
      if (limpio === '4000000000000002') {
        resolve({ ok: false, motivo: 'Tarjeta rechazada' });
      } else {
        resolve({ ok: true });
      }
    }, 1500);
  });
}

let contadorPoliza = Math.floor(Math.random() * 800000) + 100000;

export function generarPoliza() {
  contadorPoliza++;
  const anio = new Date().getFullYear();
  return `POL-${anio}-${String(contadorPoliza).padStart(6, '0')}`;
}
