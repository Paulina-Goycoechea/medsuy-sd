import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import doctorHero from "@/assets/doctor-hero.jpg";

const Login = () => {
  const navigate = useNavigate();
  const [cedula, setCedula] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!cedula || !password) {
      toast({
        title: "Error",
        description: "Por favor complete todos los campos",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // Simular autenticación
    setTimeout(() => {
      // Lógica simple: si la cédula empieza con "D", es doctor/staff
      if (cedula.toUpperCase().startsWith("D")) {
        navigate("/doctor/dashboard");
      } else {
        navigate("/patient/dashboard");
      }
      
      toast({
        title: "Inicio de sesión exitoso",
        description: "Bienvenido a MedSUY"
      });
      
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="p-6">
        <div className="flex items-center gap-2 text-primary">
          <Shield className="h-8 w-8" />
          <span className="text-2xl font-bold">MedSUY</span>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-6xl grid md:grid-cols-2 gap-12 items-center">
          <div className="hidden md:block">
            <img
              src={doctorHero}
              alt="Medical professional with tablet"
              className="rounded-2xl shadow-2xl w-full h-auto object-cover"
            />
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl font-bold text-foreground">
                Welcome to<br />MedSUY
              </h1>
              <p className="text-lg text-muted-foreground max-w-md">
                Your Health, Connected. Securely access your medical information or manage your patient care.
              </p>
            </div>

            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle>Iniciar Sesión</CardTitle>
                <CardDescription>
                  Ingrese sus credenciales para acceder al sistema
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="cedula">Cédula</Label>
                    <Input
                      id="cedula"
                      type="text"
                      placeholder="Ingrese su cédula"
                      value={cedula}
                      onChange={(e) => setCedula(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Contraseña</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Ingrese su contraseña"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full" 
                    size="lg"
                    disabled={isLoading}
                  >
                    {isLoading ? "Ingresando..." : "Iniciar Sesión"}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center mt-4">
                    Tip: Use cédula que empiece con "D" para acceso como Doctor/Staff
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <footer className="py-8 border-t">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-8 mb-4">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Help & Support
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </a>
          </div>
          <p className="text-center text-muted-foreground text-sm">
            © 2024 MedSUY. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Login;
