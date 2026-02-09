import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";

const CartPage = () => {
  const { items, removeItem, updateQuantity, total } = useCart();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <h1 className="font-display text-2xl font-bold text-foreground">Seu carrinho está vazio</h1>
        <p className="text-muted-foreground mt-2">Explore nossos produtos e encontre o ideal para você.</p>
        <Button asChild className="mt-6"><Link to="/lentes">Ver Lentes</Link></Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="font-display text-3xl font-bold text-foreground mb-8">Carrinho de Compras</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-4">
          {items.map(({ product, quantity }) => (
            <div key={product.id} className="flex gap-4 p-4 rounded-lg bg-card card-shadow">
              <img src={product.image} alt={product.name} className="w-24 h-24 rounded-md object-cover bg-secondary" />
              <div className="flex-1">
                <h3 className="font-sans font-semibold text-foreground">{product.name}</h3>
                <p className="text-sm text-muted-foreground">{product.category === "lente" ? "Lente" : "Armação"}</p>
                <div className="flex items-center gap-3 mt-3">
                  <button onClick={() => updateQuantity(product.id, quantity - 1)} className="w-8 h-8 rounded-md bg-secondary flex items-center justify-center hover:bg-muted transition-colors">
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="font-medium text-foreground w-6 text-center">{quantity}</span>
                  <button onClick={() => updateQuantity(product.id, quantity + 1)} className="w-8 h-8 rounded-md bg-secondary flex items-center justify-center hover:bg-muted transition-colors">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="text-right flex flex-col justify-between">
                <button onClick={() => removeItem(product.id)} className="text-muted-foreground hover:text-destructive transition-colors self-end">
                  <Trash2 className="h-4 w-4" />
                </button>
                <span className="font-bold text-primary">R$ {(product.price * quantity).toFixed(2).replace(".", ",")}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-card rounded-lg p-6 card-shadow h-fit sticky top-24">
          <h3 className="font-sans font-semibold text-lg text-foreground mb-4">Resumo do Pedido</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal</span>
              <span>R$ {total.toFixed(2).replace(".", ",")}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Frete</span>
              <span>Calcular no checkout</span>
            </div>
          </div>
          <div className="border-t mt-4 pt-4 flex justify-between font-bold text-foreground">
            <span>Total</span>
            <span className="text-primary">R$ {total.toFixed(2).replace(".", ",")}</span>
          </div>
          <Button asChild size="lg" className="w-full mt-6 bg-accent text-accent-foreground hover:bg-accent/90 font-semibold">
            <Link to="/checkout">Finalizar Compra</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
