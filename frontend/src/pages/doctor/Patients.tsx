import { useState } from "react";
import { Search, Filter, FileText, Calendar, Phone, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StatusBadge } from "@/components/StatusBadge";

const mockPatients = [
  {
    id: 1,
    name: "John Anderson",
    age: 45,
    gender: "Male",
    bloodType: "A+",
    lastVisit: "2024-03-15",
    nextAppointment: "2024-03-25",
    status: "active" as const,
    phone: "+1 234 567 8901",
    email: "john.anderson@email.com",
    conditions: ["Hypertension", "Type 2 Diabetes"]
  },
  {
    id: 2,
    name: "Maria Garcia",
    age: 32,
    gender: "Female",
    bloodType: "O+",
    lastVisit: "2024-03-10",
    nextAppointment: "2024-04-05",
    status: "active" as const,
    phone: "+1 234 567 8902",
    email: "maria.garcia@email.com",
    conditions: ["Asthma"]
  },
  {
    id: 3,
    name: "Robert Smith",
    age: 58,
    gender: "Male",
    bloodType: "B+",
    lastVisit: "2024-02-20",
    nextAppointment: null,
    status: "inactive" as const,
    phone: "+1 234 567 8903",
    email: "robert.smith@email.com",
    conditions: ["Heart Disease", "High Cholesterol"]
  },
  {
    id: 4,
    name: "Emily Chen",
    age: 28,
    gender: "Female",
    bloodType: "AB+",
    lastVisit: "2024-03-12",
    nextAppointment: "2024-03-22",
    status: "active" as const,
    phone: "+1 234 567 8904",
    email: "emily.chen@email.com",
    conditions: []
  },
  {
    id: 5,
    name: "David Williams",
    age: 52,
    gender: "Male",
    bloodType: "O-",
    lastVisit: "2024-03-01",
    nextAppointment: "2024-03-30",
    status: "active" as const,
    phone: "+1 234 567 8905",
    email: "david.williams@email.com",
    conditions: ["Arthritis"]
  }
];

const Patients = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredPatients = mockPatients.filter(patient => {
    const matchesSearch = 
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || patient.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">My Patients</h1>
        <p className="text-muted-foreground">Manage and view patient information</p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search patients by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Patients</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Patients Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredPatients.map((patient) => (
          <Card key={patient.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <Avatar className="h-16 w-16 bg-primary/10">
                  <AvatarFallback className="bg-primary/10 text-primary text-lg">
                    {getInitials(patient.name)}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">{patient.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {patient.age} years • {patient.gender} • Blood Type: {patient.bloodType}
                      </p>
                    </div>
                    <StatusBadge status={patient.status} />
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="h-4 w-4" />
                      <span>{patient.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      <span>{patient.email}</span>
                    </div>
                  </div>

                  {patient.conditions.length > 0 && (
                    <div>
                      <p className="text-sm font-medium mb-1">Conditions:</p>
                      <div className="flex flex-wrap gap-2">
                        {patient.conditions.map((condition, index) => (
                          <span
                            key={index}
                            className="text-xs bg-muted px-2 py-1 rounded-md"
                          >
                            {condition}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4 pt-2 border-t">
                    <div>
                      <p className="text-xs text-muted-foreground">Last Visit</p>
                      <p className="text-sm font-medium">{patient.lastVisit}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Next Appointment</p>
                      <p className="text-sm font-medium">
                        {patient.nextAppointment || "Not scheduled"}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button size="sm" className="flex-1">
                      <FileText className="h-4 w-4 mr-1" />
                      View Records
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Calendar className="h-4 w-4 mr-1" />
                      Schedule
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPatients.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-muted-foreground">No patients found matching your search criteria</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Patients;
