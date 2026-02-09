import { useState } from "react";
import { MapPin, Search, X, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ShippingBanner = () => {
  const [cep, setCep] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const handleCheck = () => {
    if (cep.replace(/\D/g, "").length >= 8) {
      setResult("Sim! Entregamos para o seu endereço. Prazo estimado: 5-7 dias úteis.");
    } else {
      setResult("Informe um CEP válido com 8 dígitos.");
    }
  };

  return (
    <div className="bg-accent/10 border-b border-accent/20">
      <div className="container mx-auto px-4 py-2.5 flex items-center justify-center gap-3 flex-wrap">
        <div className="flex items-center gap-2 text-sm font-medium text-foreground">
          <MapPin className="h-4 w-4 text-primary" />
          <span>Calcule seu frete e verifique se entregamos no seu endereço</span>
        </div>
        {!open ? (
          <Button size="sm" variant="outline" className="h-8 text-xs gap-1 font-semibold" onClick={() => setOpen(true)}>
            <Search className="h-3.5 w-3.5" /> Verificar
          </Button>
        ) : (
          <div className="flex items-center gap-2">
            <Input
              placeholder="Digite seu CEP"
              value={cep}
              onChange={(e) => { setCep(e.target.value); setResult(null); }}
              className="h-8 w-36 text-sm"
              maxLength={9}
            />
            <Button size="sm" className="h-8 text-xs font-semibold" onClick={handleCheck}>Consultar</Button>
            <button onClick={() => { setOpen(false); setResult(null); setCep(""); }} className="p-1 text-muted-foreground hover:text-foreground">
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
        {result && (
          <div className="w-full text-center text-sm flex items-center justify-center gap-1.5 text-primary font-medium">
            <CheckCircle2 className="h-4 w-4" /> {result}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShippingBanner;
