import { useEffect, useState } from "react";
import { getPatientDashboard } from "../../api/patientService";

const PatientDashboard = () => {
  const patientId = 3; // TODO: reemplazar luego por ID real del login

  const [data, setData] = useState<{
    upcoming_appointments: number;
    pending_studies: number;
    active_medications: number;
  } | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const res = await getPatientDashboard(patientId);
        setData(res);
      } catch (err) {
        console.error(err);
        setError("Error al cargar el dashboard del paciente");
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-8">
        <p className="text-lg">Cargando información...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="container mx-auto px-6 py-8">
        <p className="text-lg text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-8">Patient Dashboard</h1>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-card p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-2">Upcoming Appointments</h3>
          <p className="text-3xl font-bold text-primary">
            {data.upcoming_appointments}
          </p>
        </div>

        <div className="bg-card p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-2">Pending Studies</h3>
          <p className="text-3xl font-bold text-warning">
            {data.pending_studies}
          </p>
        </div>

        <div className="bg-card p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-2">Active Medications</h3>
          <p className="text-3xl font-bold text-success">
            {data.active_medications}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
