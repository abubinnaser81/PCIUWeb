import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Users, BookOpen, GraduationCap, Award } from "lucide-react";
import heroSlide1 from "@/assets/hero-campus.jpg";
import heroSlide2 from "@/assets/hero-slide-2.jpg";
import heroSlide3 from "@/assets/hero-slide-3.jpg";
import heroSlide4 from "@/assets/hero-slide-4.jpg";

interface HeroSlide {
  image: string;
  title?: string;
  subtitle?: string;
  link?: string;
}

interface HeroProps {
  dynamicContent?: Record<string, any>;
}

const defaultSlides: HeroSlide[] = [
  {
    image: heroSlide1,
    title: "Port City International University",
    subtitle: "Where the Bay Meets Brilliance — A global university in the heart of Chattogram's port city",
  },
  {
    image: heroSlide2,
    title: "Spring Orientation 2026",
    subtitle: "Welcoming new students to the PCIU family — your journey to excellence begins here",
  },
  {
    image: heroSlide3,
    title: "Vibrant Campus Culture",
    subtitle: "Experience the energy of student clubs, festivals, and creative expression at PCIU",
  },
  {
    image: heroSlide4,
    title: "Research That Matters",
    subtitle: "Advancing knowledge through innovation at PCIU's cutting-edge laboratories",
  },
];

const Hero = ({ dynamicContent }: HeroProps) => {
  const slides = dynamicContent?.slides || defaultSlides;
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCurrent(index);
      setTimeout(() => setIsTransitioning(false), 700);
    },
    [isTransitioning]
  );

  const next = useCallback(() => {
    goTo((current + 1) % slides.length);
  }, [current, slides.length, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length);
  }, [current, slides.length, goTo]);

  // Auto-play
  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="relative w-full h-[85vh] md:h-[90vh] overflow-hidden" id="home">
      {/* Slides */}
      {slides.map((slide: HeroSlide, index: number) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title || `Slide ${index + 1}`}
            className="w-full h-full object-cover"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/20 to-transparent" />

          {/* Text overlay */}
          {(slide.title || slide.subtitle) && (
            <div className="absolute inset-0 z-10 flex items-end pb-32 md:pb-40">
              <div className="container mx-auto px-6 md:px-12">
                <div className="max-w-3xl">
                  {slide.title && (
                    <h2
                      className={`font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-4 drop-shadow-lg transition-all duration-700 ${
                        index === current
                          ? "translate-y-0 opacity-100"
                          : "translate-y-8 opacity-0"
                      }`}
                    >
                      {slide.title}
                    </h2>
                  )}
                  {slide.subtitle && (
                    <p
                      className={`text-lg md:text-xl text-white/90 max-w-2xl drop-shadow-md transition-all duration-700 delay-150 ${
                        index === current
                          ? "translate-y-0 opacity-100"
                          : "translate-y-8 opacity-0"
                      }`}
                    >
                      {slide.subtitle}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Navigation Arrows */}
      <div className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-3">
        <button
          onClick={prev}
          className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white hover:bg-white/40 transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={next}
          className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white hover:bg-white/40 transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_: HeroSlide, index: number) => (
          <button
            key={index}
            onClick={() => goTo(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === current
                ? "w-8 bg-accent"
                : "w-2 bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      {/* Stats Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20 bg-primary/90 backdrop-blur-sm">
        <div className="container mx-auto px-6 md:px-12 py-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-white text-center">
          <div className="flex flex-col items-center gap-1">
            <Users className="w-6 h-6 text-accent" />
            <span className="text-2xl md:text-3xl font-bold">5,000+</span>
            <span className="text-xs md:text-sm text-white/80">Students Enrolled</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <BookOpen className="w-6 h-6 text-accent" />
            <span className="text-2xl md:text-3xl font-bold">25+</span>
            <span className="text-xs md:text-sm text-white/80">Programs Offered</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <GraduationCap className="w-6 h-6 text-accent" />
            <span className="text-2xl md:text-3xl font-bold">10,000+</span>
            <span className="text-xs md:text-sm text-white/80">Alumni Worldwide</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Award className="w-6 h-6 text-accent" />
            <span className="text-2xl md:text-3xl font-bold">50+</span>
            <span className="text-xs md:text-sm text-white/80">Expert Faculty</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
