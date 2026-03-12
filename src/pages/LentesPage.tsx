import { useState, useMemo } from "react";
import HeroSection from "@/components/HeroSection";
import FilterSidebar from "@/components/FilterSidebar";
import ProductCard from "@/components/ProductCard";
import { lenses, lensFilters } from "@/data/products";
import { ShieldCheck, Eye, Zap, SearchX } from "lucide-react";
import heroLentes from "@/assets/hero-lentes.jpg";

const diffs = [
  { icon: Eye, title: "Proteção UV", desc: "Bloqueio total dos raios ultravioleta para a saúde dos seus olhos." },
  { icon: ShieldCheck, title: "Redução de Reflexo", desc: "Tratamento antirreflexo para maior nitidez e conforto visual." },
  { icon: Zap, title: "Conforto Visual", desc: "Lentes projetadas para longos períodos de uso sem cansaço." },
];

const LentesPage = () => {
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});

  const onFilterChange = (key: string, value: string) => {
    setActiveFilters((prev) => {
      const arr = prev[key] || [];
      return { ...prev, [key]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value] };
    });
  };

  const filtered = useMemo(() => {
    return lenses.filter((p) =>
      Object.entries(activeFilters).every(
        ([key, values]) => values.length === 0 || values.includes(p.filters[key])
      )
    );
  }, [activeFilters]);

  return (
    <div>
      <HeroSection image={heroLentes} title="Lentes de Alta Performance" subtitle="Tecnologia de ponta e conforto visual. Encontre a lente ideal para o seu estilo de vida." />

      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary bg-primary/8 px-4 py-1.5 rounded-full mb-4">Diferenciais</span>
            <h2 className="font-display text-3xl font-bold text-foreground">Por que escolher nossas lentes?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {diffs.map((d) => (
              <div key={d.title} className="text-center p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300 group">
                <div className="mx-auto w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <d.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-sans font-semibold text-lg text-foreground">{d.title}</h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 pb-20">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-10">
          <FilterSidebar filters={lensFilters} activeFilters={activeFilters} onFilterChange={onFilterChange} />
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-muted-foreground">{filtered.length} produto{filtered.length !== 1 ? "s" : ""} encontrado{filtered.length !== 1 ? "s" : ""}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
            {filtered.length === 0 && (
              <div className="text-center py-20">
                <SearchX className="h-12 w-12 text-muted-foreground/40 mx-auto mb-4" />
                <p className="text-muted-foreground text-lg font-medium">Nenhuma lente encontrada</p>
                <p className="text-sm text-muted-foreground/70 mt-1">Tente ajustar os filtros para ver mais resultados.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LentesPage;
