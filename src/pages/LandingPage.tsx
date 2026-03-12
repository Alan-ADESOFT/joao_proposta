import { Link } from "react-router-dom";
import {
  Eye, MessageCircle, Bot, ShieldCheck, Zap, Smartphone,
  ArrowRight, MapPin, Phone, Mail, Clock, Settings,
} from "lucide-react";
import logo from "@/assets/logo-otica.png";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[hsl(213,80%,20%)] shadow-lg shadow-black/10">
        <div className="container mx-auto flex items-center justify-between h-14 sm:h-16 px-4">
          <div className="flex items-center gap-2">
            <img src={logo} alt="Ótica Itamaraju" className="h-8 sm:h-10 w-auto" />
          </div>
          <Link
            to="/admin"
            className="flex items-center gap-2 text-white/70 hover:text-white text-sm font-medium px-3 py-2 rounded-lg hover:bg-white/10 transition-all"
          >
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">Painel Admin</span>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[hsl(213,80%,15%)] via-[hsl(213,80%,22%)] to-[hsl(213,80%,30%)] text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[hsl(45,95%,55%)] rounded-full blur-[120px]" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-[hsl(213,80%,55%)] rounded-full blur-[150px]" />
        </div>
        <div className="relative container mx-auto px-4 py-16 sm:py-24 lg:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Bot className="w-4 h-4 text-[hsl(45,95%,55%)]" />
              <span className="text-sm font-medium text-white/80">Assistente Virtual com IA</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-[1.1]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Conheça a <span className="text-[hsl(45,95%,55%)]">Luna</span> 🌙
            </h1>
            <p className="mt-5 sm:mt-6 text-base sm:text-lg lg:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
              A assistente virtual inteligente da <strong className="text-white">Ótica Itamaraju</strong>.
              Tire dúvidas sobre produtos, preços, frete e muito mais — tudo em tempo real!
            </p>
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => {
                  const btn = document.querySelector('[aria-label="Abrir chat"]') as HTMLButtonElement;
                  btn?.click();
                }}
                className="inline-flex items-center justify-center gap-2 bg-[hsl(45,95%,55%)] text-[hsl(220,20%,10%)] font-semibold px-8 py-4 rounded-xl text-base hover:bg-[hsl(45,95%,50%)] transition-all shadow-lg shadow-[hsl(45,95%,55%)]/25 hover:scale-105 active:scale-100"
              >
                <MessageCircle className="w-5 h-5" />
                Testar a Luna Agora
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 sm:mb-16">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-[hsl(213,80%,45%)] bg-[hsl(213,80%,45%)]/8 px-4 py-1.5 rounded-full mb-4">
              Funcionalidades
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900" style={{ fontFamily: "'Playfair Display', serif" }}>
              O que a Luna pode fazer?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 max-w-5xl mx-auto">
            {[
              { icon: Eye, title: "Catálogo Completo", desc: "Informações detalhadas sobre lentes, armações, preços e variações disponíveis." },
              { icon: Zap, title: "Respostas Instantâneas", desc: "Atendimento 24h com respostas rápidas e precisas sobre produtos e serviços." },
              { icon: ShieldCheck, title: "Cálculo de Frete", desc: "Calcule o frete em tempo real informando seu CEP — com PAC, SEDEX e frete grátis." },
              { icon: MessageCircle, title: "Atendimento Humano", desc: "Quando necessário, a Luna transfere para um atendente real via WhatsApp." },
              { icon: Smartphone, title: "100% Responsivo", desc: "Funciona perfeitamente em celulares, tablets e desktops." },
              { icon: Bot, title: "IA Inteligente", desc: "Powered by OpenAI — entende contexto, responde naturalmente e só fala sobre a ótica." },
            ].map((f) => (
              <div key={f.title} className="p-6 sm:p-8 rounded-2xl bg-gray-50 border border-gray-100 hover:border-[hsl(213,80%,80%)] hover:shadow-lg transition-all duration-300 group">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[hsl(213,80%,45%)]/10 to-[hsl(213,80%,45%)]/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <f.icon className="w-6 h-6 text-[hsl(213,80%,45%)]" />
                </div>
                <h3 className="font-semibold text-gray-900 text-base sm:text-lg">{f.title}</h3>
                <p className="text-sm text-gray-500 mt-2 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-[hsl(213,80%,22%)] to-[hsl(213,80%,32%)]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
            Experimente agora mesmo!
          </h2>
          <p className="mt-4 text-white/60 text-base sm:text-lg max-w-xl mx-auto">
            Clique na bolinha azul no canto inferior direito e converse com a Luna.
          </p>
          <div className="mt-8 flex items-center justify-center gap-2 text-white/40 text-sm">
            <ArrowRight className="w-4 h-4 animate-bounce" />
            <span>O chat está ali embaixo à direita</span>
          </div>
        </div>
      </section>

      {/* Footer mini */}
      <footer className="bg-[hsl(220,20%,8%)] text-white/40 py-8 sm:py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[hsl(213,80%,45%)] to-[hsl(213,80%,30%)] flex items-center justify-center">
                <Eye className="h-4 w-4 text-white" />
              </div>
              <span className="font-semibold text-white/70 text-sm">Ótica Itamaraju</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs">
              <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> Itamaraju - BA</span>
              <span className="flex items-center gap-1"><Phone className="h-3 w-3" /> (73) 3281-0000</span>
              <span className="flex items-center gap-1"><Mail className="h-3 w-3" /> contato@oticaitamaraju.com.br</span>
              <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> Seg-Sex 8h–18h</span>
            </div>
          </div>
          <div className="text-center mt-6 pt-6 border-t border-white/5 text-[11px]">
            © 2026 Ótica Itamaraju — Demonstração do assistente virtual Luna 🌙
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
