import { useState } from "react";
import { X, Camera } from "lucide-react";
import { cn } from "@/lib/utils";

import campusAerial from "@/assets/gallery/campus-aerial.jpg";
import graduation from "@/assets/gallery/graduation.jpg";
import labResearch from "@/assets/gallery/lab-research.jpg";
import library from "@/assets/gallery/library.jpg";
import culturalFest from "@/assets/gallery/cultural-fest.jpg";
import sports from "@/assets/gallery/sports.jpg";
import seminar from "@/assets/gallery/seminar.jpg";
import computerLab from "@/assets/gallery/computer-lab.jpg";

const galleryItems = [
  {
    src: campusAerial,
    title: "Our Beautiful Campus",
    category: "Campus",
    story:
      "Spread across a vibrant green landscape, the PCIU campus is designed to inspire learning and innovation. With modern academic buildings, open courtyards, and shaded walkways, our campus offers a serene yet dynamic environment where students thrive academically and socially.",
  },
  {
    src: graduation,
    title: "Convocation Ceremony",
    category: "Events",
    story:
      "Every year, PCIU celebrates its graduating students with a grand convocation ceremony. It is a moment of immense pride — for the students, their families, and the entire university community. Caps fly high as dreams take flight into the real world.",
  },
  {
    src: labResearch,
    title: "Cutting-Edge Research Labs",
    category: "Research",
    story:
      "Our state-of-the-art laboratories are equipped with the latest instruments and technology. Students and faculty collaborate on groundbreaking research across disciplines — from biotechnology to materials science — pushing the boundaries of knowledge.",
  },
  {
    src: library,
    title: "Central Library",
    category: "Facilities",
    story:
      "The PCIU Central Library houses thousands of books, journals, and digital resources. With quiet reading zones, group study areas, and high-speed internet access, it serves as the intellectual heart of the university where curiosity meets knowledge.",
  },
  {
    src: culturalFest,
    title: "Cultural Festival",
    category: "Culture",
    story:
      "PCIU's annual cultural festival is a spectacular celebration of art, music, dance, and drama. Students from all departments come together to showcase their talents, fostering creativity and cultural appreciation across the campus community.",
  },
  {
    src: sports,
    title: "Sports & Athletics",
    category: "Sports",
    story:
      "From inter-university cricket and football tournaments to athletics meets, PCIU encourages a healthy sporting culture. Our sports facilities and dedicated coaching staff help students balance academics with physical fitness and teamwork.",
  },
  {
    src: seminar,
    title: "Guest Lectures & Seminars",
    category: "Academic",
    story:
      "PCIU regularly hosts distinguished scholars, industry leaders, and thought leaders for seminars and guest lectures. These sessions expose students to real-world insights, inspire innovative thinking, and bridge the gap between academia and industry.",
  },
  {
    src: computerLab,
    title: "Modern Computer Labs",
    category: "Technology",
    story:
      "Equipped with high-performance workstations and the latest software tools, our computer labs provide students with hands-on experience in programming, data analysis, and digital design — preparing them for the tech-driven future.",
  },
];

export default function PhotoGallery() {
  const [selected, setSelected] = useState<(typeof galleryItems)[0] | null>(null);

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            <Camera className="w-4 h-4" />
            Photo Gallery
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Life at <span className="text-primary">PCIU</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Explore the vibrant moments that define our campus — from academics to celebrations.
          </p>
        </div>

        {/* Masonry-style Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {galleryItems.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setSelected(item)}
              className={cn(
                "group relative overflow-hidden rounded-2xl cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                idx === 0 && "col-span-2 row-span-2",
                idx === 3 && "row-span-2",
                idx === 5 && "col-span-2"
              )}
            >
              <div className={cn("w-full", idx === 0 || idx === 3 ? "aspect-square" : "aspect-[4/3]")}>
                <img
                  src={item.src}
                  alt={item.title}
                  loading="lazy"
                  width={800}
                  height={600}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out" />

              {/* Category Badge */}
              <div className="absolute top-3 left-3 bg-accent/90 backdrop-blur-sm text-accent-foreground text-xs font-semibold px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                {item.category}
              </div>

              {/* Bottom Content */}
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                <h3 className="text-white font-bold text-sm md:text-base lg:text-lg leading-tight drop-shadow-lg">
                  {item.title}
                </h3>
                <p className="text-white/80 text-xs mt-1 hidden md:block">Click to read the story →</p>
              </div>

              {/* Corner glow */}
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-accent/30 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox / Story Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
          onClick={() => setSelected(null)}
        >
          <div
            className="relative bg-card rounded-3xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col md:flex-row shadow-2xl animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 z-10 bg-black/50 backdrop-blur-sm text-white rounded-full p-2 hover:bg-black/70 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Image */}
            <div className="md:w-1/2 flex-shrink-0">
              <img
                src={selected.src}
                alt={selected.title}
                className="w-full h-64 md:h-full object-cover"
              />
            </div>

            {/* Story Content */}
            <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-center overflow-y-auto">
              <span className="inline-block bg-accent/20 text-accent-foreground text-xs font-semibold px-3 py-1 rounded-full mb-4 w-fit">
                {selected.category}
              </span>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                {selected.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed text-base">
                {selected.story}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
