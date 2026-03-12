import { Link } from "react-router-dom";
import { Eye, MapPin, Phone, Mail, Clock, Instagram, Facebook } from "lucide-react";

const Footer = () => (
  <footer className="bg-[hsl(220,20%,8%)] text-white">
    {/* Main footer */}
    <div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[hsl(213,80%,45%)] to-[hsl(213,80%,30%)] flex items-center justify-center">
              <Eye className="h-5 w-5 text-white" />
            </div>
            <span className="font-display text-xl font-bold">Ótica Itamaraju</span>
          </div>
          <p className="text-sm text-white/50 leading-relaxed">
            Mais de 15 anos cuidando da sua visão com excelência, tecnologia e carinho. Referência no mercado óptico do sul da Bahia.
          </p>
          <div className="flex gap-3 mt-5">
            <div className="w-9 h-9 rounded-full bg-white/8 hover:bg-[hsl(213,80%,45%)] flex items-center justify-center transition-colors cursor-pointer">
              <Instagram className="h-4 w-4" />
            </div>
            <div className="w-9 h-9 rounded-full bg-white/8 hover:bg-[hsl(213,80%,45%)] flex items-center justify-center transition-colors cursor-pointer">
              <Facebook className="h-4 w-4" />
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="font-sans font-semibold mb-5 text-[hsl(45,95%,55%)] text-sm uppercase tracking-wider">Navegação</h4>
          <div className="flex flex-col gap-3 text-sm text-white/50">
            <Link to="/" className="hover:text-white transition-colors w-fit">Home</Link>
            <Link to="/lentes" className="hover:text-white transition-colors w-fit">Lentes</Link>
            <Link to="/armacoes" className="hover:text-white transition-colors w-fit">Armações</Link>
            <Link to="/logistica-reversa" className="hover:text-white transition-colors w-fit">Logística Reversa</Link>
          </div>
        </div>

        {/* Customer service */}
        <div>
          <h4 className="font-sans font-semibold mb-5 text-[hsl(45,95%,55%)] text-sm uppercase tracking-wider">Atendimento</h4>
          <div className="flex flex-col gap-3 text-sm text-white/50">
            <Link to="/minha-conta" className="hover:text-white transition-colors w-fit">Minha Conta</Link>
            <Link to="/carrinho" className="hover:text-white transition-colors w-fit">Carrinho</Link>
            <span className="hover:text-white transition-colors cursor-pointer w-fit">Trocas e Devoluções</span>
            <span className="hover:text-white transition-colors cursor-pointer w-fit">Perguntas Frequentes</span>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-sans font-semibold mb-5 text-[hsl(45,95%,55%)] text-sm uppercase tracking-wider">Contato</h4>
          <div className="flex flex-col gap-3.5 text-sm text-white/50">
            <div className="flex items-start gap-2.5">
              <MapPin className="h-4 w-4 shrink-0 mt-0.5 text-white/30" />
              <span>Av. Cinquentenário, 1200 - Centro<br />Itamaraju - BA, 45836-000</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 shrink-0 text-white/30" />
              <span>(73) 3281-0000</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 shrink-0 text-white/30" />
              <span>contato@oticaitamaraju.com.br</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Clock className="h-4 w-4 shrink-0 text-white/30" />
              <span>Seg-Sex 8h–18h | Sáb 8h–13h</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Bottom bar */}
    <div className="border-t border-white/8">
      <div className="container mx-auto px-4 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
        <p className="text-[12px] text-white/30">
          © 2026 Ótica Itamaraju. Todos os direitos reservados.
        </p>
        <p className="text-[12px] text-white/30">
          CNPJ: 00.000.000/0001-00
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
