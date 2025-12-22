import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Sparkles } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center container-padding">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-primary" />
          </div>
        </div>
        <h1 className="mb-4 text-6xl font-heading font-bold text-foreground">404</h1>
        <p className="mb-8 text-xl text-muted-foreground">
          Oops! This page doesn't exist.
        </p>
        <Button variant="hero" size="lg" asChild>
          <a href="/">
            <ArrowLeft className="w-4 h-4" />
            Return to Home
          </a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
