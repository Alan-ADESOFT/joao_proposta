import { useState, useRef, useEffect, useCallback } from "react";
import {
  MessageCircle, X, Send, Minus, Bot, User, Loader2,
  Package, MapPin, Truck, Clock, ArrowLeft, UserCircle, Phone, Mail,
} from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface FreteOption {
  tipo: string;
  preco: string;
  prazo: string;
  previsao: string;
  condicao?: string;
}

interface UserInfo {
  nome: string;
  telefone: string;
  email: string;
}

type ChatStep = "form" | "chat" | "frete_input" | "frete_result";

const QUICK_ACTIONS = [
  { label: "👓 Lentes", msg: "Quais lentes voces tem disponiveis e os precos?" },
  { label: "🕶️ Armacoes", msg: "Quais armacoes voces tem? Quero ver os modelos e precos." },
  { label: "💳 Pagamento", msg: "Quais as formas de pagamento disponiveis?" },
  { label: "📦 Calcular Frete", msg: "Quero calcular o frete de entrega." },
  { label: "🔄 Trocas", msg: "Como funciona a troca e devolucao?" },
  { label: "📍 Localizacao", msg: "Onde fica a loja e qual o horario?" },
  { label: "🧑 Atendente", msg: "Quero falar com um atendente humano." },
];

const API_URL = import.meta.env.VITE_CHAT_API_URL || "";
const MAX_MESSAGES_PER_SESSION = 20;
const STORAGE_KEY = "flow_chat_user";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showInvite, setShowInvite] = useState(false);
  const [step, setStep] = useState<ChatStep>("form");
  const [userInfo, setUserInfo] = useState<UserInfo>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : { nome: "", telefone: "", email: "" };
    } catch {
      return { nome: "", telefone: "", email: "" };
    }
  });
  const [formErrors, setFormErrors] = useState<Partial<UserInfo>>({});
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(true);
  const [cepInput, setCepInput] = useState("");
  const [freteOpcoes, setFreteOpcoes] = useState<FreteOption[]>([]);
  const [freteCep, setFreteCep] = useState("");
  const [humanRequested, setHumanRequested] = useState(false);
  const [messageCount, setMessageCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const cepInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowInvite(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Check if user data exists in localStorage and skip form
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.nome && parsed.telefone && parsed.email) {
          setStep("chat");
        }
      }
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading, step]);

  useEffect(() => {
    if (isOpen && step === "chat") inputRef.current?.focus();
    if (isOpen && step === "frete_input") cepInputRef.current?.focus();
  }, [isOpen, step]);

  const validateForm = (): boolean => {
    const errors: Partial<UserInfo> = {};
    if (!userInfo.nome.trim()) errors.nome = "Informe seu nome";
    if (!userInfo.telefone.trim()) errors.telefone = "Informe seu telefone";
    if (!userInfo.email.trim() || !userInfo.email.includes("@")) errors.email = "Informe um e-mail valido";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleStartChat = () => {
    if (!validateForm()) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userInfo));
    } catch { /* ignore */ }
    setStep("chat");
  };

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isLoading) return;

    if (messageCount >= MAX_MESSAGES_PER_SESSION) {
      setMessages((prev) => [
        ...prev,
        { role: "user", content: text.trim() },
        {
          role: "assistant",
          content: "Voce atingiu o limite de mensagens desta sessao. 😊\n\nPara continuar, **fale com nossa equipe** pelo WhatsApp: **(73) 99999-9999** 📱\n\nOu recarregue a pagina para iniciar uma nova sessao.",
        },
      ]);
      setInput("");
      setShowQuickActions(false);
      return;
    }

    const userMsg: Message = { role: "user", content: text.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setShowQuickActions(false);
    setIsLoading(true);
    setMessageCount((c) => c + 1);

    try {
      const res = await fetch(`${API_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages, userInfo }),
      });

      if (!res.ok) throw new Error("Erro na API");
      const data = await res.json();

      if (data.action === "calcular_frete") {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: "Claro! Vou te ajudar a calcular o frete. 📦\nDigite seu CEP abaixo:" },
        ]);
        setStep("frete_input");
      } else if (data.action === "atendimento_humano") {
        setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
        if (!humanRequested) {
          setHumanRequested(true);
          fetch(`${API_URL}/api/leads`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...userInfo,
              mensagens: [...newMessages, { role: "assistant", content: data.reply }],
              origem: "chat_luna",
            }),
          }).catch(() => {});
        }
      } else {
        setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Desculpe, estou com dificuldade para responder no momento. 😔\n\nPor favor, tente novamente em alguns instantes ou **fale com um atendente humano** pelo nosso WhatsApp: **(73) 99999-9999** 📱",
        },
      ]);
      setShowQuickActions(true);
    } finally {
      setIsLoading(false);
    }
  }, [messages, isLoading, userInfo, humanRequested]);

  // Handle quick action button click - sends through the API like free text
  const handleQuickAction = useCallback((action: typeof QUICK_ACTIONS[0]) => {
    if (isLoading) return;
    sendMessage(action.msg);
  }, [isLoading, sendMessage]);

  const calcularFrete = useCallback(async () => {
    if (!cepInput.trim() || isLoading) return;
    setIsLoading(true);
    setFreteCep(cepInput.trim());
    try {
      const res = await fetch(`${API_URL}/api/frete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cep: cepInput.trim() }),
      });
      if (!res.ok) throw new Error("Erro");
      const data = await res.json();
      setFreteOpcoes(data.opcoes);
      setStep("frete_result");
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: "Nao consegui calcular o frete. Tente novamente! 📦" }]);
      setStep("chat");
    } finally {
      setIsLoading(false);
      setCepInput("");
    }
  }, [cepInput, isLoading]);

  const voltarParaChat = () => {
    setStep("chat");
    setFreteOpcoes([]);
    setFreteCep("");
    setMessages((prev) => [...prev, { role: "assistant", content: "Frete calculado! 😊 Posso te ajudar com mais alguma coisa?" }]);
    setShowQuickActions(true);
  };

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
    setShowInvite(false);
  };

  const fmt = (text: string) => text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/\n/g, "<br/>");

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[9999] flex flex-col items-end gap-3" style={{ fontFamily: "'Poppins', sans-serif" }}>
      {/* Popup convite */}
      {showInvite && !isOpen && (
        <div className="relative bg-white rounded-2xl shadow-xl p-3.5 sm:p-4 max-w-[260px] sm:max-w-[280px] animate-in slide-in-from-bottom-4 fade-in duration-500 border border-gray-100">
          <button onClick={(e) => { e.stopPropagation(); setShowInvite(false); }} className="absolute top-1 right-2.5 text-gray-400 hover:text-gray-600 text-lg leading-none">&times;</button>
          <div className="flex items-start gap-2.5 pr-3">
            <div className="w-8 h-8 min-w-[32px] rounded-full bg-gradient-to-br from-[hsl(213,80%,45%)] to-[hsl(213,80%,30%)] flex items-center justify-center text-white shrink-0 mt-0.5">
              <Bot className="w-3.5 h-3.5" />
            </div>
            <div>
              <p className="text-xs font-bold text-[hsl(213,80%,30%)]">Flow ⚡</p>
              <p className="text-xs text-gray-600 leading-relaxed mt-0.5 font-medium">
                Precisa de ajuda com <strong className="text-[hsl(213,80%,45%)]">oculos ou lentes</strong>? Fale comigo! 👓
              </p>
            </div>
          </div>
          <div className="absolute -bottom-2 right-6 w-3.5 h-3.5 bg-white rotate-45 shadow-sm border-r border-b border-gray-100" />
        </div>
      )}

      {/* Chat window */}
      <div className={`
        bg-white rounded-3xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col transition-all duration-300 ease-out origin-bottom-right border border-gray-200/60
        ${isOpen ? "opacity-100 scale-100 translate-y-0" : "w-0 h-0 opacity-0 scale-95 translate-y-5 pointer-events-none"}
        ${isOpen ? "w-[calc(100vw-32px)] sm:w-[380px] h-[calc(100svh-120px)] sm:h-[600px] max-h-[800px]" : ""}
      `}>
        {/* Header */}
        <div className="bg-gradient-to-r from-[hsl(213,80%,22%)] to-[hsl(213,80%,35%)] text-white px-4 sm:px-5 py-3.5 sm:py-5 flex items-center justify-between shrink-0 shadow-md z-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white flex items-center justify-center ring-2 ring-white/20 shadow-sm overflow-hidden p-1.5">
              <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <h3 className="text-sm font-bold leading-tight">Otica Itamaraju</h3>
              <span className="text-[10px] sm:text-[11px] opacity-80 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
                Flow ⚡ Online
              </span>
            </div>
          </div>
          <button onClick={handleToggle} className="p-1.5 rounded-full hover:bg-white/10 transition-colors" aria-label="Minimizar">
            <Minus className="w-5 h-5" />
          </button>
        </div>

        {/* STEP: Form - coleta de dados */}
        {step === "form" && (
          <div className="flex-1 overflow-y-auto px-4 sm:px-5 py-5 sm:py-6 flex flex-col">
            <div className="flex items-start gap-2.5 mb-5">
              <div className="w-8 h-8 min-w-[32px] rounded-full bg-gradient-to-br from-[hsl(213,80%,45%)] to-[hsl(213,80%,30%)] flex items-center justify-center text-white shrink-0 shadow-sm">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-gray-50 border border-gray-200/80 rounded-2xl rounded-tl-md px-3.5 py-3 text-[13px] text-gray-700 leading-relaxed">
                Ola! Eu sou a <strong>Luna</strong> 🌙
                <br /><br />
                Antes de comecarmos, preciso de algumas informacoes para te atender melhor:
              </div>
            </div>

            <div className="space-y-3 flex-1">
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1 flex items-center gap-1.5">
                  <UserCircle className="w-3.5 h-3.5" /> Seu nome
                </label>
                <input
                  type="text"
                  value={userInfo.nome}
                  onChange={(e) => { setUserInfo((p) => ({ ...p, nome: e.target.value })); setFormErrors((p) => ({ ...p, nome: undefined })); }}
                  placeholder="Ex: Joao Silva"
                  className={`w-full border rounded-xl px-3.5 py-2.5 text-sm outline-none transition-all ${formErrors.nome ? "border-red-300 bg-red-50/50" : "border-gray-200 focus:border-[hsl(213,80%,45%)] focus:ring-2 focus:ring-[hsl(213,80%,45%)]/15"}`}
                />
                {formErrors.nome && <p className="text-[11px] text-red-500 mt-1">{formErrors.nome}</p>}
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5" /> Telefone / WhatsApp
                </label>
                <input
                  type="tel"
                  value={userInfo.telefone}
                  onChange={(e) => { setUserInfo((p) => ({ ...p, telefone: e.target.value })); setFormErrors((p) => ({ ...p, telefone: undefined })); }}
                  placeholder="(73) 99999-9999"
                  className={`w-full border rounded-xl px-3.5 py-2.5 text-sm outline-none transition-all ${formErrors.telefone ? "border-red-300 bg-red-50/50" : "border-gray-200 focus:border-[hsl(213,80%,45%)] focus:ring-2 focus:ring-[hsl(213,80%,45%)]/15"}`}
                />
                {formErrors.telefone && <p className="text-[11px] text-red-500 mt-1">{formErrors.telefone}</p>}
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5" /> E-mail
                </label>
                <input
                  type="email"
                  value={userInfo.email}
                  onChange={(e) => { setUserInfo((p) => ({ ...p, email: e.target.value })); setFormErrors((p) => ({ ...p, email: undefined })); }}
                  placeholder="joao@email.com"
                  className={`w-full border rounded-xl px-3.5 py-2.5 text-sm outline-none transition-all ${formErrors.email ? "border-red-300 bg-red-50/50" : "border-gray-200 focus:border-[hsl(213,80%,45%)] focus:ring-2 focus:ring-[hsl(213,80%,45%)]/15"}`}
                  onKeyDown={(e) => e.key === "Enter" && handleStartChat()}
                />
                {formErrors.email && <p className="text-[11px] text-red-500 mt-1">{formErrors.email}</p>}
              </div>
            </div>

            <button
              onClick={handleStartChat}
              className="w-full mt-4 py-3 rounded-xl bg-gradient-to-r from-[hsl(213,80%,45%)] to-[hsl(213,80%,38%)] text-white font-semibold text-sm flex items-center justify-center gap-2 hover:shadow-lg transition-all active:scale-[0.98]"
            >
              <MessageCircle className="w-4 h-4" /> Iniciar Conversa
            </button>
            <p className="text-[10px] text-gray-400 text-center mt-2.5">
              Seus dados sao usados apenas para contato caso necessario.
            </p>
          </div>
        )}

        {/* STEP: Chat / Frete */}
        {step !== "form" && (
          <>
            <div className="flex-1 overflow-y-auto px-3.5 sm:px-4 py-3.5 sm:py-4 space-y-3 bg-gradient-to-b from-gray-50/50 to-white">
              {/* Welcome */}
              <div className="flex gap-2 max-w-[90%]">
                <div className="w-7 h-7 sm:w-8 sm:h-8 min-w-[28px] sm:min-w-[32px] rounded-full bg-gradient-to-br from-[hsl(213,80%,45%)] to-[hsl(213,80%,30%)] flex items-center justify-center text-white shrink-0 shadow-sm">
                  <Bot className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div className="bg-white border border-gray-200/80 rounded-2xl rounded-tl-md px-3 sm:px-3.5 py-2.5 sm:py-3 text-xs sm:text-[13px] text-gray-700 leading-relaxed shadow-sm">
                  Oi, <strong>{userInfo.nome.split(" ")[0]}</strong>! 👋 Sou o <strong>Flow</strong> 🌙, assistente virtual da <strong>Otica Itamaraju</strong>.
                  <br /><br />
                  Como posso te ajudar? Use os botoes abaixo ou <strong>faca uma pergunta livre</strong>! 😊
                </div>
              </div>

              {/* Quick actions */}
              {showQuickActions && step === "chat" && (
                <div className="flex flex-wrap gap-1.5 pl-9 sm:pl-10 animate-in fade-in duration-300">
                  {QUICK_ACTIONS.map((a) => (
                    <button key={a.label} onClick={() => handleQuickAction(a)}
                      className="bg-white border border-[hsl(213,80%,88%)] rounded-full px-2.5 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-[11px] font-medium text-[hsl(213,80%,40%)] hover:bg-[hsl(213,80%,45%)] hover:text-white hover:border-[hsl(213,80%,45%)] transition-all duration-200 hover:-translate-y-px shadow-sm">
                      {a.label}
                    </button>
                  ))}
                </div>
              )}

              {/* Messages */}
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-2 animate-in slide-in-from-bottom-2 fade-in duration-300 ${msg.role === "user" ? "flex-row-reverse max-w-[88%] ml-auto" : "max-w-[90%]"}`}>
                  <div className={`w-7 h-7 sm:w-8 sm:h-8 min-w-[28px] sm:min-w-[32px] rounded-full flex items-center justify-center shrink-0 shadow-sm ${msg.role === "user" ? "bg-gradient-to-br from-[hsl(45,95%,55%)] to-[hsl(45,95%,45%)] text-[hsl(220,20%,15%)]" : "bg-gradient-to-br from-[hsl(213,80%,45%)] to-[hsl(213,80%,30%)] text-white"}`}>
                    {msg.role === "user" ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                  </div>
                  <div className={`rounded-2xl px-3 sm:px-3.5 py-2 sm:py-2.5 text-xs sm:text-[13px] leading-relaxed shadow-sm ${msg.role === "user" ? "bg-gradient-to-br from-[hsl(213,80%,45%)] to-[hsl(213,80%,38%)] text-white rounded-tr-md" : "bg-white border border-gray-200/80 text-gray-700 rounded-tl-md"}`}
                    dangerouslySetInnerHTML={{ __html: fmt(msg.content) }}
                  />
                </div>
              ))}

              {/* Frete input */}
              {step === "frete_input" && (
                <div className="animate-in slide-in-from-bottom-3 fade-in pl-9 sm:pl-10">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200/60 rounded-2xl p-3.5 sm:p-4 shadow-sm">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[hsl(213,80%,45%)] flex items-center justify-center text-white">
                        <Package className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm font-semibold text-[hsl(213,80%,30%)]">Calcular Frete</p>
                        <p className="text-[10px] sm:text-[11px] text-gray-500">Digite seu CEP</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" />
                        <input ref={cepInputRef} type="text" value={cepInput} onChange={(e) => setCepInput(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && calcularFrete()} placeholder="00000-000" maxLength={10}
                          className="w-full pl-8 sm:pl-9 pr-3 py-2 sm:py-2.5 text-sm border border-blue-200 rounded-xl outline-none focus:border-[hsl(213,80%,45%)] focus:ring-2 focus:ring-[hsl(213,80%,45%)]/20 bg-white" disabled={isLoading} />
                      </div>
                      <button onClick={calcularFrete} disabled={!cepInput.trim() || isLoading}
                        className="px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-[hsl(213,80%,45%)] text-white text-xs sm:text-sm font-medium hover:bg-[hsl(213,80%,38%)] disabled:opacity-50 transition-all flex items-center gap-1.5">
                        {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Truck className="w-4 h-4" />}
                        <span className="hidden sm:inline">Calcular</span>
                      </button>
                    </div>
                    <button onClick={() => { setStep("chat"); setShowQuickActions(true); }} className="mt-2 text-[10px] sm:text-[11px] text-gray-500 hover:text-[hsl(213,80%,45%)] transition-colors flex items-center gap-1">
                      <ArrowLeft className="w-3 h-3" /> Voltar ao chat
                    </button>
                  </div>
                </div>
              )}

              {/* Frete result */}
              {step === "frete_result" && freteOpcoes.length > 0 && (
                <div className="animate-in slide-in-from-bottom-3 fade-in pl-9 sm:pl-10">
                  <div className="bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200/60 rounded-2xl p-3.5 sm:p-4 shadow-sm">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white"><Truck className="w-3.5 h-3.5 sm:w-4 sm:h-4" /></div>
                      <div>
                        <p className="text-xs sm:text-sm font-semibold text-emerald-800">Opcoes de Entrega</p>
                        <p className="text-[10px] sm:text-[11px] text-emerald-600">CEP: {freteCep}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {freteOpcoes.map((op) => (
                        <div key={op.tipo} className="bg-white rounded-xl p-2.5 sm:p-3 border border-emerald-100">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className={`text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full ${op.tipo === "SEDEX" ? "bg-orange-100 text-orange-700" : op.tipo === "Gratis" ? "bg-emerald-100 text-emerald-700" : "bg-blue-100 text-blue-700"}`}>
                              {op.tipo}
                            </span>
                            <span className="text-xs sm:text-sm font-bold text-gray-800">{op.preco}</span>
                          </div>
                          <div className="flex items-center gap-2 sm:gap-3 mt-1.5 flex-wrap">
                            <span className="text-[10px] sm:text-[11px] text-gray-500 flex items-center gap-1"><Clock className="w-3 h-3" />{op.prazo}</span>
                            <span className="text-[10px] sm:text-[11px] text-gray-500">Previsao: <strong>{op.previsao}</strong></span>
                          </div>
                          {op.condicao && <span className="text-[10px] text-emerald-600 font-medium mt-1 inline-block">✨ {op.condicao}</span>}
                        </div>
                      ))}
                    </div>
                    <button onClick={voltarParaChat} className="mt-3 w-full py-2 rounded-xl bg-[hsl(213,80%,45%)] text-white text-xs sm:text-sm font-medium hover:bg-[hsl(213,80%,38%)] transition-all flex items-center justify-center gap-1.5">
                      <MessageCircle className="w-4 h-4" /> Continuar no Chat
                    </button>
                  </div>
                </div>
              )}

              {/* Typing */}
              {isLoading && step === "chat" && (
                <div className="flex gap-2 max-w-[85%] animate-in fade-in duration-200">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 min-w-[28px] sm:min-w-[32px] rounded-full bg-gradient-to-br from-[hsl(213,80%,45%)] to-[hsl(213,80%,30%)] flex items-center justify-center text-white shrink-0 shadow-sm"><Bot className="w-3.5 h-3.5" /></div>
                  <div className="bg-white border border-gray-200/80 rounded-2xl rounded-tl-md px-4 py-3 flex items-center gap-1.5 shadow-sm">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0ms]" />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:150ms]" />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:300ms]" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            {step === "chat" && (
              <div className="flex items-center gap-2 px-3 sm:px-4 py-2.5 sm:py-3 border-t border-gray-100 bg-white shrink-0">
                <input ref={inputRef} type="text" value={input} onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(input); } }}
                  placeholder="Faca uma pergunta livre..." disabled={isLoading}
                  className="flex-1 border border-gray-200 rounded-full px-3.5 sm:px-4 py-2 sm:py-2.5 text-sm outline-none focus:border-[hsl(213,80%,45%)] focus:ring-2 focus:ring-[hsl(213,80%,45%)]/20 transition-all bg-gray-50/50 focus:bg-white" />
                <button onClick={() => sendMessage(input)} disabled={!input.trim() || isLoading}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-[hsl(213,80%,45%)] to-[hsl(213,80%,35%)] text-white flex items-center justify-center hover:shadow-lg disabled:opacity-40 transition-all duration-200 hover:scale-105 shadow-md" aria-label="Enviar">
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Toggle button */}
      <button onClick={handleToggle}
        className="group relative w-16 h-16 sm:w-[68px] sm:h-[68px] rounded-full border-[3px] border-white bg-gradient-to-br from-[hsl(213,80%,45%)] to-[hsl(213,80%,30%)] text-white cursor-pointer shadow-[0_8px_30px_hsl(213_80%_45%/0.5)] flex items-center justify-center transition-all duration-300 hover:scale-105 hover:shadow-[0_12px_40px_hsl(213_80%_45%/0.6)] active:scale-95"
        aria-label={isOpen ? "Fechar chat" : "Abrir chat"}>
        {!isOpen && <span className="absolute inset-0 rounded-full bg-[hsl(213,80%,45%)] animate-ping opacity-25" />}
        <MessageCircle className={`w-7 h-7 sm:w-8 sm:h-8 transition-all duration-300 absolute ${isOpen ? "opacity-0 rotate-90 scale-75" : "opacity-100 rotate-0 scale-100"}`} />
        <X className={`w-7 h-7 sm:w-8 sm:h-8 transition-all duration-300 absolute ${isOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-75"}`} />
      </button>
    </div>
  );
};

export default ChatWidget;
