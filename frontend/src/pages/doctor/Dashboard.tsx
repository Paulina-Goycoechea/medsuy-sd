import { Search, Plus, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StatusBadge } from "@/components/StatusBadge";

const todaysSchedule = [
  {
    id: 1,
    time: "09:00 AM",
    patient: "Alex Johnson",
    type: "Follow-up Consultation",
    status: "confirmed" as const,
  },
  {
    id: 2,
    time: "10:30 AM",
    patient: "Maria Garcia",
    type: "New Patient",
    status: "pending" as const,
  },
  {
    id: 3,
    time: "08:00 AM",
    patient: "John Smith",
    type: "Annual Check-up",
    status: "completed" as const,
  },
];

const DoctorDashboard = () => {
  return (
    <div className="h-full">
      <div className="border-b bg-card px-8 py-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-1">Welcome, Dr. Carter!</h1>
          <p className="text-muted-foreground">Monday, August 26, 2024</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search for a patient..." className="pl-9" />
          </div>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-destructive rounded-full"></span>
          </Button>
        </div>
      </div>

      <div className="p-8">
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-card border rounded-lg p-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Today's Appointments</h3>
            <p className="text-4xl font-bold">12</p>
          </div>
          <div className="bg-card border rounded-lg p-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Pending Confirmations</h3>
            <p className="text-4xl font-bold">3</p>
          </div>
          <div className="bg-card border rounded-lg p-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Unread Messages</h3>
            <p className="text-4xl font-bold">5</p>
          </div>
        </div>

        <div className="bg-card border rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Today's Schedule</h2>
            <div className="flex items-center gap-3">
              <Button variant="outline">View Full Calendar</Button>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Appointment
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            {todaysSchedule.map((appointment) => (
              <div
                key={appointment.id}
                className="flex items-center justify-between p-5 border rounded-lg hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="text-center min-w-[80px]">
                    <p className="text-xl font-semibold">{appointment.time.split(" ")[0]}</p>
                    <p className="text-xs text-muted-foreground">{appointment.time.split(" ")[1]}</p>
                  </div>
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {appointment.patient.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{appointment.patient}</h3>
                    <p className="text-sm text-muted-foreground">{appointment.type}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <StatusBadge status={appointment.status} />
                  {appointment.status === "pending" && (
                    <>
                      <Button size="sm" variant="outline">Confirm</Button>
                      <Button size="sm" variant="destructive">Cancel</Button>
                    </>
                  )}
                  <Button size="sm" variant="outline">View Record</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
