/* ============================================================
   Estado único de la solicitud + persistencia entre páginas.
   ============================================================ */

const STORAGE_KEY = "cubri:solicitud";

export const solicitud = {
  paso: 0, // 0 = inicio, 1..4 = checkout, 5 = éxito, 6 = error
  equipo: { marca: "", modelo: "", valor: 0, antiguedad: "" },
  plan: "plus",
  titular: {
    nombre: "",
    apellido: "",
    dni: "",
    nacimiento: "",
    email: "",
    celular: "",
    terminos: false,
  },
  pago: { metodo: "credito", tarjeta: "", vencimiento: "", cvv: "", titular: "" },
  poliza: null,
};

/** Serializa el estado a sessionStorage. */
export function guardarEstado() {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(solicitud));
  } catch (e) {
    console.warn("[estado] No se pudo guardar:", e);
  }
}

/** Hidrata `solicitud` desde sessionStorage (deep-merge defensivo). */
export function cargarEstado() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const data = JSON.parse(raw);
    Object.assign(solicitud, data);
    solicitud.equipo = { ...solicitud.equipo, ...(data.equipo || {}) };
    solicitud.titular = { ...solicitud.titular, ...(data.titular || {}) };
    solicitud.pago = { ...solicitud.pago, ...(data.pago || {}) };
  } catch (e) {
    console.warn("[estado] No se pudo cargar:", e);
  }
}

/** Cambia de paso y persiste. El render lo dispara cada página. */
export function irAPaso(n) {
  solicitud.paso = n;
  guardarEstado();
}

/** Resetea el flujo (usado en "Volver al inicio"). */
export function reiniciarSolicitud() {
  sessionStorage.removeItem(STORAGE_KEY);
  solicitud.paso = 0;
  solicitud.equipo = { marca: "", modelo: "", valor: 0, antiguedad: "" };
  solicitud.plan = "plus";
  solicitud.titular = {
    nombre: "", apellido: "", dni: "", nacimiento: "",
    email: "", celular: "", terminos: false,
  };
  solicitud.pago = { metodo: "credito", tarjeta: "", vencimiento: "", cvv: "", titular: "" };
  solicitud.poliza = null;
  guardarEstado();
}