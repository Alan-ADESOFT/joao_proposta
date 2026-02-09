import { useParams, Link } from "react-router-dom";
import { lenses, frames } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { ShoppingCart, ArrowLeft, ShieldCheck, Truck, RefreshCw } from "lucide-react";

const ProductDetailPage = () => {
  const { id } = useParams();
  const { addItem } = useCart();
  const product = [...lenses, ...frames].find((p) => p.id === id);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="font-display text-2xl font-bold text-foreground">Produto não encontrado</h1>
        <Button asChild className="mt-6"><Link to="/">Voltar à Home</Link></Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <Link to={product.category === "lente" ? "/lentes" : "/armacoes"} className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-6">
        <ArrowLeft className="h-4 w-4" /> Voltar
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="aspect-square rounded-lg overflow-hidden bg-secondary">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>

        <div className="flex flex-col justify-center">
          <span className="text-sm font-medium text-primary uppercase tracking-wider">
            {product.category === "lente" ? "Lente" : "Armação"}
          </span>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2">{product.name}</h1>
          <p className="text-muted-foreground text-lg mt-4">{product.description}</p>

          <div className="flex flex-wrap gap-2 mt-6">
            {Object.entries(product.filters).map(([k, v]) => (
              <span key={k} className="text-xs font-medium bg-secondary text-muted-foreground px-3 py-1 rounded-full">
                {v}
              </span>
            ))}
          </div>

          <div className="mt-8">
            <span className="text-3xl font-bold text-primary">R$ {product.price.toFixed(2).replace(".", ",")}</span>
            <span className="text-sm text-muted-foreground ml-2">à vista</span>
          </div>

          <Button size="lg" className="mt-6 gap-2 w-fit font-semibold" onClick={() => addItem(product)}>
            <ShoppingCart className="h-5 w-5" /> Adicionar ao Carrinho
          </Button>

          <div className="mt-10 grid grid-cols-3 gap-4">
            {[
              { icon: ShieldCheck, label: "Garantia" },
              { icon: Truck, label: "Frete Grátis*" },
              { icon: RefreshCw, label: "Troca Fácil" },
            ].map((b) => (
              <div key={b.label} className="text-center p-3 rounded-lg bg-secondary">
                <b.icon className="h-5 w-5 text-primary mx-auto mb-1" />
                <span className="text-xs text-muted-foreground">{b.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
