import { Checkbox } from "@/components/ui/checkbox";

interface FilterSidebarProps {
  filters: Record<string, string[]>;
  activeFilters: Record<string, string[]>;
  onFilterChange: (key: string, value: string) => void;
}

const filterLabels: Record<string, string> = {
  tipo: "Tipo de Lente",
  material: "Material",
  tratamento: "Tratamento",
  formato: "Formato",
  genero: "Gênero",
};

const FilterSidebar = ({ filters, activeFilters, onFilterChange }: FilterSidebarProps) => (
  <aside className="w-full lg:w-64 shrink-0">
    <div className="sticky top-24 space-y-6">
      <h3 className="font-display text-lg font-bold text-foreground">Filtros</h3>
      {Object.entries(filters).map(([key, values]) => (
        <div key={key}>
          <h4 className="font-sans font-semibold text-sm text-foreground mb-2">{filterLabels[key] || key}</h4>
          <div className="space-y-2">
            {values.map((val) => (
              <label key={val} className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer hover:text-foreground transition-colors">
                <Checkbox
                  checked={activeFilters[key]?.includes(val) || false}
                  onCheckedChange={() => onFilterChange(key, val)}
                />
                {val}
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  </aside>
);

export default FilterSidebar;
