import { Search, Plus, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { StatusBadge } from "@/components/StatusBadge";

const availabilitySlots = [
  {
    id: 1,
    doctor: "Dr. Evelyn Reed",
    specialty: "Cardiology",
    date: "2024-10-28",
    startTime: "09:00 AM",
    endTime: "10:00 AM",
    status: "available" as const,
  },
  {
    id: 2,
    doctor: "Dr. Marcus Chen",
    specialty: "Neurology",
    date: "2024-10-28",
    startTime: "11:00 AM",
    endTime: "12:00 PM",
    status: "booked" as const,
  },
  {
    id: 3,
    doctor: "Dr. Anya Sharma",
    specialty: "Pediatrics",
    date: "2024-10-29",
    startTime: "02:00 PM",
    endTime: "03:00 PM",
    status: "blocked" as const,
  },
];

const DoctorAvailability = () => {
  return (
    <div className="h-full">
      <div className="border-b bg-card px-8 py-6">
        <h1 className="text-3xl font-bold mb-1">Manage Doctor Availability</h1>
        <p className="text-muted-foreground">Register, update, and manage consultation slots for doctors.</p>
      </div>

      <div className="p-8">
        <div className="bg-card border rounded-lg p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search Doctor..." className="pl-9" />
            </div>

            <Select>
              <SelectTrigger className="w-56">
                <SelectValue placeholder="Filter by Specialty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Specialties</SelectItem>
                <SelectItem value="cardiology">Cardiology</SelectItem>
                <SelectItem value="neurology">Neurology</SelectItem>
                <SelectItem value="pediatrics">Pediatrics</SelectItem>
              </SelectContent>
            </Select>

            <Input type="date" className="w-48" />

            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add New Availability Slot
            </Button>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <Button variant="outline" size="sm">List View</Button>
            <Button variant="ghost" size="sm">Calendar View</Button>
          </div>

          <div className="rounded-lg border">
            <table className="w-full">
              <thead className="border-b bg-muted/50">
                <tr>
                  <th className="p-4 text-left">
                    <Checkbox />
                  </th>
                  <th className="p-4 text-left font-semibold">DOCTOR NAME</th>
                  <th className="p-4 text-left font-semibold">SPECIALTY</th>
                  <th className="p-4 text-left font-semibold">DATE</th>
                  <th className="p-4 text-left font-semibold">START TIME</th>
                  <th className="p-4 text-left font-semibold">END TIME</th>
                  <th className="p-4 text-left font-semibold">STATUS</th>
                  <th className="p-4 text-left font-semibold">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {availabilitySlots.map((slot) => (
                  <tr key={slot.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="p-4">
                      <Checkbox />
                    </td>
                    <td className="p-4 font-medium">{slot.doctor}</td>
                    <td className="p-4 text-muted-foreground">{slot.specialty}</td>
                    <td className="p-4 text-muted-foreground">{slot.date}</td>
                    <td className="p-4 text-muted-foreground">{slot.startTime}</td>
                    <td className="p-4 text-muted-foreground">{slot.endTime}</td>
                    <td className="p-4">
                      <StatusBadge status={slot.status} />
                    </td>
                    <td className="p-4">
                      <Button variant="link" size="sm" className="text-primary">Edit</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorAvailability;
