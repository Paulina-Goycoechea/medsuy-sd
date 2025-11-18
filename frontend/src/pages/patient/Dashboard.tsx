const PatientDashboard = () => {
  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-8">Patient Dashboard</h1>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-card p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-2">Upcoming Appointments</h3>
          <p className="text-3xl font-bold text-primary">2</p>
        </div>
        <div className="bg-card p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-2">Pending Studies</h3>
          <p className="text-3xl font-bold text-warning">1</p>
        </div>
        <div className="bg-card p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-2">Active Medications</h3>
          <p className="text-3xl font-bold text-success">4</p>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
