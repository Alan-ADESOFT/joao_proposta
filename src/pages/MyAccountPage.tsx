import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Package, User, MapPin, LogIn } from "lucide-react";

const mockOrders = [
  { id: "#12345", date: "02/02/2026", total: "R$ 539,80", status: "Pedido Entregue", statusColor: "bg-green-100 text-green-700" },
  { id: "#12344", date: "28/01/2026", total: "R$ 349,90", status: "Pedido Enviado", statusColor: "bg-blue-100 text-blue-700" },
  { id: "#12343", date: "20/01/2026", total: "R$ 279,90", status: "Em Logística Reversa", statusColor: "bg-amber-100 text-amber-700" },
  { id: "#12342", date: "10/01/2026", total: "R$ 489,90", status: "Pedido em Separação", statusColor: "bg-muted text-muted-foreground" },
];

const MyAccountPage = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [tab, setTab] = useState<"orders" | "profile">("orders");

  if (!loggedIn) {
    return (
      <div className="container mx-auto px-4 py-20 max-w-md">
        <div className="bg-card rounded-lg p-8 card-shadow text-center">
          <LogIn className="h-12 w-12 text-primary mx-auto mb-4" />
          <h1 className="font-display text-2xl font-bold text-foreground">Acesse sua Conta</h1>
          <p className="text-muted-foreground text-sm mt-2">Login fictício — clique em Entrar para acessar.</p>
          <div className="mt-6 space-y-4 text-left">
            <div><Label>E-mail</Label><Input placeholder="maria@email.com" className="mt-1" /></div>
            <div><Label>Senha</Label><Input type="password" placeholder="••••••••" className="mt-1" /></div>
          </div>
          <Button className="w-full mt-6 font-semibold" onClick={() => setLoggedIn(true)}>Entrar</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="font-display text-3xl font-bold text-foreground mb-2">Minha Conta</h1>
      <p className="text-muted-foreground mb-8">Bem-vindo(a), Maria Silva!</p>

      <div className="flex gap-2 mb-8">
        <Button variant={tab === "orders" ? "default" : "outline"} onClick={() => setTab("orders")} className="gap-2">
          <Package className="h-4 w-4" /> Meus Pedidos
        </Button>
        <Button variant={tab === "profile" ? "default" : "outline"} onClick={() => setTab("profile")} className="gap-2">
          <User className="h-4 w-4" /> Meus Dados
        </Button>
      </div>

      {tab === "orders" && (
        <div className="space-y-4">
          {mockOrders.map((o) => (
            <div key={o.id} className="bg-card rounded-lg p-6 card-shadow flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="font-semibold text-foreground">Pedido {o.id}</span>
                <p className="text-sm text-muted-foreground">{o.date} · {o.total}</p>
              </div>
              <span className={`text-xs font-medium px-3 py-1 rounded-full ${o.statusColor}`}>{o.status}</span>
            </div>
          ))}
        </div>
      )}

      {tab === "profile" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-card rounded-lg p-6 card-shadow">
            <h3 className="font-sans font-semibold text-lg text-foreground mb-4 flex items-center gap-2"><User className="h-5 w-5 text-primary" /> Dados Pessoais</h3>
            <div className="space-y-4">
              <div><Label>Nome Completo</Label><Input defaultValue="Maria Silva" className="mt-1" /></div>
              <div><Label>E-mail</Label><Input defaultValue="maria@email.com" className="mt-1" /></div>
              <div><Label>Telefone</Label><Input defaultValue="(73) 99999-0000" className="mt-1" /></div>
            </div>
            <Button className="mt-4" size="sm">Salvar Alterações</Button>
          </div>
          <div className="bg-card rounded-lg p-6 card-shadow">
            <h3 className="font-sans font-semibold text-lg text-foreground mb-4 flex items-center gap-2"><MapPin className="h-5 w-5 text-primary" /> Endereço</h3>
            <div className="space-y-4">
              <div><Label>CEP</Label><Input defaultValue="45990-000" className="mt-1" /></div>
              <div><Label>Rua</Label><Input defaultValue="Rua Principal, 123" className="mt-1" /></div>
              <div><Label>Bairro</Label><Input defaultValue="Centro" className="mt-1" /></div>
              <div><Label>Cidade</Label><Input defaultValue="Itamaraju - BA" className="mt-1" /></div>
            </div>
            <Button className="mt-4" size="sm">Salvar Endereço</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAccountPage;
