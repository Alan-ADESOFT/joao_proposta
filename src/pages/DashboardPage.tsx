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
    <div className="min-h-screen bg-[#f8fafc] flex selection:bg-[hsl(45,95%,55%)] selection:text-[hsl(220,20%,10%)]" style={{ fontFamily: "'Poppins', sans-serif" }}>
      {/* Sidebar - mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-[hsl(220,20%,8%)]/60 backdrop-blur-sm z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`  
        fixed lg:static z-50 top-0 left-0 h-[100dvh] w-64 bg-[hsl(220,20%,8%)] text-white flex flex-col shrink-0
        transition-transform duration-300 lg:translate-x-0 border-r border-white/5 shadow-2xl lg:shadow-none
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <div className="p-6 border-b border-white/5">
          <div className="flex flex-col gap-4">
            <div className="w-24 h-24 rounded-2xl bg-white flex items-center justify-center p-2 shadow-[0_0_25px_rgba(255,255,255,0.08)] mx-auto">
              <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
            </div>
            <div className="text-center">
              <p className="font-bold text-white tracking-tight">Ótica Itamaraju</p>
              <div className="flex items-center justify-center gap-1.5 mt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[hsl(45,95%,55%)] shadow-[0_0_8px_hsl(45,95%,55%)]"></span>
                <p className="text-[10px] font-medium text-white/60 uppercase tracking-wider">Painel Admin</p>
              </div>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          <button onClick={() => { setTab("mensagens"); setSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${tab === "mensagens" ? "bg-[hsl(213,80%,45%)]/10 text-[hsl(213,80%,65%)] border border-[hsl(213,80%,45%)]/20 shadow-[inset_0_0_20px_rgba(255,255,255,0.02)]" : "text-white/50 hover:text-white hover:bg-white/5 border border-transparent"}`}>
            <MessageSquare className={`w-4 h-4 ${tab === "mensagens" ? "text-[hsl(213,80%,55%)]" : ""}`} />
            Mensagens
            {unreadCount > 0 && (
              <span className="ml-auto bg-red-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">{unreadCount}</span>
            )}
          </button>
        </nav>

        <div className="p-4 border-t border-white/5">
          <button onClick={() => { setIsLoggedIn(false); setSelectedLead(null); }}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-white/40 hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all duration-200">
            <LogOut className="w-4 h-4" /> Sair do Sistema
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/80 px-4 sm:px-6 py-4 flex items-center gap-4 shrink-0 shadow-sm sticky top-0 z-30">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 transition-colors shadow-sm">
            <LayoutDashboard className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h1 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
              Gestão de Atendimentos
              {tab === "mensagens" && <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold ml-2 border border-blue-200">{leads.length} leads</span>}
            </h1>
            <p className="text-xs text-gray-500 mt-1 font-medium">
              Você tem <strong className="text-gray-800">{unreadCount} mensagens não lidas</strong> aguardando resposta.
            </p>
          </div>
          <button onClick={fetchLeads} disabled={loading} className="p-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition-colors shadow-sm group">
            <RefreshCw className={`w-4 h-4 text-gray-600 group-hover:text-[hsl(213,80%,45%)] ${loading ? "animate-spin text-[hsl(213,80%,45%)]" : ""}`} />
          </button>
        </header>

        {/* Content area */}
        <main className="flex-1 flex overflow-hidden">
          {tab === "mensagens" && (
            <>
              {/* Lead list */}
              <div className={`w-full sm:w-80 lg:w-96 border-r border-gray-200/80 bg-white flex flex-col shrink-0 ${selectedLead ? "hidden sm:flex" : "flex"}`}>
                {/* Search */}
                <div className="p-4 border-b border-gray-100/80 bg-white/50 backdrop-blur-sm sticky top-0 z-10">
                  <div className="relative group">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[hsl(213,80%,45%)] transition-colors" />
                    <input type="text" placeholder="Buscar contatos..." value={search} onChange={(e) => setSearch(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 text-sm border-2 border-gray-100 rounded-xl outline-none focus:border-[hsl(213,80%,45%)] focus:ring-4 focus:ring-[hsl(213,80%,45%)]/10 transition-all bg-gray-50/50 focus:bg-white placeholder:text-gray-400 font-medium" />
                  </div>
                </div>

                {/* List */}
                <div className="flex-1 overflow-y-auto">
                  {filteredLeads.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full text-gray-400 p-8 text-center">
                      <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 border border-gray-100">
                        <Inbox className="w-8 h-8 opacity-40" />
                      </div>
                      <p className="text-sm font-semibold text-gray-700">Caixa de entrada vazia</p>
                      <p className="text-xs mt-1 leading-relaxed text-gray-500 max-w-[200px]">Os chamados de atendimento humano aparecerão aqui em tempo real.</p>
                    </div>
                  )}
                  {filteredLeads.map((lead) => (
                    <button key={lead.id} onClick={() => handleSelectLead(lead)}
                      className={`w-full text-left p-4 border-b border-gray-100 hover:bg-gray-50/80 transition-all duration-200 relative group ${selectedLead?.id === lead.id ? "bg-blue-50/50" : ""} ${!lead.lido ? "bg-gradient-to-r from-blue-50/30 to-transparent" : ""}`}>
                      
                      {selectedLead?.id === lead.id && <div className="absolute left-0 top-0 bottom-0 w-1 bg-[hsl(213,80%,45%)] rounded-r-md"></div>}
                      
                      <div className="flex items-start gap-3.5">
                        <div className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 text-sm font-bold shadow-sm ${!lead.lido ? "bg-gradient-to-br from-[hsl(213,80%,45%)] to-[hsl(213,80%,35%)] text-white" : "bg-gray-100 text-gray-500 border border-gray-200"}`}>
                          {lead.nome.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0 pr-2">
                          <div className="flex items-center justify-between mb-0.5">
                            <p className={`text-sm truncate ${!lead.lido ? "font-bold text-gray-900" : "font-semibold text-gray-800"}`}>{lead.nome}</p>
                            {!lead.lido && <span className="w-2.5 h-2.5 rounded-full bg-[hsl(213,80%,45%)] shrink-0 shadow-[0_0_8px_hsl(213,80%,45%,0.6)]" />}
                          </div>
                          <p className={`text-xs truncate ${!lead.lido ? "text-gray-600 font-medium" : "text-gray-500"}`}>{lead.email}</p>
                          <p className="text-[10px] text-gray-400 mt-1 flex items-center gap-1 font-medium">
                            <Clock className="w-3 h-3" />
                            {new Date(lead.criadoEm).toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" })}
                          </p>
                        </div>
                        <ChevronRight className={`w-4 h-4 text-gray-300 shrink-0 hidden sm:block mt-3 transition-transform ${selectedLead?.id === lead.id ? "text-[hsl(213,80%,45%)] translate-x-0.5" : "group-hover:translate-x-0.5"}`} />
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Lead detail */}
              <div className={`flex-1 flex flex-col bg-[#f8fafc] ${selectedLead ? "flex" : "hidden sm:flex"}`}>
                {!selectedLead ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-gray-400 p-8 text-center relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
                      <MessageSquare className="w-96 h-96" />
                    </div>
                    <div className="w-20 h-20 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center mb-5 relative z-10">
                      <MessageSquare className="w-10 h-10 text-gray-300" />
                    </div>
                    <p className="text-lg font-bold text-gray-800 relative z-10 tracking-tight">Painel de Atendimento</p>
                    <p className="text-sm mt-2 text-gray-500 max-w-[250px] relative z-10 leading-relaxed">Selecione uma conversa na lista ao lado para visualizar os detalhes e assumir o atendimento.</p>
                  </div>
                ) : (
                  <>
                    {/* Lead header */}
                    <div className="bg-white border-b border-gray-200/80 px-4 sm:px-6 py-4 flex items-center gap-4 shadow-sm z-10">
                      <button onClick={() => setSelectedLead(null)} className="sm:hidden p-2 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-500">
                        <ChevronRight className="w-5 h-5 rotate-180" />
                      </button>
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[hsl(213,80%,45%)] to-[hsl(213,80%,35%)] text-white flex items-center justify-center font-bold text-lg shrink-0 shadow-md ring-4 ring-blue-50">
                        {selectedLead.nome.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-gray-900 text-base truncate tracking-tight">{selectedLead.nome}</p>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-0.5 text-xs font-medium text-gray-500">
                          <span className="flex items-center gap-1.5 bg-gray-50 px-2 py-0.5 rounded-md border border-gray-100"><Phone className="w-3.5 h-3.5 text-gray-400" /> {selectedLead.telefone}</span>
                          <span className="flex items-center gap-1.5 bg-gray-50 px-2 py-0.5 rounded-md border border-gray-100"><Mail className="w-3.5 h-3.5 text-gray-400" /> {selectedLead.email}</span>
                        </div>
                      </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 space-y-4">
                      {selectedLead.mensagens.map((msg, i) => (
                        <div key={i} className={`flex gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300 ${msg.role === "user" ? "flex-row-reverse max-w-[85%] ml-auto" : "max-w-[85%]"}`}>
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm ${msg.role === "user" ? "bg-gradient-to-br from-[hsl(45,95%,55%)] to-[hsl(45,95%,45%)] text-[hsl(220,20%,15%)] ring-2 ring-[hsl(45,95%,55%)]/20" : "bg-gradient-to-br from-[hsl(213,80%,45%)] to-[hsl(213,80%,35%)] text-white ring-2 ring-[hsl(213,80%,45%)]/20"}`}>
                            {msg.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                          </div>
                          <div className={`rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${msg.role === "user" ? "bg-[hsl(213,80%,45%)] text-white rounded-tr-sm" : "bg-white border border-gray-200/80 text-gray-700 rounded-tl-sm"}`}
                            dangerouslySetInnerHTML={{ __html: msg.content.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/\n/g, "<br/>") }} />
                        </div>
                      ))}
                    </div>

                    {/* Contact actions */}
                    <div className="bg-white border-t border-gray-200/80 p-4 sm:p-6 flex flex-col sm:flex-row gap-3 z-10 shadow-[0_-10px_30px_rgba(0,0,0,0.02)]">
                      <a href={`https://wa.me/55${selectedLead.telefone.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-sm font-bold shadow-[0_4px_15px_rgba(16,185,129,0.3)] hover:shadow-[0_6px_20px_rgba(16,185,129,0.4)] transition-all hover:-translate-y-0.5 active:translate-y-0">
                        <Smartphone className="w-5 h-5" /> Iniciar Atendimento WhatsApp
                      </a>
                      <a href={`mailto:${selectedLead.email}`}
                        className="sm:w-auto w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white border-2 border-gray-200 text-gray-700 text-sm font-bold hover:bg-gray-50 hover:border-gray-300 transition-all">
                        <Mail className="w-5 h-5 text-gray-400" /> Enviar E-mail
                      </a>
                    </div>
                  </>
                )}
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
