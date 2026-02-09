import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Eye, Truck, ArrowRight, Star } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import ProductCard from "@/components/ProductCard";
import { lenses, frames } from "@/data/products";
import heroHome from "@/assets/hero-home.jpg";

const features = [
  { icon: Eye, title: "Precisão Óptica", desc: "Lentes fabricadas com tecnologia de ponta para máxima nitidez visual." },
  { icon: ShieldCheck, title: "Garantia de Qualidade", desc: "Todos os produtos passam por rigoroso controle de qualidade." },
  { icon: Truck, title: "Entrega Segura", desc: "Embalagem especial e rastreamento em tempo real até sua porta." },
];

const Index = () => {
  const featuredProducts = [...lenses.slice(0, 2), ...frames.slice(0, 2)];

  return (
    <div>
      <HeroSection
        image={heroHome}
        title="Sua visão merece precisão. Óculos feitos para o seu dia a dia."
        subtitle="Tecnologia, conforto e estilo em cada detalhe. Comprar óculos online nunca foi tão simples."
        ctaText="Ver Produtos"
        ctaLink="/lentes"
      />

      {/* Sobre a Empresa */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">Sobre a Ótica Itamaraju</h2>
          <p className="mt-6 text-muted-foreground text-lg leading-relaxed">
            Com anos de experiência no mercado óptico, a Ótica Itamaraju combina tecnologia de ponta com atendimento personalizado. 
            Nosso compromisso é oferecer produtos de alta qualidade, com preços acessíveis e uma experiência de compra transparente e confiável.
          </p>
        </div>
        <div className="container mx-auto px-4 mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((f) => (
            <div key={f.title} className="text-center p-8 rounded-lg bg-secondary">
              <div className="mx-auto w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <f.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-sans font-semibold text-lg text-foreground">{f.title}</h3>
              <p className="text-sm text-muted-foreground mt-2">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sobre os Produtos */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">Nossos Produtos</h2>
          <p className="mt-4 text-muted-foreground text-lg">Encontre a solução perfeita para a sua visão</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button asChild size="lg" className="gap-2 font-semibold px-8">
              <Link to="/lentes"><Eye className="h-5 w-5" /> Ver Lentes</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="gap-2 font-semibold px-8">
              <Link to="/armacoes"><Star className="h-5 w-5" /> Ver Armações</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Logística Reversa */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">Logística Reversa</h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Precisa trocar ou devolver seu produto? Nosso processo é simples, transparente e rápido.
            Acompanhe cada etapa com total segurança.
          </p>
          <Button asChild className="mt-8 gap-2 bg-accent text-accent-foreground hover:bg-accent/90 font-semibold">
            <Link to="/logistica-reversa">Saiba Como Funciona <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>
      </section>

      {/* Produtos em Destaque */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl font-bold text-foreground text-center mb-10">Produtos em Destaque</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
