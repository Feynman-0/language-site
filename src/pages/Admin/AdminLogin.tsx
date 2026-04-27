import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "@/services/authService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Lock } from "lucide-react";
import PageTransition from "@/components/shared/PageTransition";

const AdminLogin = () => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    try {
      const success = await authService.login(password);
      if (success) {
        toast.success("Welcome back, Admin!");
        navigate("/admin");
      } else {
        toast.error("Incorrect password");
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex items-center justify-center bg-ivory px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-sm border border-border">
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="text-gold w-6 h-6" />
            </div>
            <h1 className="text-2xl font-display font-bold text-charcoal">Admin Login</h1>
            <p className="text-sm text-muted-foreground mt-2">Enter your password to access the dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            <Button type="submit" className="w-full bg-gold hover:bg-gold/90 text-primary-foreground font-semibold py-6 rounded-full">
              Login
            </Button>
          </form>

          <p className="text-center text-xs text-muted-foreground mt-6">
            Tip: Default password is <code className="bg-muted px-1 rounded">admin123</code>
          </p>
        </div>
      </div>
    </PageTransition>
  );
};

export default AdminLogin;
