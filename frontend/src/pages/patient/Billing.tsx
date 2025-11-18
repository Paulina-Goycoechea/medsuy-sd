import { useState } from "react";
import { Search, Download, Filter, CreditCard, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StatusBadge } from "@/components/StatusBadge";

const mockInvoices = [
  {
    id: "INV-2024-001",
    date: "2024-03-15",
    service: "General Consultation",
    doctor: "Dr. Emily Carter",
    amount: 150.00,
    status: "paid" as const
  },
  {
    id: "INV-2024-002",
    date: "2024-03-10",
    service: "Blood Tests",
    doctor: "Laboratory Services",
    amount: 280.00,
    status: "paid" as const
  },
  {
    id: "INV-2024-003",
    date: "2024-03-05",
    service: "X-Ray Scan",
    doctor: "Radiology Department",
    amount: 320.00,
    status: "pending" as const
  },
  {
    id: "INV-2024-004",
    date: "2024-02-28",
    service: "Cardiology Consultation",
    doctor: "Dr. Michael Brown",
    amount: 200.00,
    status: "paid" as const
  },
  {
    id: "INV-2024-005",
    date: "2024-02-20",
    service: "Dermatology Treatment",
    doctor: "Dr. Sarah Johnson",
    amount: 175.00,
    status: "overdue" as const
  }
];

const Billing = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredInvoices = mockInvoices.filter(invoice => {
    const matchesSearch = 
      invoice.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.doctor.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || invoice.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const totalPaid = mockInvoices
    .filter(inv => inv.status === "paid")
    .reduce((sum, inv) => sum + inv.amount, 0);

  const totalPending = mockInvoices
    .filter(inv => inv.status === "pending")
    .reduce((sum, inv) => sum + inv.amount, 0);

  const totalOverdue = mockInvoices
    .filter(inv => inv.status === "overdue")
    .reduce((sum, inv) => sum + inv.amount, 0);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Billing & Payments</h1>
        <p className="text-muted-foreground">Manage your medical bills and payment history</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Paid</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">${totalPaid.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground mt-1">All time payments</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">${totalPending.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground mt-1">Awaiting payment</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">${totalOverdue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground mt-1">Requires attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search invoices..."
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
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Invoices Table */}
      <Card>
        <CardHeader>
          <CardTitle>Invoice History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Provider</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInvoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.id}</TableCell>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell>{invoice.service}</TableCell>
                  <TableCell>{invoice.doctor}</TableCell>
                  <TableCell className="font-semibold">${invoice.amount.toFixed(2)}</TableCell>
                  <TableCell>
                    <StatusBadge status={invoice.status} />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {invoice.status === "pending" && (
                        <Button size="sm" variant="default">
                          Pay Now
                        </Button>
                      )}
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredInvoices.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No invoices found matching your search criteria
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Billing;
