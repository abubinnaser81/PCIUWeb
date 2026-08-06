import { useState, useEffect } from "react";
import { X, GraduationCap, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const AdmissionPopup = () => {
  const [isOpen, setIsOpen] = useState(true); // Show immediately on load

  // Auto-close after 10 seconds
  useEffect(() => {
    if (isOpen) {
      const closeTimer = setTimeout(() => {
        handleClose();
      }, 10000);

      return () => clearTimeout(closeTimer);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-20 right-6 z-50 animate-slide-in-right">
      <div className="relative w-[280px] bg-gradient-to-br from-primary via-primary to-secondary rounded-xl overflow-hidden shadow-2xl">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-highlight/20 rounded-full blur-xl" />
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-accent/20 rounded-full blur-xl" />
        
        {/* Animated sparkle */}
        <Sparkles className="absolute top-3 right-10 w-4 h-4 text-highlight animate-pulse" />
        
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 z-10 p-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          aria-label="Close popup"
        >
          <X className="w-3 h-3 text-white" />
        </button>

        {/* Content */}
        <div className="relative z-10 p-4 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 bg-highlight text-highlight-foreground px-3 py-1 rounded-full text-xs font-semibold mb-3">
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
            ADMISSION OPEN
          </div>

          {/* Icon */}
          <div className="w-10 h-10 mx-auto mb-2 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>

          <h3 className="text-base font-heading font-bold text-white mb-1">
            Fall 2025 Admission
          </h3>
          <p className="text-white/80 text-xs mb-3">
            Up to 100% Scholarship Available!
          </p>

          {/* CTA Button */}
          <Button
            size="sm"
            className="w-full bg-highlight hover:bg-highlight/90 text-highlight-foreground text-xs font-semibold group"
            onClick={handleClose}
          >
            Apply Now
            <ArrowRight className="ml-1.5 w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdmissionPopup;
