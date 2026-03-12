import { useState } from "react";
import { MapPin, Search, X, CheckCircle2, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ShippingBanner = () => {
  const [cep, setCep] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const handleCheck = () => {
    if (cep.replace(/\D/g, "").length >= 8) {
      setResult("Entregamos no seu endereço! Prazo estimado: 5-7 dias úteis.");
    } else {
      setResult("Informe um CEP válido com 8 dígitos.");
    }
  };

  return (
    <div className="bg-gradient-to-r from-[hsl(45,95%,55%)]/15 to-[hsl(45,95%,55%)]/5 border-b border-[hsl(45,95%,55%)]/20">
      <div className="container mx-auto px-4 py-2.5 flex items-center justify-center gap-3 flex-wrap">
        <div className="flex items-center gap-2 text-sm font-medium text-foreground">
          <Truck className="h-4 w-4 text-primary" />
          <span>Frete <strong className="text-primary">GRÁTIS</strong> para compras acima de R$ 500</span>
          <span className="text-muted-foreground text-xs hidden sm:inline">|</span>
          <span className="text-muted-foreground text-xs hidden sm:inline">Verifique a entrega no seu CEP</span>
        </div>
        {!open ? (
          <Button size="sm" variant="outline" className="h-7 text-xs gap-1 font-semibold rounded-full" onClick={() => setOpen(true)}>
            <Search className="h-3 w-3" /> Verificar CEP
          </Button>
        ) : (
          <div className="flex items-center gap-2">
            <Input
              placeholder="00000-000"
              value={cep}
              onChange={(e) => { setCep(e.target.value); setResult(null); }}
              className="h-7 w-32 text-xs rounded-full"
              maxLength={9}
              onKeyDown={(e) => e.key === "Enter" && handleCheck()}
            />
            <Button size="sm" className="h-7 text-xs font-semibold rounded-full" onClick={handleCheck}>OK</Button>
            <button onClick={() => { setOpen(false); setResult(null); setCep(""); }} className="p-1 text-muted-foreground hover:text-foreground">
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        )}
        {result && (
          <div className="w-full text-center text-xs flex items-center justify-center gap-1.5 text-primary font-medium py-0.5">
            <CheckCircle2 className="h-3.5 w-3.5" /> {result}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShippingBanner;
