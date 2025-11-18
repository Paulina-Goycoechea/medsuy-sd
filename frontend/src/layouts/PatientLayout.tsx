import { Link, Outlet, useLocation } from "react-router-dom";
import { Shield, Bell, User, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const PatientLayout = () => {
  const location = useLocation();

  const navItems = [
    { label: "Dashboard", path: "/patient/dashboard" },
    { label: "Appointments", path: "/patient/appointments" },
    { label: "Messages", path: "/patient/messages" },
    { label: "Medical Records", path: "/patient/consultation-history" },
    { label: "Billing", path: "/patient/billing" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-card">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-2 text-primary">
            <Shield className="h-6 w-6" />
            <span className="text-xl font-bold">MedSUY</span>
            <span className="text-sm text-muted-foreground font-normal">Dashboard</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  location.pathname === item.path
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Moon className="h-5 w-5" />
            </Button>
            <Avatar className="h-10 w-10 bg-primary/10">
              <AvatarFallback className="bg-primary/10 text-primary">
                <User className="h-5 w-5" />
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default PatientLayout;
