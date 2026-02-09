import { Link } from "react-router-dom";
import { Eye, MapPin, Phone, Mail } from "lucide-react";

const Footer = () => (
  <footer className="bg-foreground text-primary-foreground mt-20">
    <div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Eye className="h-6 w-6 text-accent" />
            <span className="font-display text-lg font-bold">Ótica Itamaraju</span>
          </div>
          <p className="text-sm opacity-70">Sua visão merece precisão. Óculos feitos para o seu dia a dia com tecnologia, conforto e estilo.</p>
        </div>
        <div>
          <h4 className="font-sans font-semibold mb-4 text-accent">Navegação</h4>
          <div className="flex flex-col gap-2 text-sm opacity-70">
            <Link to="/" className="hover:opacity-100 transition-opacity">Home</Link>
            <Link to="/lentes" className="hover:opacity-100 transition-opacity">Lentes</Link>
            <Link to="/armacoes" className="hover:opacity-100 transition-opacity">Armações</Link>
            <Link to="/logistica-reversa" className="hover:opacity-100 transition-opacity">Logística Reversa</Link>
          </div>
        </div>
        <div>
          <h4 className="font-sans font-semibold mb-4 text-accent">Atendimento</h4>
          <div className="flex flex-col gap-2 text-sm opacity-70">
            <Link to="/minha-conta" className="hover:opacity-100 transition-opacity">Minha Conta</Link>
            <Link to="/carrinho" className="hover:opacity-100 transition-opacity">Carrinho</Link>
            <span>Trocas e Devoluções</span>
            <span>Perguntas Frequentes</span>
          </div>
        </div>
        <div>
          <h4 className="font-sans font-semibold mb-4 text-accent">Contato</h4>
          <div className="flex flex-col gap-3 text-sm opacity-70">
            <div className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Itamaraju - BA, 45836-000</div>
            <div className="flex items-center gap-2"><Phone className="h-4 w-4" /> (73) 3281-0000</div>
            <div className="flex items-center gap-2"><Mail className="h-4 w-4" /> contato@oticaitamaraju.com.br</div>
          </div>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10 mt-10 pt-6 text-center text-sm opacity-50">
        © 2026 Ótica Itamaraju. Todos os direitos reservados.
      </div>
    </div>
  </footer>
);

export default Footer;
