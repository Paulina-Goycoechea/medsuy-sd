import { Search, Pill } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/StatusBadge";

const medications = [
  {
    id: 1,
    name: "Lisinopril",
    dosage: "10mg, once daily",
    location: "Pickup at Main Street Pharmacy",
    status: "ready" as const,
  },
  {
    id: 2,
    name: "Atorvastatin",
    dosage: "20mg, once daily",
    location: "Pickup at Downtown Health Clinic",
    status: "processing" as const,
  },
  {
    id: 3,
    name: "Metformin",
    dosage: "500mg, twice daily",
    location: "Picked up on 12/05/2024",
    status: "picked-up" as const,
  },
  {
    id: 4,
    name: "Amlodipine",
    dosage: "5mg, once daily",
    location: "Pickup at Main Street Pharmacy",
    status: "ready" as const,
  },
];

const Medications = () => {
  return (
    <div className="container mx-auto px-6 py-8 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-5xl font-bold mb-3">My Medications</h1>
        <p className="text-muted-foreground text-lg">
          View information about your prescribed medications and their availability for pickup.
        </p>
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Find a specific medication" className="pl-9" />
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm">All</Button>
            <Button variant="outline" size="sm">Ready for Pickup</Button>
            <Button variant="outline" size="sm">Processing</Button>
            <Button variant="outline" size="sm">Picked Up</Button>
          </div>
        </div>

        <div className="space-y-3">
          {medications.map((med) => (
            <div
              key={med.id}
              className="bg-card border rounded-lg p-6 flex items-center justify-between hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Pill className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">{med.name}</h3>
                  <p className="text-sm text-muted-foreground mb-1">{med.dosage}</p>
                  <p className="text-sm text-muted-foreground">{med.location}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <StatusBadge status={med.status} />
                <Button variant="outline" size="sm">View Details</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Medications;
