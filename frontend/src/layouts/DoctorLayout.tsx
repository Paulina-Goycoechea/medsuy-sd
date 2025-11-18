import { Link, Outlet, useLocation } from "react-router-dom";
import { Shield, LayoutDashboard, Users, Mail, Settings, HelpCircle, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const DoctorLayout = () => {
  const location = useLocation();

  const sidebarItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/doctor/dashboard" },
    { icon: Users, label: "Patients", path: "/doctor/patients" },
    { icon: Mail, label: "Messages", path: "/doctor/messages" },
    { icon: Settings, label: "Settings", path: "/doctor/settings" },
  ];

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
              <AvatarImage src="" />
              <AvatarFallback className="bg-primary text-primary-foreground">EC</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm truncate">Dr. Emily Carter</p>
              <p className="text-xs text-muted-foreground truncate">General Physician</p>
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
          <Button variant="ghost" className="w-full justify-start" asChild>
            <Link to="/help">
              <HelpCircle className="mr-3 h-5 w-5" />
              Support
            </Link>
          </Button>
          <Button variant="default" className="w-full justify-start" asChild>
            <Link to="/">
              <LogOut className="mr-3 h-5 w-5" />
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

export default DoctorLayout;
