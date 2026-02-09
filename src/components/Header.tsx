import { Link } from "react-router-dom";
import { ShoppingCart, User, Menu, X } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useState } from "react";
import logo from "@/assets/logo-otica.png";

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
    <header className="sticky top-0 z-50 bg-[hsl(213,80%,20%)] shadow-lg">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Ótica Itamaraju" className="h-10 w-auto" />
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((l) => (
            <Link key={l.to} to={l.to} className="text-sm font-medium text-white/80 hover:text-white transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <Link to="/minha-conta" className="p-2 rounded-full hover:bg-white/10 transition-colors" aria-label="Minha Conta">
            <User className="h-5 w-5 text-white/80" />
          </Link>
          <Link to="/carrinho" className="relative p-2 rounded-full hover:bg-white/10 transition-colors" aria-label="Carrinho">
            <ShoppingCart className="h-5 w-5 text-white/80" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>
          <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
            {mobileOpen ? <X className="h-5 w-5 text-white" /> : <Menu className="h-5 w-5 text-white" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-[hsl(213,80%,18%)] border-t border-white/10 pb-4 px-4">
          {navLinks.map((l) => (
            <Link key={l.to} to={l.to} onClick={() => setMobileOpen(false)} className="block py-3 text-sm font-medium text-white/80 hover:text-white transition-colors">
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
