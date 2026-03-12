import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { MessageCircle, Settings, ShieldCheck, Zap, Bot, ArrowRight, Info, Sparkles, Server, Cpu, Binary, CircuitBoard } from "lucide-react";

// FadeIn Component for scroll effects
const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    const currentRef = domRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// Floating particle
const Particle = ({ delay, size, left, duration }: { delay: number; size: number; left: string; duration: number }) => (
  <div
    className="absolute rounded-full bg-[hsl(213,80%,55%)] animate-float pointer-events-none"
    style={{
      width: size,
      height: size,
      left,
      top: `${20 + Math.random() * 60}%`,
      animationDelay: `${delay}s`,
      animationDuration: `${duration}s`,
      opacity: 0.15 + Math.random() * 0.2,
    }}
  />
);

// Typing text effect
const TypeWriter = ({ text, className = "" }: { text: string; className?: string }) => {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        setDone(true);
        clearInterval(interval);
      }
    }, 40);
    return () => clearInterval(interval);
  }, [text]);

  return (
    <span className={className}>
      {displayed}
      {!done && <span className="inline-block w-[2px] h-[1em] bg-[hsl(213,80%,55%)] ml-0.5 animate-pulse align-middle" />}
    </span>
  );
};

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[hsl(220,20%,8%)] text-white selection:bg-[hsl(45,95%,55%)] selection:text-[hsl(220,20%,10%)] flex flex-col" style={{ fontFamily: "'Poppins', sans-serif" }}>
      {/* Background Glows + Tech Grid */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[hsl(213,80%,30%)] rounded-full blur-[150px] opacity-20"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[40%] bg-[hsl(45,95%,55%)] rounded-full blur-[150px] opacity-[0.05]"></div>
        <div className="absolute inset-0 tech-grid" />
        {/* Floating particles */}
        <Particle delay={0} size={4} left="10%" duration={7} />
        <Particle delay={1.5} size={3} left="25%" duration={8} />
        <Particle delay={3} size={5} left="45%" duration={6} />
        <Particle delay={0.5} size={3} left="65%" duration={9} />
        <Particle delay={2} size={4} left="80%" duration={7} />
        <Particle delay={4} size={3} left="90%" duration={8} />
        <Particle delay={1} size={6} left="55%" duration={10} />
        <Particle delay={2.5} size={3} left="35%" duration={7} />
      </div>

      {/* Scan line overlay */}
      <div className="fixed inset-0 scan-line pointer-events-none z-[1] overflow-hidden" />

      {/* Notice Banner */}
      <div className="relative z-[60] bg-amber-500/10 border-b border-amber-500/20 text-amber-200/90 px-4 py-2 sm:py-3 text-[11px] sm:text-xs flex items-center justify-center gap-3 text-center backdrop-blur-md">
        <Info className="w-4 h-4 shrink-0 text-amber-400" />
        <p>
          <strong className="text-amber-400 font-semibold uppercase tracking-wider">Ambiente de Demonstracao:</strong> Este assistente e um modelo de prova de conceito. A pagina demonstra a arquitetura tecnologica e a experiencia do FLOW-1 em acao.
        </p>
      </div>

      {/* Header */}
      <header className="relative z-50 border-b border-white/5 bg-[hsl(220,20%,8%)]/80 backdrop-blur-md">
        <div className="container mx-auto max-w-5xl flex items-center justify-between h-16 sm:h-20 px-6 lg:px-8">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-white flex items-center justify-center p-2 shadow-[0_0_25px_rgba(255,255,255,0.08)] animate-pulse-glow transition-all duration-300 hover:scale-105">
              <img src="/logo.png" alt="Otica Itamaraju" className="w-full h-full object-contain" />
            </div>
            <div className="hidden sm:block">
              <span className="font-bold text-xl tracking-tight block">Otica Itamaraju</span>
              <span className="text-[10px] text-[hsl(213,80%,55%)] font-medium tracking-widest uppercase">Powered by FLOW TECH</span>
            </div>
          </div>
          <Link
            to="/admin"
            className="group flex items-center gap-2 text-white/60 hover:text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-white/5 transition-all border border-white/5 hover:border-white/15"
          >
            <Settings className="w-4 h-4 group-hover:rotate-90 transition-transform duration-500" />
            <span>Painel de Controle</span>
          </Link>
        </div>
      </header>

      {/* Main Content Memo Style */}
      <main className="relative z-10 flex-1 container mx-auto max-w-3xl px-6 py-12 sm:py-20 lg:py-24 animate-in fade-in slide-in-from-bottom-8 duration-700">

        {/* Memo Header */}
        <FadeIn className="mb-12 pb-8 border-b border-white/10">
          <div className="inline-flex items-center gap-2 bg-[hsl(45,95%,55%)]/10 text-[hsl(45,95%,55%)] border border-[hsl(45,95%,55%)]/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
            <ShieldCheck className="w-3.5 h-3.5" /> Proposta Estrategica
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight mb-4">
            A Arquitetura da Lideranca:<br/>
            <span className="bg-gradient-to-r from-[hsl(213,80%,55%)] via-[hsl(213,80%,75%)] to-[hsl(213,80%,55%)] bg-clip-text text-transparent animate-text-shimmer font-normal">
              Otica Itamaraju no Topo do Mercado
            </span>
          </h1>
          <p className="text-white/50 text-sm mb-8 flex items-center gap-2">
            <Cpu className="w-4 h-4 text-[hsl(213,80%,55%)]" />
            <TypeWriter text="Sistema de inteligencia artificial pronto para operar..." />
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center mb-10">
            <button
              onClick={() => {
                const btn = document.querySelector('[aria-label="Abrir chat"]') as HTMLButtonElement;
                btn?.click();
              }}
              className="group inline-flex items-center justify-center gap-2 bg-white text-[hsl(220,20%,10%)] font-bold px-6 py-3.5 rounded-lg text-sm hover:bg-gray-200 transition-all w-full sm:w-auto shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] hover:-translate-y-1 active:translate-y-0"
            >
              <Bot className="w-5 h-5 group-hover:animate-bounce" />
              Testar Assistente Demonstrativo
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm bg-white/5 p-4 rounded-xl border border-white/5 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[hsl(213,80%,45%)]/5 to-transparent pointer-events-none" />
            <div className="relative z-10">
              <span className="text-white/40 block mb-1">Para</span>
              <strong className="text-white">Joao - Otica Itamaraju</strong>
            </div>
            <div className="relative z-10">
              <span className="text-white/40 block mb-1">De</span>
              <strong className="text-[hsl(45,95%,55%)]">Brenno Fialho - FLOW TECH</strong>
            </div>
          </div>
        </FadeIn>

        {/* Copywriting Body */}
        <div className="prose prose-invert prose-lg max-w-none text-white/80 leading-relaxed font-light mb-16">
          <FadeIn delay={100}>
            <p className="font-medium text-white text-xl">Joao, o topo nao e um lugar para todos.</p>
          </FadeIn>

          <FadeIn delay={200}>
            <p>
              Muitos empresarios se contentam em ter uma "loja que vende". Mas voce e eu sabemos que a <strong className="text-white font-medium">Otica Itamaraju</strong> nao nasceu para ser apenas mais uma. Ela nasceu para dominar a regiao, ser a referencia em tecnologia e atendimento, e construir um legado que transborda confianca.
            </p>

            <p>
              O e-commerce que voce construiu foi a fundacao. Agora, precisamos da <strong className="text-white">Estrutura de Elite</strong> que suporte essa ambicao sem falhas.
            </p>
          </FadeIn>

          <FadeIn>
            <h3 className="text-white font-bold text-2xl mt-16 mb-6 flex items-center gap-3">
              <Zap className="w-6 h-6 text-[hsl(45,95%,55%)] drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]" /> O Fim do Teto de Crescimento
            </h3>

            <p>
              Hoje, o seu maior gargalo nao e o produto, mas a friccao humana. Depender exclusivamente de vendedores para o primeiro contato digital e limitar o seu teto de vendas ao horario comercial e ao humor de uma equipe.
            </p>

            <p className="text-xl italic border-l-2 border-[hsl(213,80%,55%)] pl-6 my-10 text-white/90 font-serif relative">
              <span className="absolute -left-1 top-0 w-2 h-full bg-gradient-to-b from-[hsl(213,80%,55%)] to-transparent opacity-30 blur-sm" />
              "Lideres de mercado nao 'atendem' clientes; eles orquestram experiencias impecaveis."
            </p>

            <p>
              Apresento a <strong className="text-white font-semibold">Celula de Inteligencia FLOW-1</strong>: a unica estrutura tatica capaz de manter a Itamaraju operando com precisao cirurgica 24/7.
            </p>
          </FadeIn>

          <FadeIn>
            <h3 className="text-white font-bold text-2xl mt-16 mb-6 flex items-center gap-3">
              <CircuitBoard className="w-6 h-6 text-[hsl(213,80%,55%)] drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]" /> A Engenharia da Superioridade
            </h3>
            <p>
              A Celula FLOW-1 nao e um "bot de atendimento". E o cerebro digital da sua empresa, projetado com tres camadas de dominancia:
            </p>

            <ul className="space-y-4 my-8 list-none pl-0">
              <li className="group flex items-start gap-4 bg-white/5 hover:bg-white/10 transition-all duration-500 p-5 rounded-xl border border-white/5 hover:border-[hsl(213,80%,45%)]/30 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-[hsl(213,80%,45%)]/0 to-[hsl(213,80%,45%)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <span className="relative z-10 flex-shrink-0 w-8 h-8 rounded-full bg-[hsl(213,80%,45%)]/20 text-[hsl(213,80%,55%)] flex items-center justify-center font-bold text-sm mt-0.5 group-hover:scale-110 transition-transform">1</span>
                <div className="relative z-10">
                  <strong className="text-white block mb-1">Onipresenca Instantanea</strong>
                  <span className="text-sm text-white/70">No site e no WhatsApp, o cliente recebe a resposta exata no milissegundo em que o desejo de compra surge. E a cura para a ansiedade do consumidor moderno.</span>
                </div>
              </li>
              <li className="group flex items-start gap-4 bg-white/5 hover:bg-white/10 transition-all duration-500 p-5 rounded-xl border border-white/5 hover:border-[hsl(45,95%,55%)]/30 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-[hsl(45,95%,55%)]/0 to-[hsl(45,95%,55%)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <span className="relative z-10 flex-shrink-0 w-8 h-8 rounded-full bg-[hsl(45,95%,55%)]/20 text-[hsl(45,95%,55%)] flex items-center justify-center font-bold text-sm mt-0.5 group-hover:scale-110 transition-transform">2</span>
                <div className="relative z-10">
                  <strong className="text-white block mb-1">Mecanismo Unico de Reconhecimento</strong>
                  <span className="text-sm text-white/70">O sistema nao apenas responde, ele vende. Ele identifica necessidades, filtra o estoque e conduz o fechamento de forma autonoma.</span>
                </div>
              </li>
              <li className="group flex items-start gap-4 bg-white/5 hover:bg-white/10 transition-all duration-500 p-5 rounded-xl border border-white/5 hover:border-emerald-500/30 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <span className="relative z-10 flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm mt-0.5 group-hover:scale-110 transition-transform">3</span>
                <div className="relative z-10">
                  <strong className="text-white block mb-1">Comando Centralizado</strong>
                  <span className="text-sm text-white/70">Atraves do nosso Painel de Gestao, voce assume a posicao de General da operacao. Monitora os avancos e ve a empresa crescer sem aumentar a folha de pagamento.</span>
                </div>
              </li>
            </ul>
          </FadeIn>

          <FadeIn>
            <h3 className="text-white font-bold text-2xl mt-16 mb-6 flex items-center gap-3">
              <Server className="w-6 h-6 text-gray-400" /> Infraestrutura e Setup
            </h3>
            <p>
              Trabalhar com a FLOW TECH e uma decisao tatica de faturamento. Estamos substituindo custos variaveis e imprevisiveis por uma estrutura fixa, escalavel e de alta performance.
            </p>

            <div className="bg-gradient-to-br from-[hsl(220,20%,10%)] to-[hsl(220,20%,12%)] p-6 sm:p-8 rounded-2xl border border-white/10 my-8 shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-[hsl(213,80%,45%)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[hsl(213,80%,45%)]/30 to-transparent" />
              <h4 className="text-gray-400 font-semibold mb-6 flex items-center gap-2 text-sm uppercase tracking-widest relative z-10">
                <Binary className="w-4 h-4 text-[hsl(213,80%,55%)]" /> Custos de Implementacao
              </h4>
              <ul className="space-y-4 text-sm relative z-10">
                <li className="flex justify-between items-center border-b border-white/5 pb-3">
                  <span className="text-white/70">Setup Inicial e Engenharia FLOW-1</span>
                  <span className="font-mono text-white text-base">R$ 2.500</span>
                </li>
                <li className="flex justify-between items-center pb-2">
                  <span className="text-white/70">Infraestrutura Cloud Elite (Servidores AWS)</span>
                  <span className="font-mono text-white text-base">R$ 90<span className="text-xs text-white/40 ml-1">/mes</span></span>
                </li>
              </ul>
            </div>
          </FadeIn>

          <FadeIn delay={200}>
            <div className="bg-gradient-to-br from-[hsl(213,80%,20%)] to-[hsl(220,20%,12%)] p-6 sm:p-8 rounded-2xl border border-[hsl(213,80%,35%)] my-8 shadow-[0_0_30px_hsl(213_80%_45%/0.1)] relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[hsl(213,80%,55%)]/40 to-transparent" />
              <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-[hsl(213,80%,45%)] rounded-full blur-[80px] opacity-10 pointer-events-none" />
              <h4 className="text-[hsl(45,95%,55%)] font-semibold mb-6 flex items-center gap-2 text-sm uppercase tracking-widest">
                 Licenca de Operacao
              </h4>
              <ul className="space-y-4 mb-2 text-sm">
                <li className="flex justify-between items-center pb-2">
                  <span className="text-white/90 font-medium">Licenca Celula de Inteligencia FLOW-1</span>
                  <span className="font-mono text-white text-base">R$ 600<span className="text-xs text-white/40 ml-1">/mes</span></span>
                </li>
              </ul>
            </div>
          </FadeIn>

          <FadeIn delay={400}>
            <div className="bg-[hsl(45,95%,55%)]/10 border border-[hsl(45,95%,55%)]/30 p-6 sm:p-8 rounded-2xl my-10 relative overflow-hidden">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-[hsl(45,95%,55%)] rounded-full blur-[80px] opacity-20 pointer-events-none"></div>
              <strong className="flex items-center gap-2 text-[hsl(45,95%,55%)] mb-4 font-bold uppercase tracking-wide text-xs">
                 <Sparkles className="w-4 h-4" /> A Decisao Estrategica do Combo (Oferta)
              </strong>
              <p className="text-base text-white/90 leading-relaxed">
                Pela confianca na sua visao, unificamos a gestao do seu sistema atual com a nova Celula FLOW-1. O investimento mensal total para sustentar todo o seu ecossistema digital sera congelado em <strong className="text-white text-xl ml-1">R$ 900 /mes</strong>.
              </p>
              <div className="mt-6 pt-6 border-t border-[hsl(45,95%,55%)]/20">
                <p className="text-sm font-semibold text-white mb-3">Bonus Exclusivos de Ativacao:</p>
                <ul className="space-y-3 text-sm text-[hsl(45,95%,65%)]/80">
                  <li className="flex items-start gap-2.5">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[hsl(45,95%,55%)] shrink-0 shadow-[0_0_8px_hsl(45,95%,55%)]"></span>
                    <span>Uma economia garantida de <strong>R$ 2.400 ao ano</strong>, liberando caixa para reinvestir em expansao da marca.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[hsl(45,95%,55%)] shrink-0 shadow-[0_0_8px_hsl(45,95%,55%)]"></span>
                    <span><strong className="text-[hsl(45,95%,55%)]">Creditos Iniciais:</strong> Ativaremos sua operacao inicial com creditos de IA de elite para os primeiros 60 atendimentos.</span>
                  </li>
                </ul>
              </div>
            </div>
          </FadeIn>

          <FadeIn>
            <hr className="border-white/10 my-10" />

            <p className="text-xl font-medium text-white mb-2">
              Joao, voce ja provou que tem a coragem para chegar ate aqui.
            </p>
            <p className="mb-10 text-white/70">
              A pergunta agora nao e se o sistema funciona, mas como a Otica Itamaraju vai lidar com o volume de vendas que essa nova escala vai gerar. A estrutura esta pronta. A estrategia esta tracada. O topo te espera.
            </p>
          </FadeIn>
        </div>

        <FadeIn delay={200}>
          {/* CTA Area */}
          <div className="bg-white/5 border border-white/10 p-8 sm:p-12 rounded-3xl text-center shadow-2xl backdrop-blur-sm relative overflow-hidden group mt-10">
            <div className="absolute inset-0 bg-gradient-to-r from-[hsl(213,80%,45%)]/0 via-[hsl(213,80%,45%)]/10 to-[hsl(213,80%,45%)]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"></div>
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

            <div className="flex justify-center mb-6 relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[hsl(213,80%,45%)] to-[hsl(213,80%,30%)] flex items-center justify-center animate-pulse-glow">
                <Cpu className="w-8 h-8 text-white" />
              </div>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 relative z-10 tracking-tight">Como prefere dar a ordem de inicio?</h2>
            <p className="text-white/60 text-sm mb-10 max-w-md mx-auto relative z-10 leading-relaxed">
              Inicie a interface demonstrativa agora e teste o motor logico que vai escalar o seu negocio.
            </p>

            <button
              onClick={() => {
                const btn = document.querySelector('[aria-label="Abrir chat"]') as HTMLButtonElement;
                btn?.click();
              }}
              className="group/btn relative z-10 inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[hsl(213,80%,45%)] to-[hsl(213,80%,55%)] animate-gradient-shift text-white font-bold px-8 py-4 sm:py-5 rounded-xl text-base hover:brightness-110 transition-all shadow-[0_0_30px_hsl(213_80%_45%/0.4)] hover:shadow-[0_0_50px_hsl(213_80%_45%/0.6)] hover:-translate-y-1 active:translate-y-0 w-full sm:w-auto"
            >
              <MessageCircle className="w-6 h-6 group-hover/btn:rotate-12 transition-transform" />
              Testar Celula FLOW-1
              <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>
        </FadeIn>

      </main>

    </div>
  );
};

export default LandingPage;
