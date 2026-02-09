import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface HeroSectionProps {
  image: string;
  title: string;
  subtitle: string;
  ctaText?: string;
  ctaLink?: string;
}

const HeroSection = ({ image, title, subtitle, ctaText, ctaLink }: HeroSectionProps) => (
  <section className="relative h-[480px] md:h-[540px] overflow-hidden">
    <img src={image} alt="" className="absolute inset-0 w-full h-full object-cover" />
    <div className="absolute inset-0 hero-gradient opacity-80" />
    <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center">
      <h1 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground max-w-2xl leading-tight animate-fade-in">
        {title}
      </h1>
      <p className="mt-4 text-lg md:text-xl text-primary-foreground/80 max-w-xl animate-fade-in" style={{ animationDelay: "0.15s" }}>
        {subtitle}
      </p>
      {ctaText && ctaLink && (
        <div className="mt-8 animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold text-base px-8">
            <Link to={ctaLink}>{ctaText}</Link>
          </Button>
        </div>
      )}
    </div>
  </section>
);

export default HeroSection;
