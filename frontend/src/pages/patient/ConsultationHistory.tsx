import { Shield, Search, FileText, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const consultations = [
  {
    id: 1,
    date: "25 Sep 2023",
    title: "General Check-up with Dr. Evelyn Reed",
    specialty: "Cardiology",
    diagnosis: "General wellness check.",
    notes: "Patient is in good health, routine blood work ordered. Discussed lifestyle improvements and stress management techniques.",
    medications: "None.",
  },
  {
    id: 2,
    date: "12 Jun 2023",
    title: "Dermatology Follow-up with Dr. Samuel Jones",
    specialty: "Dermatology",
  },
  {
    id: 3,
    date: "03 Feb 2023",
    title: "Initial Cardiology Consultation with Dr. Anna Lee",
    specialty: "Cardiology",
  },
];

const ConsultationHistory = () => {
  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <aside className="w-64 border-r bg-card flex flex-col">
        <div className="p-6 border-b">
          <Link to="/" className="flex items-center gap-2 text-primary mb-4">
            <Shield className="h-7 w-7" />
            <span className="text-xl font-bold">MedSUY</span>
          </Link>
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="bg-info/10 text-info">MG</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-sm">Maria Garcia</p>
              <p className="text-xs text-muted-foreground">Patient</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <Link
            to="/patient/dashboard"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted"
          >
            Dashboard
          </Link>
          <Link
            to="/patient/appointments"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted"
          >
            Appointments
          </Link>
          <Link
            to="/patient/consultation-history"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium bg-primary/10 text-primary"
          >
            Consultation History
          </Link>
          <Link
            to="/patient/profile"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted"
          >
            My Profile
          </Link>
          <Link
            to="/patient/settings"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted"
          >
            Settings
          </Link>
        </nav>

        <div className="p-4 border-t space-y-2">
          <Button variant="default" className="w-full" asChild>
            <Link to="/patient/book-appointment">Book Appointment</Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start text-sm">Help</Button>
          <Button variant="ghost" className="w-full justify-start text-sm" asChild>
            <Link to="/">Logout</Link>
          </Button>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <div className="container mx-auto px-8 py-8 max-w-5xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">Your Consultation History</h1>
              <p className="text-muted-foreground">Review your past appointments and diagnoses.</p>
            </div>
            <Button variant="outline">
              <FileText className="mr-2 h-4 w-4" />
              Export History
            </Button>
          </div>

          <div className="mb-6 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by doctor, specialty, or diagnosis..."
                className="pl-9"
              />
            </div>

            <div className="flex gap-3">
              <Select>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Date Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="month">Last Month</SelectItem>
                  <SelectItem value="year">Last Year</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Specialty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Specialties</SelectItem>
                  <SelectItem value="cardiology">Cardiology</SelectItem>
                  <SelectItem value="dermatology">Dermatology</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Doctor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Doctors</SelectItem>
                  <SelectItem value="reed">Dr. Evelyn Reed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            {consultations.map((consultation) => (
              <div key={consultation.id} className="bg-card border rounded-lg overflow-hidden">
                <button className="w-full p-6 flex items-center justify-between hover:bg-accent/50 transition-colors">
                  <div className="flex items-start gap-4 text-left">
                    <div className="font-semibold text-lg text-muted-foreground min-w-[120px]">
                      {consultation.date}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">{consultation.title}</h3>
                      <p className="text-sm text-muted-foreground">{consultation.specialty}</p>
                    </div>
                  </div>
                  <ChevronDown className="h-5 w-5 text-muted-foreground" />
                </button>

                {consultation.diagnosis && (
                  <div className="px-6 pb-6 space-y-4 border-t pt-4">
                    <div>
                      <p className="text-sm font-semibold text-primary mb-1">Diagnosis:</p>
                      <p className="text-sm">{consultation.diagnosis}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-primary mb-1">Notes:</p>
                      <p className="text-sm">{consultation.notes}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-primary mb-1">Medications Prescribed:</p>
                      <p className="text-sm">{consultation.medications}</p>
                    </div>
                    <div className="flex gap-3 pt-2">
                      <Button variant="outline" size="sm">
                        <FileText className="mr-2 h-4 w-4" />
                        Lab Results (PDF)
                      </Button>
                      <Button variant="outline" size="sm">
                        <FileText className="mr-2 h-4 w-4" />
                        Visit Summary (PDF)
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ConsultationHistory;
