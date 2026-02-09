import HeroSection from "@/components/HeroSection";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ClipboardList, Truck, Search, RefreshCw, ArrowRight } from "lucide-react";
import heroLogistica from "@/assets/hero-logistica.jpg";

const steps = [
  { icon: ClipboardList, num: 1, title: "Solicitação", desc: "Acesse sua conta e solicite a troca ou devolução do produto em poucos cliques." },
  { icon: Truck, num: 2, title: "Envio do Produto", desc: "Embale o produto com cuidado e envie usando a etiqueta de postagem fornecida." },
  { icon: Search, num: 3, title: "Análise do Produto", desc: "Nossa equipe analisa o produto em até 5 dias úteis após o recebimento." },
  { icon: RefreshCw, num: 4, title: "Troca ou Reembolso", desc: "Após a aprovação, realizamos a troca ou reembolso conforme sua preferência." },
];

const LogisticaReversaPage = () => (
  <div>
    <HeroSection
      image={heroLogistica}
      title="Logística Reversa"
      subtitle="Solicite sua troca de forma simples e rápida. Transparência do início ao fim."
    />

    <section className="py-20">
      <div className="container mx-auto px-4 text-center max-w-3xl">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">Como Funciona</h2>
        <p className="mt-4 text-muted-foreground text-lg">
          Nosso processo de troca e devolução foi pensado para ser simples e transparente. Acompanhe cada etapa do processo com total tranquilidade.
        </p>
      </div>
    </section>

    <section className="pb-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((s) => (
            <div key={s.num} className="relative p-8 rounded-lg bg-secondary text-center">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm flex items-center justify-center">
                {s.num}
              </div>
              <div className="mx-auto w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4 mt-2">
                <s.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-sans font-semibold text-lg text-foreground">{s.title}</h3>
              <p className="text-sm text-muted-foreground mt-2">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-16 bg-secondary">
      <div className="container mx-auto px-4 text-center">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">Precisa Fazer uma Troca?</h2>
        <p className="mt-3 text-muted-foreground">Acesse sua conta e inicie o processo agora mesmo.</p>
        <Button asChild size="lg" className="mt-6 gap-2 bg-accent text-accent-foreground hover:bg-accent/90 font-semibold">
          <Link to="/minha-conta">Acessar Minha Conta <ArrowRight className="h-4 w-4" /></Link>
        </Button>
      </div>
    </section>
  </div>
);

export default LogisticaReversaPage;
