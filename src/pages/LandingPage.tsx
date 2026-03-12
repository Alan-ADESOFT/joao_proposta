import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { MessageCircle, Settings, ShieldCheck, Zap, Bot, ArrowRight, Eye, Info, Sparkles, Server } from "lucide-react";

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

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[hsl(220,20%,8%)] text-white selection:bg-[hsl(45,95%,55%)] selection:text-[hsl(220,20%,10%)] flex flex-col" style={{ fontFamily: "'Poppins', sans-serif" }}>
      {/* Background Glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[hsl(213,80%,30%)] rounded-full blur-[150px] opacity-20"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[40%] bg-[hsl(45,95%,55%)] rounded-full blur-[150px] opacity-[0.05]"></div>
      </div>

      {/* Notice Banner */}
      <div className="relative z-[60] bg-amber-500/10 border-b border-amber-500/20 text-amber-200/90 px-4 py-2 sm:py-3 text-[11px] sm:text-xs flex items-center justify-center gap-3 text-center backdrop-blur-md">
        <Info className="w-4 h-4 shrink-0 text-amber-400" />
        <p>
          <strong className="text-amber-400 font-semibold uppercase tracking-wider">Ambiente de Teste:</strong> O assistente apresentado aqui é um modelo de prova de conceito. Não foi treinado a fundo com as informações reais ou catálogo. Construímos esta página para demonstrar a arquitetura tecnológica e a experiência do FLOW-1 em ação.
        </p>
      </div>

      {/* Header */}
      <header className="relative z-50 border-b border-white/5 bg-[hsl(220,20%,8%)]/80 backdrop-blur-md">
        <div className="container mx-auto max-w-5xl flex items-center justify-between h-16 sm:h-20 px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center p-1.5 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
              <img src="/logo.png" alt="Ótica Itamaraju" className="w-full h-full object-contain" />
            </div>
            <span className="font-bold text-lg tracking-tight hidden sm:block">Ótica Itamaraju</span>
          </div>
          <Link
            to="/admin"
            className="group flex items-center gap-2 text-white/60 hover:text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-white/5 transition-all"
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
            <ShieldCheck className="w-3.5 h-3.5" /> Proposta Estratégica
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight mb-8">
            A Arquitetura da Liderança:<br/>
            <span className="text-[hsl(213,80%,65%)] font-normal">Ótica Itamaraju no Topo do Mercado</span>
          </h1>
          
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center mb-10">
            <button
              onClick={() => {
                const btn = document.querySelector('[aria-label="Abrir chat"]') as HTMLButtonElement;
                btn?.click();
              }}
              className="inline-flex items-center justify-center gap-2 bg-white text-[hsl(220,20%,10%)] font-bold px-6 py-3 rounded-lg text-sm hover:bg-gray-200 transition-all w-full sm:w-auto shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] hover:-translate-y-0.5"
            >
              <Bot className="w-4 h-4" />
              Testar Assistente Demonstrativo
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm bg-white/5 p-4 rounded-xl border border-white/5">
            <div>
              <span className="text-white/40 block mb-1">Para</span>
              <strong className="text-white">João - Ótica Itamaraju</strong>
            </div>
            <div>
              <span className="text-white/40 block mb-1">De</span>
              <strong className="text-[hsl(45,95%,55%)]">Brenno Fialho - FLOW TECH</strong>
            </div>
          </div>
        </FadeIn>

        {/* Copywriting Body */}
        <div className="prose prose-invert prose-lg max-w-none text-white/80 leading-relaxed font-light mb-16">
          <FadeIn delay={100}>
            <p className="font-medium text-white text-xl">João, o topo não é um lugar para todos.</p>
          
          </FadeIn>

          <FadeIn delay={200}>
            <p>
              Muitos empresários se contentam em ter uma "loja que vende". Mas você e eu sabemos que a <strong className="text-white font-medium">Ótica Itamaraju</strong> não nasceu para ser apenas mais uma. Ela nasceu para dominar a região, ser a referência em tecnologia e atendimento, e construir um legado que transborda confiança.
            </p>

            <p>
              O e-commerce que você construiu foi a fundação. Agora, precisamos da <strong className="text-white">Estrutura de Elite</strong> que suporte essa ambição sem falhas.
            </p>
          </FadeIn>

          <FadeIn>
            <h3 className="text-white font-bold text-2xl mt-16 mb-6 flex items-center gap-3">
              <Zap className="w-6 h-6 text-[hsl(45,95%,55%)] drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]" /> O Fim do Teto de Crescimento
            </h3>

            <p>
              Hoje, o seu maior gargalo não é o produto, mas a fricção humana. Depender exclusivamente de vendedores para o primeiro contato digital é limitar o seu teto de vendas ao horário comercial e ao humor de uma equipe.
            </p>

            <p className="text-xl italic border-l-2 border-[hsl(213,80%,55%)] pl-6 my-10 text-white/90 font-serif">
              "Líderes de mercado não 'atendem' clientes; eles orquestram experiências impecáveis."
            </p>

            <p>
              Apresento a <strong className="text-white font-semibold">Célula de Inteligência FLOW-1</strong>: a única estrutura tática capaz de manter a Itamaraju operando com precisão cirúrgica 24/7.
            </p>
          </FadeIn>

          <FadeIn>
            <h3 className="text-white font-bold text-2xl mt-16 mb-6 flex items-center gap-3">
              <Bot className="w-6 h-6 text-[hsl(213,80%,55%)] drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]" /> A Engenharia da Superioridade
            </h3>
            <p>
              A Célula FLOW-1 não é um "bot de atendimento". É o cérebro digital da sua empresa, projetado com três camadas de dominância:
            </p>

            <ul className="space-y-4 my-8 list-none pl-0">
              <li className="flex items-start gap-4 bg-white/5 hover:bg-white/10 transition-colors p-5 rounded-xl border border-white/5">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[hsl(213,80%,45%)]/20 text-[hsl(213,80%,55%)] flex items-center justify-center font-bold text-sm mt-0.5">1</span>
                <div>
                  <strong className="text-white block mb-1">Onipresença Instantânea</strong>
                  <span className="text-sm text-white/70">No site e no WhatsApp, o cliente recebe a resposta exata no milissegundo em que o desejo de compra surge. É a cura para a ansiedade do consumidor moderno.</span>
                </div>
              </li>
              <li className="flex items-start gap-4 bg-white/5 hover:bg-white/10 transition-colors p-5 rounded-xl border border-white/5">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[hsl(45,95%,55%)]/20 text-[hsl(45,95%,55%)] flex items-center justify-center font-bold text-sm mt-0.5">2</span>
                <div>
                  <strong className="text-white block mb-1">Mecanismo Único de Reconhecimento</strong>
                  <span className="text-sm text-white/70">O sistema não apenas responde, ele vende. Ele identifica necessidades, filtra o estoque e conduz o fechamento de forma autônoma.</span>
                </div>
              </li>
              <li className="flex items-start gap-4 bg-white/5 hover:bg-white/10 transition-colors p-5 rounded-xl border border-white/5">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm mt-0.5">3</span>
                <div>
                  <strong className="text-white block mb-1">Comando Centralizado</strong>
                  <span className="text-sm text-white/70">Através do nosso Painel de Gestão, você assume a posição de General da operação. Monitora os avanços e vê a empresa crescer sem aumentar a folha de pagamento.</span>
                </div>
              </li>
            </ul>
          </FadeIn>

          <FadeIn>
            <h3 className="text-white font-bold text-2xl mt-16 mb-6 flex items-center gap-3">
              <Server className="w-6 h-6 text-gray-400" /> Infraestrutura e Setup
            </h3>
            <p>
              Trabalhar com a FLOW TECH é uma decisão tática de faturamento. Estamos substituindo custos variáveis e imprevisíveis por uma estrutura fixa, escalável e de alta performance.
            </p>

            <div className="bg-gradient-to-br from-[hsl(220,20%,10%)] to-[hsl(220,20%,12%)] p-6 sm:p-8 rounded-2xl border border-white/10 my-8 shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-[hsl(213,80%,45%)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              <h4 className="text-gray-400 font-semibold mb-6 flex items-center gap-2 text-sm uppercase tracking-widest relative z-10">
                 Custos de Implementação
              </h4>
              <ul className="space-y-4 text-sm relative z-10">
                <li className="flex justify-between items-center border-b border-white/5 pb-3">
                  <span className="text-white/70">Setup Inicial e Engenharia FLOW-1</span>
                  <span className="font-mono text-white text-base">R$ 2.500</span>
                </li>
                <li className="flex justify-between items-center pb-2">
                  <span className="text-white/70">Infraestrutura Cloud Elite (Servidores AWS)</span>
                  <span className="font-mono text-white text-base">R$ 90<span className="text-xs text-white/40 ml-1">/mês</span></span>
                </li>
              </ul>
            </div>
          </FadeIn>

          <FadeIn delay={200}>
            <div className="bg-gradient-to-br from-[hsl(213,80%,20%)] to-[hsl(220,20%,12%)] p-6 sm:p-8 rounded-2xl border border-[hsl(213,80%,35%)] my-8 shadow-[0_0_30px_hsl(213_80%_45%/0.1)] relative">
              <h4 className="text-[hsl(45,95%,55%)] font-semibold mb-6 flex items-center gap-2 text-sm uppercase tracking-widest">
                 Licença de Operação
              </h4>
              <ul className="space-y-4 mb-2 text-sm">
                <li className="flex justify-between items-center pb-2">
                  <span className="text-white/90 font-medium">Licença Célula de Inteligência FLOW-1</span>
                  <span className="font-mono text-white text-base">R$ 600<span className="text-xs text-white/40 ml-1">/mês</span></span>
                </li>
              </ul>
            </div>
          </FadeIn>

          <FadeIn delay={400}>
            <div className="bg-[hsl(45,95%,55%)]/10 border border-[hsl(45,95%,55%)]/30 p-6 sm:p-8 rounded-2xl my-10 relative overflow-hidden">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-[hsl(45,95%,55%)] rounded-full blur-[80px] opacity-20 pointer-events-none"></div>
              <strong className="flex items-center gap-2 text-[hsl(45,95%,55%)] mb-4 font-bold uppercase tracking-wide text-xs">
                 <Sparkles className="w-4 h-4" /> A Decisão Estratégica do Combo (Oferta)
              </strong>
              <p className="text-base text-white/90 leading-relaxed">
                Pela confiança na sua visão, unificamos a gestão do seu sistema atual com a nova Célula FLOW-1. O investimento mensal total para sustentar todo o seu ecossistema digital será congelado em <strong className="text-white text-xl ml-1">R$ 900 /mês</strong>.
              </p>
              <div className="mt-6 pt-6 border-t border-[hsl(45,95%,55%)]/20">
                <p className="text-sm font-semibold text-white mb-3">Bônus Exclusivos de Ativação:</p>
                <ul className="space-y-3 text-sm text-[hsl(45,95%,65%)]/80">
                  <li className="flex items-start gap-2.5">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[hsl(45,95%,55%)] shrink-0 shadow-[0_0_8px_hsl(45,95%,55%)]"></span>
                    <span>Uma economia garantida de <strong>R$ 2.400 ao ano</strong>, liberando caixa para reinvestir em expansão da marca.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[hsl(45,95%,55%)] shrink-0 shadow-[0_0_8px_hsl(45,95%,55%)]"></span>
                    <span><strong className="text-[hsl(45,95%,55%)]">Créditos Iniciais:</strong> Ativaremos sua operação inicial com créditos de IA de elite para os primeiros 60 atendimentos.</span>
                  </li>
                </ul>
              </div>
            </div>
          </FadeIn>

          <FadeIn>
            <hr className="border-white/10 my-10" />

            <p className="text-xl font-medium text-white mb-2">
              João, você já provou que tem a coragem para chegar até aqui.
            </p>
            <p className="mb-10 text-white/70">
              A pergunta agora não é se o sistema funciona, mas como a Ótica Itamaraju vai lidar com o volume de vendas que essa nova escala vai gerar. A estrutura está pronta. A estratégia está traçada. O topo te espera.
            </p>
          </FadeIn>
        </div>

        <FadeIn delay={200}>
          {/* CTA Area */}
          <div className="bg-white/5 border border-white/10 p-8 sm:p-12 rounded-3xl text-center shadow-2xl backdrop-blur-sm relative overflow-hidden group mt-10">
            <div className="absolute inset-0 bg-gradient-to-r from-[hsl(213,80%,45%)]/0 via-[hsl(213,80%,45%)]/10 to-[hsl(213,80%,45%)]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"></div>
            
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 relative z-10 tracking-tight">Como prefere dar a ordem de início?</h2>
            <p className="text-white/60 text-sm mb-10 max-w-md mx-auto relative z-10 leading-relaxed">
              Inicie a interface demonstrativa agora e teste o motor lógico que vai escalar o seu negócio.
            </p>
            
            <button
              onClick={() => {
                const btn = document.querySelector('[aria-label="Abrir chat"]') as HTMLButtonElement;
                btn?.click();
              }}
              className="relative z-10 inline-flex items-center justify-center gap-3 bg-[hsl(213,80%,45%)] text-white font-bold px-8 py-4 sm:py-5 rounded-xl text-base hover:bg-[hsl(213,80%,55%)] transition-all shadow-[0_0_30px_hsl(213_80%_45%/0.4)] hover:shadow-[0_0_40px_hsl(213_80%_45%/0.6)] hover:-translate-y-1 active:translate-y-0 w-full sm:w-auto"
            >
              <MessageCircle className="w-6 h-6" />
              Testar Célula FLOW-1
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </FadeIn>

      </main>

    </div>
  );
};

export default LandingPage;
