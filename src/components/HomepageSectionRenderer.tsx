import { lazy, Suspense } from 'react';
import Hero from '@/components/Hero';
import NoticeMarquee from '@/components/NoticeMarquee';
import VCMessage from '@/components/VCMessage';
import ProgramFinder from '@/components/ProgramFinder';
import Faculties from '@/components/Faculties';
import Admissions from '@/components/Admissions';
import Research from '@/components/Research';
import PhotoGallery from '@/components/PhotoGallery';
import CampusLife from '@/components/CampusLife';
import NewsEvents from '@/components/NewsEvents';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface Section {
  id: string;
  section_type: string;
  title: string;
  content: Record<string, any>;
  is_visible: boolean;
  order_index: number;
}

interface Props {
  sections: Section[];
}

export default function HomepageSectionRenderer({ sections }: Props) {
  return (
    <>
      {sections
        .filter((s) => s.is_visible)
        .sort((a, b) => a.order_index - b.order_index)
        .map((section) => (
          <SectionSwitch key={section.id} section={section} />
        ))}
    </>
  );
}

function SectionSwitch({ section }: { section: Section }) {
  const c = section.content;

  switch (section.section_type) {
    case 'hero':
      return <Hero dynamicContent={c} />;
    case 'notice_marquee':
      return <NoticeMarquee />;
    case 'vc_message':
      return <VCMessage dynamicContent={c} />;
    case 'program_finder':
      return <ProgramFinder />;
    case 'faculties':
      return <Faculties />;
    case 'admissions':
      return <Admissions />;
    case 'research':
      return <><Research /><PhotoGallery /></>;
    case 'photo_gallery':
      return <PhotoGallery />;
    case 'campus_life':
      return <CampusLife />;
    case 'news_events':
      return <NewsEvents />;

    case 'custom_text':
      return (
        <section className="py-12 md:py-16">
          <div className={cn('container mx-auto px-4 max-w-4xl', c.alignment === 'center' && 'text-center', c.alignment === 'right' && 'text-right')}>
            {c.heading && <h2 className="text-3xl font-bold mb-6 text-foreground">{c.heading}</h2>}
            <div className="prose prose-lg max-w-none text-muted-foreground">
              {(c.content as string)?.split('\n').map((p: string, i: number) => <p key={i}>{p}</p>)}
            </div>
          </div>
        </section>
      );

    case 'custom_cta':
      return (
        <section className={cn(
          'py-16 md:py-20',
          c.variant === 'primary' && 'bg-primary text-primary-foreground',
          c.variant === 'secondary' && 'bg-secondary text-secondary-foreground',
          c.variant === 'accent' && 'bg-accent text-accent-foreground',
        )}>
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{c.title}</h2>
            {c.description && <p className="text-lg mb-8 opacity-90">{c.description}</p>}
            {c.buttonText && c.buttonLink && (
              <Button asChild size="lg" variant={c.variant === 'primary' ? 'secondary' : 'default'}>
                <Link to={c.buttonLink}>{c.buttonText}</Link>
              </Button>
            )}
          </div>
        </section>
      );

    case 'custom_cards':
      const cards = (c.cards as any[]) || [];
      const cols = c.columns || 3;
      return (
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className={cn(
              'grid gap-6',
              cols === 2 && 'md:grid-cols-2',
              cols === 3 && 'md:grid-cols-2 lg:grid-cols-3',
              cols === 4 && 'md:grid-cols-2 lg:grid-cols-4',
            )}>
              {cards.map((card: any, i: number) => (
                <Card key={i} className="hover:shadow-lg transition-shadow">
                  <CardHeader><CardTitle>{card.title}</CardTitle></CardHeader>
                  <CardContent><p className="text-muted-foreground">{card.description}</p></CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      );

    case 'custom_image':
      return (
        <section className="py-8">
          <div className="container mx-auto px-4">
            <figure className="max-w-4xl mx-auto">
              {c.src && <img src={c.src} alt={c.alt || ''} className="w-full rounded-lg shadow-lg" />}
              {c.caption && <figcaption className="text-center text-sm text-muted-foreground mt-3">{c.caption}</figcaption>}
            </figure>
          </div>
        </section>
      );

    default:
      return null;
  }
}
