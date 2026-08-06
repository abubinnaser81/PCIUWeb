import { BlockContent } from '@/components/admin/blocks/BlockTypes';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Clock, GraduationCap, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { sanitizeUrl, sanitizeBackgroundImageUrl } from '@/lib/sanitize';
import DOMPurify from 'dompurify';

interface BlockRendererProps {
  blockType: string;
  content: BlockContent;
}

export default function BlockRenderer({ blockType, content }: BlockRendererProps) {
  switch (blockType) {
    case 'hero':
      return (
        <section
          className="relative py-24 md:py-32 bg-cover bg-center"
          style={{
            backgroundImage: content.backgroundImage && sanitizeBackgroundImageUrl(content.backgroundImage as string)
              ? `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${sanitizeBackgroundImageUrl(content.backgroundImage as string)})`
              : 'var(--gradient-hero)',
          }}
        >
          <div className="container mx-auto px-4 text-center text-white">
            {content.badge && <Badge className="mb-4 bg-accent text-accent-foreground">{content.badge as string}</Badge>}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">{content.title as string}</h1>
            {content.subtitle && <p className="text-xl md:text-2xl mb-8 opacity-90">{content.subtitle as string}</p>}
            {content.buttonText && content.buttonLink && sanitizeUrl(content.buttonLink as string) && (
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90">
                <Link to={sanitizeUrl(content.buttonLink as string)}>{content.buttonText as string}</Link>
              </Button>
            )}
          </div>
        </section>
      );

    case 'stats': {
      const items = (content.items as Array<{ value: string; label: string }>) || [];
      return (
        <section className="py-8 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className={cn('grid gap-6', `grid-cols-2 md:grid-cols-${Math.min(items.length, 4)}`)}>
              {items.map((item, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-3xl font-bold text-primary">{item.value}</div>
                  <div className="text-muted-foreground">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    }

    case 'richtext':
      return (
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            {content.heading && <h2 className="text-3xl font-bold mb-6 text-foreground">{content.heading as string}</h2>}
            <div
              className="prose prose-lg max-w-none text-muted-foreground [&_a]:text-primary [&_a]:underline"
              dangerouslySetInnerHTML={{ __html: typeof DOMPurify !== 'undefined' ? DOMPurify.sanitize(content.content as string) : (content.content as string) }}
            />
          </div>
        </section>
      );

    case 'text':
      return (
        <section className="py-12 md:py-16">
          <div className={cn('container mx-auto px-4 max-w-4xl', content.alignment === 'center' && 'text-center', content.alignment === 'right' && 'text-right')}>
            {content.heading && <h2 className="text-3xl font-bold mb-6 text-foreground">{content.heading as string}</h2>}
            <div className="prose prose-lg max-w-none text-muted-foreground">
              {(content.content as string)?.split('\n').map((paragraph, idx) => <p key={idx}>{paragraph}</p>)}
            </div>
          </div>
        </section>
      );

    case 'image':
      return (
        <section className="py-8">
          <div className="container mx-auto px-4">
            <figure className="max-w-4xl mx-auto">
              <img src={sanitizeUrl(content.src as string)} alt={content.alt as string} className="w-full rounded-lg shadow-lg" />
              {content.caption && <figcaption className="text-center text-sm text-muted-foreground mt-3">{content.caption as string}</figcaption>}
            </figure>
          </div>
        </section>
      );

    case 'cards': {
      const cards = (content.cards as Array<{ title: string; description: string; link: string }>) || [];
      const columns = (content.columns as number) || 3;
      return (
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className={cn('grid gap-6', columns === 2 && 'md:grid-cols-2', columns === 3 && 'md:grid-cols-2 lg:grid-cols-3', columns === 4 && 'md:grid-cols-2 lg:grid-cols-4')}>
              {cards.map((card, idx) => (
                <Card key={idx} className="hover:shadow-lg transition-shadow">
                  <CardHeader><CardTitle>{card.title}</CardTitle></CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{card.description}</p>
                    {card.link && sanitizeUrl(card.link) && (
                      <Button asChild variant="link" className="px-0 mt-4"><Link to={sanitizeUrl(card.link)}>Learn more →</Link></Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      );
    }

    case 'programs': {
      const programs = (content.programs as Array<{ name: string; duration: string; credits: string; description: string; concentrations: string[] }>) || [];
      return (
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-4xl space-y-6">
            {programs.map((program, idx) => (
              <Card key={idx}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-primary" />
                      {program.name}
                    </h3>
                    <Badge variant="secondary">{program.credits}</Badge>
                  </div>
                  <p className="text-muted-foreground mb-4">{program.description}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {program.duration}
                    </span>
                  </div>
                  {program.concentrations && program.concentrations.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-2">Concentrations:</h4>
                      <div className="flex flex-wrap gap-2">
                        {program.concentrations.map((c, i) => (
                          <Badge key={i} variant="outline">{c}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      );
    }

    case 'cta': {
      const variant = content.variant as string;
      return (
        <section className={cn('py-16 md:py-20', variant === 'primary' && 'bg-primary text-primary-foreground', variant === 'secondary' && 'bg-secondary text-secondary-foreground', variant === 'accent' && 'bg-accent text-accent-foreground')}>
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{content.title as string}</h2>
            {content.description && <p className="text-lg mb-8 opacity-90">{content.description as string}</p>}
            {content.buttonText && content.buttonLink && sanitizeUrl(content.buttonLink as string) && (
              <Button asChild size="lg" variant={variant === 'primary' ? 'secondary' : 'default'}>
                <Link to={sanitizeUrl(content.buttonLink as string)}>{content.buttonText as string}</Link>
              </Button>
            )}
          </div>
        </section>
      );
    }

    case 'accordion': {
      const items = (content.items as Array<{ question: string; answer: string }>) || [];
      return (
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-3xl">
            {content.title && <h2 className="text-3xl font-bold mb-8 text-center text-foreground">{content.title as string}</h2>}
            <Accordion type="single" collapsible className="w-full">
              {items.map((item, idx) => (
                <AccordionItem key={idx} value={`item-${idx}`}>
                  <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      );
    }

    case 'gallery': {
      const images = (content.images as Array<{ src: string; alt: string }>) || [];
      const galleryCols = (content.columns as number) || 3;
      return (
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className={cn('grid gap-4', galleryCols === 2 && 'md:grid-cols-2', galleryCols === 3 && 'md:grid-cols-2 lg:grid-cols-3', galleryCols === 4 && 'md:grid-cols-2 lg:grid-cols-4')}>
              {images.map((image, idx) => (
                <div key={idx} className="aspect-square overflow-hidden rounded-lg">
                  <img src={sanitizeUrl(image.src)} alt={image.alt} className="w-full h-full object-cover hover:scale-105 transition-transform" />
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    }

    case 'contact':
      return (
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            {content.title && <h2 className="text-3xl font-bold mb-8 text-center text-foreground">{content.title as string}</h2>}
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="space-y-4">
                {content.email && <div className="flex items-center gap-3"><Mail className="h-5 w-5 text-primary" /><span>{content.email as string}</span></div>}
                {content.phone && <div className="flex items-center gap-3"><Phone className="h-5 w-5 text-primary" /><span>{content.phone as string}</span></div>}
                {content.address && <div className="flex items-start gap-3"><MapPin className="h-5 w-5 text-primary mt-1" /><span>{content.address as string}</span></div>}
                {content.hours && <div className="flex items-center gap-3"><Clock className="h-5 w-5 text-primary" /><span>{content.hours as string}</span></div>}
              </div>
              {content.showForm && (
                <Card>
                  <CardContent className="pt-6">
                    <form className="space-y-4">
                      <input type="text" placeholder="Your Name" className="w-full px-4 py-2 border rounded-lg" />
                      <input type="email" placeholder="Your Email" className="w-full px-4 py-2 border rounded-lg" />
                      <textarea placeholder="Your Message" rows={4} className="w-full px-4 py-2 border rounded-lg" />
                      <Button type="submit" className="w-full">Send Message</Button>
                    </form>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </section>
      );

    case 'notices': {
      const items = (content.items as Array<{ title: string; date: string; type: string }>) || [];
      return (
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            {content.title && <h2 className="text-3xl font-bold mb-8 text-foreground flex items-center gap-2"><FileText className="w-6 h-6 text-primary" />{content.title as string}</h2>}
            <div className="space-y-3">
              {items.map((item, idx) => (
                <Card key={idx}>
                  <CardContent className="p-4 flex items-center justify-between">
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">{item.date}</p>
                    </div>
                    <Badge variant="secondary">{item.type}</Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      );
    }

    case 'quicklinks': {
      const links = (content.links as Array<{ label: string; url: string }>) || [];
      return (
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container mx-auto px-4 max-w-4xl">
            {content.title && <h2 className="text-3xl font-bold mb-8 text-foreground">{content.title as string}</h2>}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              {links.map((link, idx) => (
                <Link key={idx} to={sanitizeUrl(link.url) || '#'} className="flex items-center gap-2 p-3 rounded-lg bg-card hover:bg-primary/5 border transition-colors">
                  <span className="text-primary">→</span>
                  <span className="font-medium">{link.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      );
    }

    default:
      return null;
  }
}
