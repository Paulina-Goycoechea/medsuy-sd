import { useState } from "react";
import { Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { StatusBadge } from "@/components/StatusBadge";

const mockAppointments = [
  {
    id: 1,
    doctor: "Dr. Evelyn Reed",
    date: "Tuesday, October 26, 2024 at 10:30 AM",
    specialty: "Cardiology",
    status: "confirmed" as const,
  },
  {
    id: 2,
    doctor: "Dr. Marcus Chen",
    date: "Friday, November 5, 2024 at 2:00 PM",
    specialty: "Dermatology",
    status: "confirmed" as const,
  },
];

const MyAppointments = () => {
  const [activeTab, setActiveTab] = useState("upcoming");

  return (
    <div className="container mx-auto px-6 py-8 max-w-6xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">My Appointments</h1>
          <p className="text-muted-foreground">View and manage your upcoming and past appointments.</p>
        </div>
        <Button size="lg">
          <Plus className="mr-2 h-5 w-5" />
          Book New Appointment
        </Button>
      </div>

      <div className="bg-card border rounded-lg p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
          </TabsList>

          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by doctor's name or specialty..."
              className="pl-9"
            />
          </div>

          <TabsContent value="upcoming" className="space-y-4">
            {mockAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="flex items-center justify-between p-6 border rounded-lg hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <Avatar className="h-14 w-14">
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {appointment.doctor.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-lg">{appointment.doctor}</h3>
                    <p className="text-sm text-muted-foreground">{appointment.date}</p>
                    <p className="text-sm text-muted-foreground">{appointment.specialty}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <StatusBadge status={appointment.status} />
                  <Button variant="outline" size="sm">View Details</Button>
                  <Button variant="destructive" size="sm">Cancel</Button>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="past">
            <div className="text-center py-12 text-muted-foreground">
              <p>No past appointments found.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MyAppointments;
