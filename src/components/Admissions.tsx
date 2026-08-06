import { ArrowRight, CheckCircle, Download, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Admissions = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-[hsl(210,70%,45%)] via-[hsl(200,65%,48%)] to-[hsl(185,75%,45%)] text-white relative overflow-hidden" id="admissions">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-block bg-highlight text-highlight-foreground px-6 py-2 rounded-full font-semibold mb-4">
            Admissions Open — Fall 2025
          </div>
          <h2 className="font-heading font-bold text-4xl md:text-5xl mb-4">
            Start Your Application
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Join thousands of students pursuing excellence at PCIU
          </p>
        </div>

        {/* Two Column Layout for Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <Card className="bg-white/25 backdrop-blur-md border-white/40 hover:bg-white/35 transition-all shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <CheckCircle className="w-12 h-12 text-accent shrink-0" />
                <div className="flex-1">
                  <h3 className="font-heading font-bold text-xl mb-2 text-white">Apply Now</h3>
                  <p className="text-white/90 text-sm mb-4">
                    Start your application for Fall 2025 admission
                  </p>
                  <Button className="bg-highlight hover:bg-highlight/90 text-highlight-foreground">
                    Start Application <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/25 backdrop-blur-md border-white/40 hover:bg-white/35 transition-all shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Award className="w-12 h-12 text-accent shrink-0" />
                <div className="flex-1">
                  <h3 className="font-heading font-bold text-xl mb-2 text-white">Scholarships</h3>
                  <p className="text-white/90 text-sm mb-4">
                    Explore merit and need-based financial aid options
                  </p>
                  <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                    View Scholarships
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/25 backdrop-blur-md border-white/40 hover:bg-white/35 transition-all shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Download className="w-12 h-12 text-accent shrink-0" />
                <div className="flex-1">
                  <h3 className="font-heading font-bold text-xl mb-2 text-white">Prospectus</h3>
                  <p className="text-white/90 text-sm mb-4">
                    Download our comprehensive admission guide
                  </p>
                  <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                    Download PDF
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tuition Info */}
          <div className="bg-white/25 backdrop-blur-md rounded-lg p-6 border border-white/40 flex flex-col justify-center shadow-lg">
            <p className="text-white font-medium mb-4">
              Need help with tuition? We offer flexible payment plans and financial assistance.
            </p>
            <Button
              className="bg-accent hover:bg-accent/90 text-accent-foreground w-fit"
            >
              View Tuition & Fees
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Admissions;
