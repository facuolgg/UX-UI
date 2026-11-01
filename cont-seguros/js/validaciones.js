/* ============================================================
   Validaciones puras: reciben valor, devuelven string | null.
   Mensajes EXACTOS del PDF.
   ============================================================ */

export function validarMarca(v) {
  return v ? null : "Elegí una marca";
}

export function validarModelo(v) {
  if (!v || v.trim().length < 2 || v.trim().length > 40)
    return "Ingresá el modelo del equipo";
  return null;
}

export function validarValor(v) {
  const n = Number(String(v).replace(/\D/g, ""));
  if (!n || n < 100000 || n > 2500000)
    return "El valor debe estar entre $100.000 y $2.500.000";
  return null;
}

export function validarAntiguedad(v) {
  return v ? null : "Indicá la antigüedad";
}

export function validarNombre(v) {
  if (!v || v.trim().length < 2) return "Ingresá tu nombre";
  return null;
}

export function validarApellido(v) {
  if (!v || v.trim().length < 2) return "Ingresá tu apellido";
  return null;
}

export function validarDNI(v) {
  if (!/^\d{7,8}$/.test(String(v).trim()))
    return "El DNI debe tener 7 u 8 números";
  return null;
}

export function validarNacimiento(v) {
  if (!v) return "Ingresá tu fecha de nacimiento";
  const d = new Date(v);
  if (isNaN(d.getTime())) return "Ingresá tu fecha de nacimiento";
  const hoy = new Date();
  let edad = hoy.getFullYear() - d.getFullYear();
  const m = hoy.getMonth() - d.getMonth();
  if (m < 0 || (m === 0 && hoy.getDate() < d.getDate())) edad--;
  return edad >= 18 ? null : "Tenés que ser mayor de edad";
}

export function validarEmail(v) {
  if (!v || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v))
    return "Ingresá un email válido";
  return null;
}

export function validarCelular(v) {
  const limpio = String(v || "").replace(/[\s-]/g, "");
  return /^\d{10}$/.test(limpio) ? null : "Ej.: 11 5555-1234";
}

export function validarTerminos(v) {
  return v === true ? null : "Tenés que aceptar los términos";
}

export function validarTarjeta(v) {
  const limpio = String(v || "").replace(/\s/g, "");
  return /^\d{16}$/.test(limpio) ? null : "Número de tarjeta inválido";
}

export function validarVencimiento(v) {
  if (!/^\d{2}\/\d{2}$/.test(String(v || "").trim()))
    return "Vencimiento inválido";
  const [mm, aa] = v.split("/").map(Number);
  if (mm < 1 || mm > 12) return "Vencimiento inválido";
  const hoy = new Date();
  const exp = new Date(2000 + aa, mm, 1); // primer día del mes siguiente
  return exp > hoy ? null : "Vencimiento inválido";
}

export function validarCVV(v) {
  return /^\d{3}$/.test(String(v || "")) ? null : "CVV inválido";
}

export function validarTitular(v) {
  return v && v.trim().length >= 2 ? null : "Ingresá el nombre del titular";
}