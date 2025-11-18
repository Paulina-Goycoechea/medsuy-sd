import { Search, Download, FileText, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatusBadge } from "@/components/StatusBadge";

const studies = [
  {
    id: 1,
    name: "Complete Blood Count",
    status: "results-available" as const,
    dateOrdered: "Oct 15, 2023",
    doctor: "Dr. Evelyn Reed",
    action: "download",
  },
  {
    id: 2,
    name: "MRI of the Knee",
    status: "completed" as const,
    dateOrdered: "Oct 12, 2023",
    doctor: "Dr. Ben Carter",
    action: "view",
  },
  {
    id: 3,
    name: "Annual Physical Exam",
    status: "pending" as const,
    dateOrdered: "Oct 10, 2023",
    doctor: "Dr. Evelyn Reed",
    action: "schedule",
  },
];

const MedicalStudies = () => {
  return (
    <div className="container mx-auto px-6 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-5xl font-bold mb-3">My Medical Studies</h1>
        <p className="text-muted-foreground text-lg">
          Track the status of your exams, analyses, and studies ordered by your doctor.
        </p>
      </div>

      <div className="bg-card border rounded-lg p-6">
        <Tabs defaultValue="all">
          <div className="flex items-center justify-between mb-6">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="results">Results Available</TabsTrigger>
            </TabsList>

            <div className="relative w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search studies..." className="pl-9" />
            </div>
          </div>

          <TabsContent value="all">
            <div className="rounded-lg border">
              <table className="w-full">
                <thead className="border-b bg-muted/50">
                  <tr>
                    <th className="text-left p-4 font-semibold">Study Name</th>
                    <th className="text-left p-4 font-semibold">Status</th>
                    <th className="text-left p-4 font-semibold">Date Ordered</th>
                    <th className="text-left p-4 font-semibold">Referring Doctor</th>
                    <th className="text-right p-4 font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {studies.map((study) => (
                    <tr key={study.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                      <td className="p-4 font-medium">{study.name}</td>
                      <td className="p-4">
                        <StatusBadge status={study.status} />
                      </td>
                      <td className="p-4 text-muted-foreground">{study.dateOrdered}</td>
                      <td className="p-4 text-muted-foreground">{study.doctor}</td>
                      <td className="p-4 text-right">
                        {study.action === "download" && (
                          <Button size="sm">
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </Button>
                        )}
                        {study.action === "view" && (
                          <Button size="sm" variant="outline">
                            <FileText className="mr-2 h-4 w-4" />
                            View Details
                          </Button>
                        )}
                        {study.action === "schedule" && (
                          <Button size="sm" variant="default">
                            <Calendar className="mr-2 h-4 w-4" />
                            Schedule
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          <TabsContent value="pending">
            <div className="text-center py-12 text-muted-foreground">
              <p>No pending studies.</p>
            </div>
          </TabsContent>

          <TabsContent value="completed">
            <div className="text-center py-12 text-muted-foreground">
              <p>No completed studies without results.</p>
            </div>
          </TabsContent>

          <TabsContent value="results">
            <div className="text-center py-12 text-muted-foreground">
              <p>No results available.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MedicalStudies;
