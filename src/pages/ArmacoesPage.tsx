import { useState, useMemo } from "react";
import HeroSection from "@/components/HeroSection";
import FilterSidebar from "@/components/FilterSidebar";
import ProductCard from "@/components/ProductCard";
import { frames, frameFilters } from "@/data/products";
import { Gem, Feather, Palette } from "lucide-react";
import heroArmacoes from "@/assets/hero-armacoes.jpg";

const diffs = [
  { icon: Gem, title: "Design Moderno", desc: "Armações com design contemporâneo para todos os estilos." },
  { icon: Feather, title: "Ultra Leves", desc: "Materiais de última geração para máximo conforto o dia todo." },
  { icon: Palette, title: "Variedade de Cores", desc: "Opções que combinam com seu estilo pessoal." },
];

const ArmacoesPage = () => {
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});

  const onFilterChange = (key: string, value: string) => {
    setActiveFilters((prev) => {
      const arr = prev[key] || [];
      return { ...prev, [key]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value] };
    });
  };

  const filtered = useMemo(() => {
    return frames.filter((p) =>
      Object.entries(activeFilters).every(
        ([key, values]) => values.length === 0 || values.includes(p.filters[key])
      )
    );
  }, [activeFilters]);

  return (
    <div>
      <HeroSection image={heroArmacoes} title="Armações com Estilo e Conforto" subtitle="Encontre a armação perfeita para o seu rosto e personalidade." />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl font-bold text-foreground text-center mb-10">Diferenciais das Nossas Armações</h2>
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
          <FilterSidebar filters={frameFilters} activeFilters={activeFilters} onFilterChange={onFilterChange} />
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
            {filtered.length === 0 && (
              <p className="text-center text-muted-foreground py-16">Nenhuma armação encontrada com os filtros selecionados.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ArmacoesPage;
