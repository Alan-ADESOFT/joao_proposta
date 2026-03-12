import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { lenses, frames, ProductVariation } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { ShoppingCart, ArrowLeft, ShieldCheck, Truck, RefreshCw, CreditCard, Star } from "lucide-react";

const ProductDetailPage = () => {
  const { id } = useParams();
  const { addItem } = useCart();
  const product = [...lenses, ...frames].find((p) => p.id === id);
  const [selectedVariation, setSelectedVariation] = useState<ProductVariation | null>(null);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="font-display text-2xl font-bold text-foreground">Produto não encontrado</h1>
        <Button asChild className="mt-6"><Link to="/">Voltar à Home</Link></Button>
      </div>
    );
  }

  const currentImage = selectedVariation?.image || product.image;
  const parcelado = (product.price / 12).toFixed(2).replace(".", ",");
  const pixPrice = (product.price * 0.9).toFixed(2).replace(".", ",");

  return (
    <div className="container mx-auto px-4 py-10 lg:py-14">
      <Link to={product.category === "lente" ? "/lentes" : "/armacoes"} className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary mb-8 transition-colors">
        <ArrowLeft className="h-4 w-4" /> Voltar para {product.category === "lente" ? "Lentes" : "Armações"}
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
        {/* Image */}
        <div className="space-y-4">
          <div className="aspect-square rounded-2xl overflow-hidden bg-secondary border border-border/50">
            <img src={currentImage} alt={product.name} className="w-full h-full object-cover transition-all duration-500" />
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-primary uppercase tracking-wider bg-primary/8 px-3 py-1.5 rounded-full w-fit">
            <Star className="h-3 w-3" />
            {product.category === "lente" ? "Lente" : "Armação"}
          </span>
          <h1 className="font-display text-3xl lg:text-4xl font-bold text-foreground mt-4">{product.name}</h1>
          <p className="text-muted-foreground text-lg mt-4 leading-relaxed">{product.description}</p>

          {/* Filters/tags */}
          <div className="flex flex-wrap gap-2 mt-5">
            {Object.entries(product.filters).map(([k, v]) => (
              <span key={k} className="text-xs font-medium bg-secondary text-muted-foreground px-3 py-1.5 rounded-full border border-border/50">
                {v}
              </span>
            ))}
          </div>

          {/* Variations */}
          {product.variations && product.variations.length > 0 && (
            <div className="mt-8">
              <h3 className="text-sm font-semibold text-foreground mb-3">
                {product.category === "armacao" ? "Cores disponíveis" : "Variações"}
              </h3>
              <div className="flex gap-3">
                {product.variations.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVariation(selectedVariation?.id === v.id ? null : v)}
                    className={`flex flex-col items-center gap-1.5 p-2.5 rounded-xl border-2 transition-all ${
                      selectedVariation?.id === v.id
                        ? "border-primary bg-primary/5 shadow-md"
                        : "border-border hover:border-primary/40"
                    }`}
                  >
                    {v.colorHex && (
                      <div className="w-9 h-9 rounded-full border-2 border-white shadow-sm" style={{ backgroundColor: v.colorHex }} />
                    )}
                    <span className="text-xs font-medium text-muted-foreground">{v.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Price */}
          <div className="mt-8 p-5 rounded-2xl bg-gradient-to-br from-primary/5 to-primary/[0.02] border border-primary/10">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl lg:text-4xl font-bold text-primary">R$ {product.price.toFixed(2).replace(".", ",")}</span>
              <span className="text-sm text-muted-foreground">à vista</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1.5">
              ou <strong className="text-foreground">12x de R$ {parcelado}</strong> sem juros no cartão
            </p>
            <p className="text-sm text-emerald-600 font-medium mt-1">
              R$ {pixPrice} no PIX <span className="text-xs">(10% OFF)</span>
            </p>
          </div>

          <Button size="lg" className="mt-6 gap-2 font-semibold text-base rounded-xl py-6 shadow-lg shadow-primary/20" onClick={() => addItem(product)}>
            <ShoppingCart className="h-5 w-5" /> Adicionar ao Carrinho
          </Button>

          {/* Benefits */}
          <div className="mt-8 grid grid-cols-2 gap-3">
            {[
              { icon: ShieldCheck, title: "Garantia", desc: "12 meses" },
              { icon: Truck, title: "Frete Grátis", desc: "Acima de R$ 500" },
              { icon: RefreshCw, title: "Troca Fácil", desc: "Até 7 dias" },
              { icon: CreditCard, title: "12x s/ Juros", desc: "No cartão" },
            ].map((b) => (
              <div key={b.title} className="flex items-center gap-3 p-3 rounded-xl bg-secondary/70 border border-border/30">
                <div className="w-9 h-9 rounded-lg bg-primary/8 flex items-center justify-center shrink-0">
                  <b.icon className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground leading-tight">{b.title}</p>
                  <p className="text-[11px] text-muted-foreground">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
