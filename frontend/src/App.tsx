import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import PatientLayout from "./layouts/PatientLayout";
import DoctorLayout from "./layouts/DoctorLayout";
import AdminLayout from "./layouts/AdminLayout";
import PatientDashboard from "./pages/patient/Dashboard";
import BookAppointment from "./pages/patient/BookAppointment";
import MyAppointments from "./pages/patient/MyAppointments";
import ConsultationHistory from "./pages/patient/ConsultationHistory";
import MedicalStudies from "./pages/patient/MedicalStudies";
import Medications from "./pages/patient/Medications";
import PatientMessages from "./pages/patient/Messages";
import Billing from "./pages/patient/Billing";
import DoctorDashboard from "./pages/doctor/Dashboard";
import Patients from "./pages/doctor/Patients";
import DoctorMessages from "./pages/doctor/Messages";
import Settings from "./pages/doctor/Settings";
import DoctorAvailability from "./pages/admin/DoctorAvailability";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          
          <Route path="/patient" element={<PatientLayout />}>
            <Route path="dashboard" element={<PatientDashboard />} />
            <Route path="book-appointment" element={<BookAppointment />} />
            <Route path="appointments" element={<MyAppointments />} />
            <Route path="consultation-history" element={<ConsultationHistory />} />
            <Route path="medical-studies" element={<MedicalStudies />} />
            <Route path="medications" element={<Medications />} />
            <Route path="messages" element={<PatientMessages />} />
            <Route path="billing" element={<Billing />} />
          </Route>

          <Route path="/doctor" element={<DoctorLayout />}>
            <Route path="dashboard" element={<DoctorDashboard />} />
            <Route path="patients" element={<Patients />} />
            <Route path="messages" element={<DoctorMessages />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          <Route path="/admin" element={<AdminLayout />}>
            <Route path="doctor-availability" element={<DoctorAvailability />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
