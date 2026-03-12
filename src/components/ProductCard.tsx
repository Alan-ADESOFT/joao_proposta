import { Link } from "react-router-dom";
import { ShoppingCart, Eye } from "lucide-react";
import { Product } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";

const ProductCard = ({ product }: { product: Product }) => {
  const { addItem } = useCart();

  const parcelado = (product.price / 12).toFixed(2).replace(".", ",");

  return (
    <div className="group bg-card rounded-2xl overflow-hidden border border-border/50 hover:border-primary/25 hover:shadow-xl transition-all duration-300">
      <Link to={`/produto/${product.id}`} className="block relative">
        <div className="aspect-[4/3] overflow-hidden bg-secondary">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            loading="lazy"
          />
        </div>
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100 shadow-lg">
            <Eye className="w-5 h-5 text-primary" />
          </div>
        </div>
        {/* Category badge */}
        <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider bg-white/90 backdrop-blur-sm text-primary px-2.5 py-1 rounded-full shadow-sm">
          {product.category === "lente" ? "Lente" : "Armação"}
        </span>
      </Link>
      <div className="p-5">
        <Link to={`/produto/${product.id}`}>
          <h3 className="font-sans font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1 text-[15px]">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground mt-1.5 line-clamp-2 leading-relaxed">{product.description}</p>
        <div className="mt-4 pt-4 border-t border-border/50">
          <div className="flex items-end gap-1.5">
            <span className="text-2xl font-bold text-primary leading-none">
              R$ {product.price.toFixed(2).replace(".", ",")}
            </span>
          </div>
          <p className="text-[11px] text-muted-foreground mt-1">
            ou <strong className="text-foreground">12x de R$ {parcelado}</strong> sem juros
          </p>
          <Button
            size="sm"
            onClick={() => addItem(product)}
            className="w-full mt-3 gap-1.5 font-semibold rounded-xl h-10"
          >
            <ShoppingCart className="h-4 w-4" />
            Adicionar ao Carrinho
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
