import { useState, useMemo } from "react";
import HeroSection from "@/components/HeroSection";
import FilterSidebar from "@/components/FilterSidebar";
import ProductCard from "@/components/ProductCard";
import { lenses, lensFilters } from "@/data/products";
import { ShieldCheck, Eye, Zap } from "lucide-react";
import heroLentes from "@/assets/hero-lentes.jpg";

const diffs = [
  { icon: Eye, title: "Proteção UV", desc: "Bloqueio total dos raios ultravioleta para a saúde dos seus olhos." },
  { icon: ShieldCheck, title: "Redução de Reflexo", desc: "Tratamento antirreflexo para maior nitidez e conforto." },
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
      <HeroSection image={heroLentes} title="Lentes de Alta Performance" subtitle="Tecnologia e conforto para a sua visão. Encontre a lente ideal para o seu dia a dia." />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl font-bold text-foreground text-center mb-10">Diferenciais das Nossas Lentes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {diffs.map((d) => (
              <div key={d.title} className="text-center p-6 rounded-lg bg-secondary">
                <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <d.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-sans font-semibold text-foreground">{d.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-10">
          <FilterSidebar filters={lensFilters} activeFilters={activeFilters} onFilterChange={onFilterChange} />
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
            {filtered.length === 0 && (
              <p className="text-center text-muted-foreground py-16">Nenhuma lente encontrada com os filtros selecionados.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LentesPage;
