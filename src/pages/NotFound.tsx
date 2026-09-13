import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import MagneticButton from "@/components/ui-kit/MagneticButton";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="grain tech-grid flex min-h-screen items-center justify-center bg-background px-6">
      <div className="w-full max-w-2xl">
        <div className="flex items-center gap-4">
          <span className="label-mono">ERROR / 404</span>
          <span className="h-px flex-1 bg-border" />
          <span className="label-mono">● SIGNAL LOST</span>
        </div>

        <h1 className="display-xl text-glow my-8 text-[26vw] text-foreground sm:text-[12rem]">404</h1>

        <p className="text-muted-foreground">
          There&apos;s nothing at{" "}
          <span className="break-all font-mono text-foreground">{location.pathname}</span>
        </p>

        <div className="mt-8">
          <MagneticButton href="/" variant="solid">
            <ArrowLeft className="h-3.5 w-3.5" /> BACK TO HOME
          </MagneticButton>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
