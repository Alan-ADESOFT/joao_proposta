import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Eye, Truck, ArrowRight, Star, Heart, Award, Clock, CreditCard } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import ProductCard from "@/components/ProductCard";
import { lenses, frames } from "@/data/products";
import heroHome from "@/assets/hero-home.jpg";

const features = [
  { icon: Eye, title: "Precisão Óptica", desc: "Lentes fabricadas com tecnologia de ponta e rigoroso controle para máxima nitidez visual." },
  { icon: ShieldCheck, title: "Garantia de Qualidade", desc: "Todos os produtos possuem garantia e passam por controle de qualidade certificado." },
  { icon: Truck, title: "Entrega Segura", desc: "Embalagem especial com proteção reforçada e rastreamento em tempo real." },
];

const stats = [
  { value: "15+", label: "Anos no mercado" },
  { value: "10k+", label: "Clientes atendidos" },
  { value: "98%", label: "Satisfação" },
  { value: "500+", label: "Modelos disponíveis" },
];

const benefits = [
  { icon: CreditCard, title: "12x Sem Juros", desc: "Parcele no cartão" },
  { icon: Award, title: "10% OFF no PIX", desc: "Desconto instantâneo" },
  { icon: Clock, title: "Frete Rápido", desc: "SEDEX ou PAC" },
  { icon: Heart, title: "Troca Fácil", desc: "Até 7 dias" },
];

const Index = () => {
  const featuredProducts = [...lenses.slice(0, 3), ...frames.slice(0, 3)];

  return (
    <div>
      <HeroSection
        image={heroHome}
        title="Sua visão merece o melhor. Óculos com tecnologia e estilo."
        subtitle="Mais de 15 anos cuidando da sua visão em Itamaraju-BA. Lentes de alta performance, armações modernas e atendimento que faz a diferença."
        ctaText="Explorar Produtos"
        ctaLink="/lentes"
      />

      {/* Benefits bar */}
      <section className="bg-[hsl(213,80%,20%)] text-white py-0">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {benefits.map((b, i) => (
              <div key={b.title} className={`flex items-center gap-3 py-4 px-4 ${i > 0 ? "border-l border-white/10" : ""}`}>
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <b.icon className="h-5 w-5 text-[hsl(45,95%,55%)]" />
                </div>
                <div>
                  <p className="text-sm font-semibold leading-tight">{b.title}</p>
                  <p className="text-[11px] text-white/60">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sobre a Empresa */}
      <section className="py-20 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary bg-primary/8 px-4 py-1.5 rounded-full mb-4">Quem somos</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">Sobre a Ótica Itamaraju</h2>
            <p className="mt-6 text-muted-foreground text-lg leading-relaxed">
              Referência no mercado óptico do sul da Bahia, a <strong className="text-foreground">Ótica Itamaraju</strong> combina tradição de mais de 15 anos com tecnologia de ponta.
              Localizada no coração de Itamaraju-BA, oferecemos atendimento personalizado, produtos de alta qualidade e preços que cabem no seu bolso.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-14 max-w-4xl mx-auto">
            {stats.map((s) => (
              <div key={s.label} className="text-center p-6 rounded-2xl bg-gradient-to-b from-primary/5 to-primary/[0.02] border border-primary/10">
                <span className="text-3xl md:text-4xl font-bold text-primary">{s.value}</span>
                <p className="text-sm text-muted-foreground mt-1 font-medium">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">
            {features.map((f) => (
              <div key={f.title} className="text-center p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300 group">
                <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <f.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-sans font-semibold text-lg text-foreground">{f.title}</h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categorias */}
      <section className="py-20 bg-gradient-to-b from-secondary to-secondary/50">
        <div className="container mx-auto px-4 text-center">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary bg-primary/8 px-4 py-1.5 rounded-full mb-4">Categorias</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">Nossos Produtos</h2>
          <p className="mt-4 text-muted-foreground text-lg max-w-xl mx-auto">Encontre a solução perfeita para a sua visão com nossa linha completa de lentes e armações</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <Button asChild size="lg" className="gap-2 font-semibold px-10 py-6 text-base rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all">
              <Link to="/lentes"><Eye className="h-5 w-5" /> Ver Lentes</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="gap-2 font-semibold px-10 py-6 text-base rounded-xl border-2 hover:bg-primary hover:text-white transition-all">
              <Link to="/armacoes"><Star className="h-5 w-5" /> Ver Armações</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Produtos em Destaque */}
      <section className="py-20 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary bg-primary/8 px-4 py-1.5 rounded-full mb-4">Destaques</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">Produtos em Destaque</h2>
            <p className="mt-3 text-muted-foreground text-lg">Os mais vendidos e recomendados pela nossa equipe</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Button asChild variant="outline" size="lg" className="gap-2 font-semibold rounded-xl border-2">
              <Link to="/lentes">Ver Todos os Produtos <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Logistica Reversa */}
      <section className="py-20 bg-gradient-to-r from-[hsl(213,80%,22%)] to-[hsl(213,80%,32%)]">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-[hsl(45,95%,55%)] bg-white/10 px-4 py-1.5 rounded-full mb-4">Suporte</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white">Logística Reversa</h2>
          <p className="mt-4 text-white/70 text-lg leading-relaxed">
            Precisa trocar ou devolver seu produto? Nosso processo é simples, transparente e rápido.
            Acompanhe cada etapa com total segurança. Satisfação garantida.
          </p>
          <Button asChild className="mt-8 gap-2 bg-[hsl(45,95%,55%)] text-[hsl(220,20%,10%)] hover:bg-[hsl(45,95%,50%)] font-semibold text-base px-8 py-6 rounded-xl shadow-lg">
            <Link to="/logistica-reversa">Saiba Como Funciona <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
