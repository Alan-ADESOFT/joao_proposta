import { useState, useEffect, useCallback } from "react";
import {
  LayoutDashboard, MessageSquare, Settings, LogOut, Eye,
  Phone, Mail, Clock, ChevronRight, User, Bot, RefreshCw,
  Smartphone, Lock, Search, Inbox,
} from "lucide-react";

interface Lead {
  id: string;
  nome: string;
  telefone: string;
  email: string;
  mensagens: { role: string; content: string }[];
  origem: string;
  criadoEm: string;
  lido: boolean;
}

type Tab = "mensagens" | "config";

const API_URL = import.meta.env.VITE_CHAT_API_URL || "";

const DashboardPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [tab, setTab] = useState<Tab>("mensagens");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/leads`);
      if (res.ok) {
        const data = await res.json();
        setLeads(data);
      }
    } catch { /* ignore */ }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (isLoggedIn) fetchLeads();
  }, [isLoggedIn, fetchLeads]);

  const markAsRead = async (id: string) => {
    try {
      await fetch(`${API_URL}/api/leads/${id}/read`, { method: "PATCH" });
      setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, lido: true } : l)));
    } catch { /* ignore */ }
  };

  const handleSelectLead = (lead: Lead) => {
    setSelectedLead(lead);
    setSidebarOpen(false);
    if (!lead.lido) markAsRead(lead.id);
  };

  const filteredLeads = leads.filter((l) =>
    l.nome.toLowerCase().includes(search.toLowerCase()) ||
    l.email.toLowerCase().includes(search.toLowerCase()) ||
    l.telefone.includes(search)
  );

  const unreadCount = leads.filter((l) => !l.lido).length;

  // ========== LOGIN SCREEN ==========
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[hsl(213,80%,15%)] flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden" style={{ fontFamily: "'Poppins', sans-serif" }}>
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[hsl(213,80%,25%)] rounded-full blur-[100px] opacity-60"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[hsl(45,95%,55%)] rounded-full blur-[100px] opacity-10"></div>
        </div>

        <div className="w-full max-w-md relative z-10 w-full animate-in fade-in duration-500">
          <div className="text-center mb-8">
            <div className="w-24 h-24 mx-auto bg-white rounded-2xl flex items-center justify-center mb-6 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/20 p-2">
              <img src="/logo.png" alt="Ótica Itamaraju Logo" className="w-full h-full object-contain" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Painel Administrativo</h1>
            <p className="text-blue-100/70 text-sm mt-3 font-medium">Gestão Ótica Itamaraju</p>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] border border-white/10 backdrop-blur-sm">
            <div className="space-y-5">
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">E-mail</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[hsl(213,80%,45%)] transition-colors" />
                  <input 
                    type="email" 
                    placeholder="admin@oticaitamaraju.com" 
                    className="w-full pl-12 pr-4 py-3.5 text-sm sm:text-base border-2 border-gray-100 rounded-xl outline-none focus:border-[hsl(213,80%,45%)] focus:ring-4 focus:ring-[hsl(213,80%,45%)]/10 transition-all bg-gray-50/50 focus:bg-white text-gray-800 placeholder:text-gray-400 font-medium" 
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-semibold text-gray-700 block">Senha</label>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[hsl(213,80%,45%)] transition-colors" />
                  <input 
                    type="password" 
                    placeholder="••••••••" 
                    className="w-full pl-12 pr-4 py-3.5 text-sm sm:text-base border-2 border-gray-100 rounded-xl outline-none focus:border-[hsl(213,80%,45%)] focus:ring-4 focus:ring-[hsl(213,80%,45%)]/10 transition-all bg-gray-50/50 focus:bg-white text-gray-800 placeholder:text-gray-400 font-medium" 
                  />
                </div>
              </div>
              
              <button 
                onClick={() => setIsLoggedIn(true)} 
                className="w-full py-4 mt-2 rounded-xl bg-gradient-to-r from-[hsl(213,80%,45%)] to-[hsl(213,80%,35%)] text-white font-bold text-sm sm:text-base shadow-[0_8px_20px_hsl(213_80%_45%/0.3)] hover:shadow-[0_8px_25px_hsl(213_80%_45%/0.4)] transition-all active:scale-[0.98] hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                Entrar no Sistema
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-100 text-center">
              <p className="text-xs text-gray-500 font-medium bg-gray-50 inline-block px-3 py-1.5 rounded-full">
                <span className="text-amber-500 mr-1">⚠️</span> Acesso demonstração - sem validação
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ========== DASHBOARD ==========
  return (
    <div className="min-h-screen bg-gray-50 flex" style={{ fontFamily: "'Poppins', sans-serif" }}>
      {/* Sidebar - mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static z-50 top-0 left-0 h-full w-64 bg-[hsl(220,20%,8%)] text-white flex flex-col shrink-0
        transition-transform duration-300 lg:translate-x-0
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <div className="p-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center p-1.5 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
              <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <p className="text-sm font-bold text-white tracking-tight">Ótica Itamaraju</p>
              <p className="text-[10px] font-medium text-[hsl(45,95%,55%)] uppercase tracking-wider">Painel Admin</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          <button onClick={() => { setTab("mensagens"); setSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${tab === "mensagens" ? "bg-white/10 text-white" : "text-white/50 hover:text-white hover:bg-white/5"}`}>
            <MessageSquare className="w-4 h-4" />
            Mensagens
            {unreadCount > 0 && (
              <span className="ml-auto bg-red-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">{unreadCount}</span>
            )}
          </button>
          <button onClick={() => { setTab("config"); setSelectedLead(null); setSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${tab === "config" ? "bg-white/10 text-white" : "text-white/50 hover:text-white hover:bg-white/5"}`}>
            <Settings className="w-4 h-4" />
            Configurações
          </button>
        </nav>

        <div className="p-3 border-t border-white/8">
          <button onClick={() => { setIsLoggedIn(false); setSelectedLead(null); }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-all">
            <LogOut className="w-4 h-4" /> Sair
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 flex items-center gap-3 shrink-0">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-lg hover:bg-gray-100">
            <LayoutDashboard className="w-5 h-5 text-gray-600" />
          </button>
          <div className="flex-1">
            <h1 className="text-base sm:text-lg font-semibold text-gray-900">
              {tab === "mensagens" ? "Mensagens de Atendimento" : "Configurações"}
            </h1>
            <p className="text-[11px] sm:text-xs text-gray-400">
              {tab === "mensagens" ? `${leads.length} lead${leads.length !== 1 ? "s" : ""} • ${unreadCount} não lido${unreadCount !== 1 ? "s" : ""}` : "Ajustes do sistema"}
            </p>
          </div>
          {tab === "mensagens" && (
            <button onClick={fetchLeads} disabled={loading} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <RefreshCw className={`w-4 h-4 text-gray-500 ${loading ? "animate-spin" : ""}`} />
            </button>
          )}
        </header>

        {/* Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* ====== TAB: MENSAGENS ====== */}
          {tab === "mensagens" && (
            <>
              {/* Lead list */}
              <div className={`w-full sm:w-80 lg:w-96 border-r border-gray-200 bg-white flex flex-col shrink-0 ${selectedLead ? "hidden sm:flex" : "flex"}`}>
                {/* Search */}
                <div className="p-3 border-b border-gray-100">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input type="text" placeholder="Buscar por nome, email ou telefone..." value={search} onChange={(e) => setSearch(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl outline-none focus:border-[hsl(213,80%,45%)]" />
                  </div>
                </div>

                {/* List */}
                <div className="flex-1 overflow-y-auto">
                  {filteredLeads.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full text-gray-400 p-6">
                      <Inbox className="w-10 h-10 mb-3 opacity-40" />
                      <p className="text-sm font-medium">Nenhuma mensagem</p>
                      <p className="text-[11px] mt-1 text-center">Quando um cliente pedir atendente humano, a mensagem aparecerá aqui.</p>
                    </div>
                  )}
                  {filteredLeads.map((lead) => (
                    <button key={lead.id} onClick={() => handleSelectLead(lead)}
                      className={`w-full text-left p-3.5 sm:p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${selectedLead?.id === lead.id ? "bg-blue-50/60" : ""} ${!lead.lido ? "bg-blue-50/30" : ""}`}>
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-sm font-bold ${!lead.lido ? "bg-[hsl(213,80%,45%)] text-white" : "bg-gray-100 text-gray-500"}`}>
                          {lead.nome.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className={`text-sm truncate ${!lead.lido ? "font-semibold text-gray-900" : "font-medium text-gray-700"}`}>{lead.nome}</p>
                            {!lead.lido && <span className="w-2.5 h-2.5 rounded-full bg-[hsl(213,80%,45%)] shrink-0" />}
                          </div>
                          <p className="text-[11px] text-gray-500 truncate mt-0.5">{lead.email}</p>
                          <p className="text-[10px] text-gray-400 mt-0.5 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {new Date(lead.criadoEm).toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" })}
                          </p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-300 shrink-0 hidden sm:block" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Lead detail */}
              <div className={`flex-1 flex flex-col bg-gray-50 ${selectedLead ? "flex" : "hidden sm:flex"}`}>
                {!selectedLead ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-gray-400 p-6">
                    <MessageSquare className="w-12 h-12 mb-3 opacity-30" />
                    <p className="text-sm font-medium">Selecione uma conversa</p>
                    <p className="text-xs mt-1">Escolha uma mensagem ao lado para ver os detalhes</p>
                  </div>
                ) : (
                  <>
                    {/* Lead header */}
                    <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4 flex items-center gap-3">
                      <button onClick={() => setSelectedLead(null)} className="sm:hidden p-1.5 rounded-lg hover:bg-gray-100">
                        <ChevronRight className="w-5 h-5 text-gray-500 rotate-180" />
                      </button>
                      <div className="w-10 h-10 rounded-full bg-[hsl(213,80%,45%)] text-white flex items-center justify-center font-bold text-sm shrink-0">
                        {selectedLead.nome.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 text-sm truncate">{selectedLead.nome}</p>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[11px] text-gray-500">
                          <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {selectedLead.telefone}</span>
                          <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {selectedLead.email}</span>
                        </div>
                      </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 space-y-3">
                      {selectedLead.mensagens.map((msg, i) => (
                        <div key={i} className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse max-w-[85%] ml-auto" : "max-w-[85%]"}`}>
                          <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${msg.role === "user" ? "bg-[hsl(45,95%,55%)] text-[hsl(220,20%,15%)]" : "bg-[hsl(213,80%,45%)] text-white"}`}>
                            {msg.role === "user" ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                          </div>
                          <div className={`rounded-2xl px-3 py-2 text-[13px] leading-relaxed ${msg.role === "user" ? "bg-[hsl(213,80%,45%)] text-white rounded-tr-sm" : "bg-white border border-gray-200 text-gray-700 rounded-tl-sm"}`}
                            dangerouslySetInnerHTML={{ __html: msg.content.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/\n/g, "<br/>") }} />
                        </div>
                      ))}
                    </div>

                    {/* Contact actions */}
                    <div className="bg-white border-t border-gray-200 px-4 sm:px-6 py-3 flex flex-wrap gap-2">
                      <a href={`https://wa.me/55${selectedLead.telefone.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-500 text-white text-sm font-medium hover:bg-emerald-600 transition-all">
                        <Smartphone className="w-4 h-4" /> WhatsApp
                      </a>
                      <a href={`mailto:${selectedLead.email}`}
                        className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200 transition-all">
                        <Mail className="w-4 h-4" /> E-mail
                      </a>
                    </div>
                  </>
                )}
              </div>
            </>
          )}

          {/* ====== TAB: CONFIG ====== */}
          {tab === "config" && (
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
              <div className="max-w-xl mx-auto space-y-6">
                {/* WhatsApp config */}
                <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                      <Smartphone className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm">WhatsApp da Loja</h3>
                      <p className="text-[11px] text-gray-500">Número usado para atendimento humano</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="text-xs font-medium text-gray-600 mb-1.5 block">Número atual</label>
                      <input type="tel" defaultValue="(73) 99999-9999" disabled
                        className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl bg-gray-50 text-gray-500" />
                    </div>
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-start gap-2.5">
                      <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-semibold text-amber-800">Em desenvolvimento</p>
                        <p className="text-[11px] text-amber-700 mt-0.5">
                          A funcionalidade de alterar o número do WhatsApp será disponibilizada em breve.
                          Por enquanto, entre em contato com o suporte para realizar alterações.
                        </p>
                      </div>
                    </div>
                    <button disabled className="w-full py-2.5 rounded-xl bg-gray-100 text-gray-400 text-sm font-medium cursor-not-allowed">
                      Salvar Alterações (em breve)
                    </button>
                  </div>
                </div>

                {/* Bot config */}
                <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                      <Bot className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm">Assistente Luna</h3>
                      <p className="text-[11px] text-gray-500">Status do assistente virtual</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-sm font-medium text-emerald-800">Online e ativo</span>
                    </div>
                    <span className="text-[11px] text-emerald-600">Modelo: GPT-4o Mini</span>
                  </div>
                </div>

                {/* Store info */}
                <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                      <Settings className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm">Dados da Loja</h3>
                      <p className="text-[11px] text-gray-500">Informações gerais</p>
                    </div>
                  </div>
                  <div className="space-y-2.5 text-sm text-gray-600">
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-400">Nome</span>
                      <span className="font-medium">Ótica Itamaraju</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-400">Endereço</span>
                      <span className="font-medium text-right text-xs">Av. Cinquentenário, 1200 - Centro</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-400">Cidade</span>
                      <span className="font-medium">Itamaraju - BA</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-400">Telefone</span>
                      <span className="font-medium">(73) 3281-0000</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-gray-400">Horário</span>
                      <span className="font-medium">Seg-Sex 8h–18h | Sáb 8h–13h</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
