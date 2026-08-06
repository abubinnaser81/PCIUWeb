import Header from "@/components/Header";
import Footer from "@/components/Footer";
import vcImage from "@/assets/vc-photo.jpg";

const VCMessagePage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Banner */}
        <section className="bg-primary py-16 md:py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-primary-foreground mb-2">
              Vice Chancellor's Message
            </h1>
            <p className="text-primary-foreground/70 text-lg">Port City International University</p>
          </div>
        </section>

        {/* Content */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row gap-8 md:gap-12">
                {/* VC Photo & Info */}
                <div className="md:w-1/3 flex flex-col items-center text-center shrink-0">
                  <div className="w-48 h-56 rounded-xl overflow-hidden shadow-lg mb-4 border border-border">
                    <img
                      src={vcImage}
                      alt="Prof. Dr. Mohammad Tayub Chowdhury, Vice Chancellor, Port City International University"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-foreground">Prof. Dr. Mohammad Tayub Chowdhury</h3>
                  <p className="text-muted-foreground text-sm font-medium">Vice Chancellor</p>
                  <p className="text-muted-foreground text-sm">Port City International University</p>

                  {/* Education */}
                  <div className="mt-6 text-left w-full space-y-3">
                    <h4 className="font-heading font-semibold text-sm text-foreground uppercase tracking-wide">Education</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="border-l-2 border-highlight pl-3">
                        <span className="font-medium text-foreground">PhD</span><br />
                        Marketing, University of Chittagong
                      </li>
                      <li className="border-l-2 border-highlight pl-3">
                        <span className="font-medium text-foreground">Master of Arts - MA</span><br />
                        Global Management and Development, Institute of Development Policy and Management, Antwerp University
                      </li>
                      <li className="border-l-2 border-highlight pl-3">
                        <span className="font-medium text-foreground">Master's Degree</span><br />
                        Marketing, Department of Management, University of Chittagong
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Message Content */}
                <div className="md:w-2/3 prose prose-lg max-w-none text-muted-foreground">
                  <p>
                    Port City International University located at Chittagong is a new generation private university committed to excellence in higher education and research. The vision of this university is to make it a global standard center of excellence through education, research and service. The society the way it is changing will have a profound impact on the university education. Transformative education to change the society as it demands is our mission. In a world where change is the "norm", there is one thing for certain-knowledge however, will be a key resource and will be highly sought within our region and around the globe.
                  </p>
                  <p>
                    Knowledge has no boundary and the university is meant to create knowledge and develop skilled human resources those who will contribute to the advancement of knowledge and betterment of the society. This is, however, a daunting task to achieve all the attributes to perform such sacred duties to the society and the nation as a whole. The most challenging part of all the universities is to help to generate intellectual property which will create new jobs and to educate and train people to work in the fields where they will be valued both for their specialized knowledge and their ability to research, communicate and solve problems.
                  </p>
                  <p>
                    Considering all these challenges of the fast changing world, Port City International University has chalked out distinctive plans delineating the responsibilities of the students, faculty and the staffs to meet the required benchmark of quality education. Our courses are tailor made and designed in the context of global need. We follow a vibrant and innovative course curriculum for our students and provide all state of the art facilities to ensure quality education. We welcome your interest and invite your further query and hope that you might join us later as one of the elite students of Port City International University.
                  </p>
                  <p className="font-semibold text-foreground mt-8">
                    Prof. Dr. Mohammad Tayub Chowdhury<br />
                    <span className="font-normal text-muted-foreground">Vice Chancellor, Port City International University</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default VCMessagePage;
