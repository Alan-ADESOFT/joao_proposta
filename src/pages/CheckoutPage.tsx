import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const CheckoutPage = () => {
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [shipping, setShipping] = useState<"pac" | "sedex" | null>(null);
  const [completed, setCompleted] = useState(false);

  const shippingCost = shipping === "pac" ? 29.9 : shipping === "sedex" ? 49.9 : 0;
  const grandTotal = total + shippingCost;

  if (completed) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <CheckCircle className="h-20 w-20 text-primary mx-auto mb-6" />
        <h1 className="font-display text-3xl font-bold text-foreground">Pedido Realizado!</h1>
        <p className="text-muted-foreground mt-3">Seu pedido #12345 foi confirmado. Você pode acompanhar na sua conta.</p>
        <Button className="mt-6" onClick={() => navigate("/minha-conta")}>Acompanhar Pedido</Button>
      </div>
    );
  }

  if (items.length === 0) {
    navigate("/carrinho");
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="font-display text-3xl font-bold text-foreground mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          {/* Dados Pessoais */}
          <div className="bg-card rounded-lg p-6 card-shadow">
            <h3 className="font-sans font-semibold text-lg text-foreground mb-4">Dados Pessoais</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><Label>Nome Completo</Label><Input placeholder="Maria Silva" className="mt-1" /></div>
              <div><Label>E-mail</Label><Input type="email" placeholder="maria@email.com" className="mt-1" /></div>
              <div><Label>Telefone</Label><Input placeholder="(73) 99999-0000" className="mt-1" /></div>
              <div><Label>CPF</Label><Input placeholder="000.000.000-00" className="mt-1" /></div>
            </div>
          </div>

          {/* Endereço */}
          <div className="bg-card rounded-lg p-6 card-shadow">
            <h3 className="font-sans font-semibold text-lg text-foreground mb-4">Endereço de Entrega</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><Label>CEP</Label><Input placeholder="45990-000" className="mt-1" /></div>
              <div><Label>Rua</Label><Input placeholder="Rua Principal" className="mt-1" /></div>
              <div><Label>Número</Label><Input placeholder="123" className="mt-1" /></div>
              <div><Label>Complemento</Label><Input placeholder="Apto 4B" className="mt-1" /></div>
              <div><Label>Bairro</Label><Input placeholder="Centro" className="mt-1" /></div>
              <div><Label>Cidade</Label><Input placeholder="Itamaraju" className="mt-1" /></div>
            </div>
          </div>

          {/* Frete */}
          <div className="bg-card rounded-lg p-6 card-shadow">
            <h3 className="font-sans font-semibold text-lg text-foreground mb-4">Frete</h3>
            <div className="space-y-3">
              <label className={`flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition-colors ${shipping === "pac" ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"}`} onClick={() => setShipping("pac")}>
                <div><span className="font-medium text-foreground">PAC</span><p className="text-sm text-muted-foreground">Entrega em 8-12 dias úteis</p></div>
                <span className="font-bold text-foreground">R$ 29,90</span>
              </label>
              <label className={`flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition-colors ${shipping === "sedex" ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"}`} onClick={() => setShipping("sedex")}>
                <div><span className="font-medium text-foreground">SEDEX</span><p className="text-sm text-muted-foreground">Entrega em 3-5 dias úteis</p></div>
                <span className="font-bold text-foreground">R$ 49,90</span>
              </label>
            </div>
          </div>

          {/* Pagamento */}
          <div className="bg-card rounded-lg p-6 card-shadow">
            <h3 className="font-sans font-semibold text-lg text-foreground mb-4">Pagamento</h3>
            <p className="text-sm text-muted-foreground mb-4">Simulação de pagamento — nenhum valor será cobrado.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><Label>Número do Cartão</Label><Input placeholder="0000 0000 0000 0000" className="mt-1" /></div>
              <div><Label>Nome no Cartão</Label><Input placeholder="MARIA SILVA" className="mt-1" /></div>
              <div><Label>Validade</Label><Input placeholder="12/28" className="mt-1" /></div>
              <div><Label>CVV</Label><Input placeholder="123" className="mt-1" /></div>
            </div>
          </div>
        </div>

        {/* Resumo */}
        <div className="bg-card rounded-lg p-6 card-shadow h-fit sticky top-24">
          <h3 className="font-sans font-semibold text-lg text-foreground mb-4">Resumo</h3>
          <div className="space-y-3">
            {items.map(({ product, quantity }) => (
              <div key={product.id} className="flex justify-between text-sm">
                <span className="text-muted-foreground">{product.name} × {quantity}</span>
                <span className="text-foreground">R$ {(product.price * quantity).toFixed(2).replace(".", ",")}</span>
              </div>
            ))}
          </div>
          <div className="border-t mt-4 pt-4 space-y-2 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal</span><span>R$ {total.toFixed(2).replace(".", ",")}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Frete</span><span>{shipping ? `R$ ${shippingCost.toFixed(2).replace(".", ",")}` : "Selecione"}</span>
            </div>
          </div>
          <div className="border-t mt-4 pt-4 flex justify-between font-bold text-lg text-foreground">
            <span>Total</span><span className="text-primary">R$ {grandTotal.toFixed(2).replace(".", ",")}</span>
          </div>
          <Button
            size="lg"
            className="w-full mt-6 bg-accent text-accent-foreground hover:bg-accent/90 font-semibold"
            onClick={() => { clearCart(); setCompleted(true); }}
            disabled={!shipping}
          >
            Finalizar Pedido
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
