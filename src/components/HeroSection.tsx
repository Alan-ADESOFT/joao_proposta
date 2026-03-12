import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface HeroSectionProps {
  image: string;
  title: string;
  subtitle: string;
  ctaText?: string;
  ctaLink?: string;
}

const HeroSection = ({ image, title, subtitle, ctaText, ctaLink }: HeroSectionProps) => (
  <section className="relative h-[500px] md:h-[580px] overflow-hidden">
    <img src={image} alt="" className="absolute inset-0 w-full h-full object-cover scale-105" />
    <div className="absolute inset-0 bg-gradient-to-r from-[hsl(213,80%,12%)]/90 via-[hsl(213,80%,20%)]/75 to-transparent" />
    <div className="absolute inset-0 bg-gradient-to-t from-[hsl(213,80%,10%)]/40 to-transparent" />
    <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center">
      <div className="max-w-2xl">
        <h1 className="font-display text-3xl md:text-5xl lg:text-[3.4rem] font-bold text-white leading-[1.15] animate-fade-in drop-shadow-lg">
          {title}
        </h1>
        <p className="mt-5 text-base md:text-lg text-white/75 max-w-xl leading-relaxed animate-fade-in" style={{ animationDelay: "0.15s" }}>
          {subtitle}
        </p>
        {ctaText && ctaLink && (
          <div className="mt-8 flex gap-3 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Button asChild size="lg" className="bg-[hsl(45,95%,55%)] text-[hsl(220,20%,10%)] hover:bg-[hsl(45,95%,50%)] font-semibold text-base px-8 py-6 rounded-xl shadow-lg shadow-[hsl(45,95%,55%)]/30 gap-2 group">
              <Link to={ctaLink}>
                {ctaText}
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  </section>
);

export default HeroSection;
