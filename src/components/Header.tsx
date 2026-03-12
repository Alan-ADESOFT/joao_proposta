import { Link } from "react-router-dom";
import { ShoppingCart, User, Menu, X, Phone } from "lucide-react";
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
    <>
      {/* Top bar */}
      <div className="bg-[hsl(213,80%,15%)] text-white/60 text-[11px] py-1.5 hidden md:block">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <span>Seg-Sex 8h–18h | Sáb 8h–13h</span>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1"><Phone className="h-3 w-3" /> (73) 3281-0000</span>
            <span>Av. Cinquentenário, 1200 - Itamaraju/BA</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header className="sticky top-0 z-50 bg-[hsl(213,80%,20%)] shadow-lg shadow-black/10">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Ótica Itamaraju" className="h-10 w-auto" />
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="text-sm font-medium text-white/70 hover:text-white px-3.5 py-2 rounded-lg hover:bg-white/8 transition-all"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <Link to="/minha-conta" className="p-2.5 rounded-full hover:bg-white/10 transition-colors" aria-label="Minha Conta">
              <User className="h-5 w-5 text-white/70" />
            </Link>
            <Link to="/carrinho" className="relative p-2.5 rounded-full hover:bg-white/10 transition-colors" aria-label="Carrinho">
              <ShoppingCart className="h-5 w-5 text-white/70" />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[hsl(45,95%,55%)] text-[hsl(220,20%,10%)] text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-sm">
                  {itemCount}
                </span>
              )}
            </Link>
            <button className="md:hidden p-2.5" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
              {mobileOpen ? <X className="h-5 w-5 text-white" /> : <Menu className="h-5 w-5 text-white" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden bg-[hsl(213,80%,18%)] border-t border-white/10 pb-4 px-4">
            {navLinks.map((l) => (
              <Link key={l.to} to={l.to} onClick={() => setMobileOpen(false)} className="block py-3 text-sm font-medium text-white/80 hover:text-white transition-colors border-b border-white/5 last:border-0">
                {l.label}
              </Link>
            ))}
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
