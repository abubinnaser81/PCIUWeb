import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import vcImage from "@/assets/vc-photo.jpg";

interface VCMessageProps {
  dynamicContent?: Record<string, any>;
}

const VCMessage = ({ dynamicContent }: VCMessageProps) => {
  const vcName = dynamicContent?.name || 'Prof. Dr. Mohammad Tayub Chowdhury';
  const vcTitle = dynamicContent?.title || 'Vice Chancellor';
  const vcMessage = dynamicContent?.message || "Port City International University located at Chattogram is a new generation private university committed to excellence in higher education and research. The vision of this university is to make it a global standard center of excellence through education, research and service. The society the way it is changing will have a profound impact on the university education. Transformative education to change the society as it demands is our mission.";

  return (
    <section className="py-16 md:py-20" style={{ background: 'linear-gradient(135deg, hsl(340 80% 95%), hsl(210 60% 92%), hsl(200 70% 90%))' }}>
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Left: VC Photo */}
          <div className="shrink-0 flex flex-col items-center">
            <div className="w-44 h-52 md:w-52 md:h-60 rounded-xl overflow-hidden border-4 border-white/25 shadow-lg">
              <img
                src={vcImage}
                alt="Vice Chancellor, Port City International University"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <h3 className="font-heading font-semibold text-base text-foreground mt-4 text-center">
              {vcName}
            </h3>
            <p className="text-muted-foreground text-sm text-center">{vcTitle}</p>
          </div>

          {/* Right: Message */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="font-heading font-bold text-2xl md:text-3xl mb-1 tracking-wide uppercase text-foreground">
              Vice Chancellor's Message
            </h2>
            <div className="w-16 h-1 bg-highlight mb-5 rounded-full mx-auto md:mx-0" />
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-6">
              {vcMessage}
            </p>
            <Button
              asChild
              size="lg"
              className="bg-highlight hover:bg-highlight/90 text-highlight-foreground font-semibold px-8"
            >
              <Link to="/vice-chancellors-message">
                Read More <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VCMessage;
