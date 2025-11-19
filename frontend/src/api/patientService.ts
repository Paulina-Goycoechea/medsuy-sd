import { api } from "./http";

/* ----------------------------
   1) GET appointments disponibles
-----------------------------*/
export const getAvailableAppointments = async () => {
  const res = await api.get("/patient/appointments/available");
  return res.data;
};

/* ----------------------------
   2) POST reservar appointment
-----------------------------*/
export const reserveAppointment = async (
  idPatient: number,
  consultaId: number
) => {
  const res = await api.post(`/patient/${idPatient}/appointments/reserve`, {
    consulta_id: consultaId,
  });
  return res.data;
};

/* ----------------------------
   3) GET datos del paciente
-----------------------------*/
export const getPatientDashboard = async (idPatient: number) => {
  const res = await api.get(`/patient/${idPatient}/dashboard`);
  return res.data;
};

/* ----------------------------
   4) GET medicaciones del paciente
-----------------------------*/
export const getPatientMedications = async (idPatient: number) => {
  const res = await api.get(`/patient/${idPatient}/medications`);
  return res.data;
};

/* ----------------------------
   5) GET conversaciones del paciente
-----------------------------*/
export const getPatientConversations = async (idPatient: number) => {
  const res = await api.get(`/patient/${idPatient}/messages/conversations`);
  return res.data;
};

/* ----------------------------
   6) GET mensajes de una conversacion
-----------------------------*/
export const getConversationMessages = async (
  idPatient: number,
  conversationId: number
) => {
  const res = await api.get(`/patient/${idPatient}/messages/${conversationId}`);
  return res.data;
};

/* ----------------------------
   7) GET estudios del paciente
-----------------------------*/
export const getPatientStudies = async (idPatient: number) => {
  const res = await api.get(`/patient/${idPatient}/studies`);
  return res.data;
};
