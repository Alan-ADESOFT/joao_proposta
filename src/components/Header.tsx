import { Link } from "react-router-dom";
import { ShoppingCart, User, Menu, X, Eye } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useState } from "react";

const Header = () => {
  const { itemCount } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/lentes", label: "Lentes" },
    { to: "/armacoes", label: "Armações" },
    { to: "/logistica-reversa", label: "Logística Reversa" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2">
          <Eye className="h-7 w-7 text-primary" />
          <span className="font-display text-xl font-bold text-foreground">Ótica Itamaraju</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <Link key={l.to} to={l.to} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link to="/minha-conta" className="p-2 rounded-full hover:bg-secondary transition-colors" aria-label="Minha Conta">
            <User className="h-5 w-5 text-muted-foreground" />
          </Link>
          <Link to="/carrinho" className="relative p-2 rounded-full hover:bg-secondary transition-colors" aria-label="Carrinho">
            <ShoppingCart className="h-5 w-5 text-muted-foreground" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>
          <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-background border-b pb-4 px-4">
          {navLinks.map((l) => (
            <Link key={l.to} to={l.to} onClick={() => setMobileOpen(false)} className="block py-3 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
