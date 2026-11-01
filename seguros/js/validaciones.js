/**
 * Funciones puras de validación.
 * Reciben un valor y devuelven un string con el mensaje de error o null si es válido.
 */

export function validarMarca(valor) {
  if (!valor || !String(valor).trim()) {
    return 'Elegí una marca';
  }
  return null;
}

export function validarModelo(valor) {
  const v = String(valor || '').trim();
  if (v.length < 2 || v.length > 40) {
    return 'Ingresá el modelo del equipo';
  }
  return null;
}

export function limpiarNumero(valor) {
  if (typeof valor === 'number') return valor;
  const soloDigitos = String(valor || '').replace(/\D/g, '');
  return soloDigitos ? Number(soloDigitos) : 0;
}

export function validarValorEquipo(valor) {
  const num = typeof valor === 'number' ? valor : limpiarNumero(valor);
  if (!num || num < 100000 || num > 2500000) {
    return 'El valor debe estar entre $100.000 y $2.500.000';
  }
  return null;
}

export function validarAntiguedad(valor) {
  if (!valor || !String(valor).trim()) {
    return 'Indicá la antigüedad';
  }
  return null;
}

export function validarNombre(valor) {
  const v = String(valor || '').trim();
  if (v.length < 2) {
    return 'Ingresá tu nombre';
  }
  return null;
}

export function validarApellido(valor) {
  const v = String(valor || '').trim();
  if (v.length < 2) {
    return 'Ingresá tu apellido';
  }
  return null;
}

export function validarDNI(valor) {
  const v = String(valor || '').trim();
  if (!/^\d{7,8}$/.test(v)) {
    return 'El DNI debe tener 7 u 8 números';
  }
  return null;
}

export function validarFechaNacimiento(valor) {
  if (!valor) {
    return 'Tenés que ser mayor de edad';
  }
  const fechaNac = new Date(valor);
  if (isNaN(fechaNac.getTime())) {
    return 'Tenés que ser mayor de edad';
  }

  const hoy = new Date();
  let edad = hoy.getFullYear() - fechaNac.getFullYear();
  const mesDiff = hoy.getMonth() - fechaNac.getMonth();
  if (mesDiff < 0 || (mesDiff === 0 && hoy.getDate() < fechaNac.getDate())) {
    edad--;
  }

  if (edad < 18) {
    return 'Tenés que ser mayor de edad';
  }
  return null;
}

export function validarEmail(valor) {
  const v = String(valor || '').trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) {
    return 'Ingresá un email válido';
  }
  return null;
}

export function validarCelular(valor) {
  const limpio = String(valor || '').replace(/[\s-]/g, '');
  if (!/^\d{10}$/.test(limpio) || limpio.startsWith('0') || limpio.startsWith('15')) {
    return 'Ej.: 11 5555-1234';
  }
  return null;
}

export function validarTerminos(valor) {
  if (!valor) {
    return 'Tenés que aceptar los términos';
  }
  return null;
}

export function validarTarjeta(valor) {
  const limpio = String(valor || '').replace(/\s/g, '');
  if (!/^\d{16}$/.test(limpio)) {
    return 'Número de tarjeta inválido';
  }
  return null;
}

export function validarVencimiento(valor) {
  const v = String(valor || '').trim();
  const match = v.match(/^(\d{2})\/(\d{2})$/);
  if (!match) {
    return 'Vencimiento inválido';
  }

  const mes = parseInt(match[1], 10);
  const anio = parseInt('20' + match[2], 10);

  if (mes < 1 || mes > 12) {
    return 'Vencimiento inválido';
  }

  const hoy = new Date();
  const anioActual = hoy.getFullYear();
  const mesActual = hoy.getMonth() + 1; // 1-12

  if (anio < anioActual || (anio === anioActual && mes < mesActual)) {
    return 'Vencimiento inválido';
  }

  return null;
}

export function validarCVV(valor) {
  const v = String(valor || '').trim();
  if (!/^\d{3}$/.test(v)) {
    return 'CVV inválido';
  }
  return null;
}

export function validarTitular(valor) {
  const v = String(valor || '').trim();
  if (!v) {
    return 'Ingresá el nombre del titular';
  }
  return null;
}
