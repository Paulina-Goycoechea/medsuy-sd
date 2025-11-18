import { Link, Outlet, useLocation } from "react-router-dom";
import { LayoutDashboard, Calendar, Users, BarChart3, Settings, HelpCircle, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const AdminLayout = () => {
  const location = useLocation();

  const sidebarItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/admin/dashboard" },
    { icon: Calendar, label: "Appointments", path: "/admin/appointments" },
    { icon: Calendar, label: "Doctor Availability", path: "/admin/doctor-availability" },
    { icon: Users, label: "Patients", path: "/admin/patients" },
    { icon: BarChart3, label: "Reports", path: "/admin/reports" },
  ];

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <aside className="w-64 border-r bg-card flex flex-col">
        <div className="p-6 border-b">
          <div className="flex items-center gap-3 mb-4">
            <Avatar className="h-12 w-12 bg-warning/20">
              <AvatarFallback className="bg-warning/20 text-warning font-semibold">A</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm truncate">Admin</p>
              <p className="text-xs text-muted-foreground truncate">admin@medsuy.com</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm font-medium",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t space-y-2">
          <Button variant="ghost" size="sm" className="w-full justify-start">
            <Settings className="mr-3 h-4 w-4" />
            Settings
          </Button>
          <Button variant="ghost" size="sm" className="w-full justify-start">
            <HelpCircle className="mr-3 h-4 w-4" />
            Support
          </Button>
          <Button variant="default" size="sm" className="w-full justify-start" asChild>
            <Link to="/">
              <LogOut className="mr-3 h-4 w-4" />
              Log Out
            </Link>
          </Button>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
