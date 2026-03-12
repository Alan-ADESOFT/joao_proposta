import express from "express";
import cors from "cors";
import OpenAI from "openai";
import dotenv from "dotenv";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { randomUUID } from "crypto";

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolve(__dirname, "../.env") });

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const model = process.env.OPENAI_MODEL || "gpt-4o-mini";

// ========== Rate limiting ==========
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minuto
const RATE_LIMIT_MAX = 10; // max 10 requisicoes por minuto por IP

function rateLimit(req, res, next) {
  const ip = req.headers["x-forwarded-for"] || req.ip;
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now - entry.start > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(ip, { start: now, count: 1 });
    return next();
  }

  entry.count++;
  if (entry.count > RATE_LIMIT_MAX) {
    return res.status(429).json({ error: "Muitas requisições. Tente novamente em 1 minuto." });
  }
  next();
}

// Limpa IPs antigos a cada 5 minutos
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateLimitMap) {
    if (now - entry.start > RATE_LIMIT_WINDOW * 2) rateLimitMap.delete(ip);
  }
}, 5 * 60 * 1000);

// ========== In-memory leads storage ==========
const leads = [];

// ========== Catalogo ==========
const CATALOGO = `
## CATÁLOGO — ÓTICA ITAMARAJU

### LENTES
| Produto | Preço | Descrição |
|---------|-------|-----------|
| Lente Visão Simples | R$ 189,90 | Proteção UV e antirreflexo. Resina. Transparente e Blue Light. |
| Lente Multifocal Premium | R$ 489,90 | Progressiva digital. Policarbonato. Padrão e Fotossensível. |
| Lente Blue Light | R$ 249,90 | Proteção contra luz azul de telas. Resina. |
| Lente Fotossensível | R$ 349,90 | Escurece ao sol. Policarbonato. |
| Lente Bifocal Flat-Top | R$ 279,90 | Bifocal clássica. Resina. Antirreflexo. |
| Lente Multifocal Digital | R$ 599,90 | Design digital última geração. Resina. Antirreflexo. |

### ARMAÇÕES
| Produto | Preço | Descrição |
|---------|-------|-----------|
| Armação Aviador Clássico | R$ 299,90 | Metal. Unissex. Dourado, Prateado, Preto. |
| Armação Retangular Acetato | R$ 349,90 | Acetato italiano. Masculino. Tartaruga, Preto. |
| Armação Cat-Eye Feminina | R$ 279,90 | Estilo gatinho. Feminino. Rosa, Preto. |
| Armação Redonda Retrô | R$ 259,90 | Metal. Unissex. Vintage contemporâneo. |
| Armação Esportiva Flex | R$ 319,90 | TR90 ultra leve. Masculino. |
| Armação Quadrada Premium | R$ 449,90 | Titânio minimalista. Unissex. |

### INFO LOJA
- Av. Cinquentenário, 1200 - Centro, Itamaraju-BA, 45836-000
- Seg-Sex 8h–18h, Sáb 8h–13h
- PAC R$ 29,90 | SEDEX R$ 49,90 | Grátis acima de R$ 500
- Cartão 12x s/ juros, PIX 10% OFF, Boleto 5% OFF
- Trocas: até 7 dias (Logística Reversa)
- WhatsApp: (73) 99999-9999 | Tel: (73) 3281-0000
`;

const SYSTEM_PROMPT = `Você é o **Flow** ⚡, assistente virtual da **Ótica Itamaraju** — referência em Itamaraju-BA, com 15+ anos no mercado óptico.

## EMPRESA
Av. Cinquentenário, 1200 - Centro, Itamaraju-BA. Especializada em lentes, armações de grau e óculos de sol. Missão: cuidar da visão com excelência e carinho.

## PERSONALIDADE
- Nome: Flow ⚡ | Simpático, acolhedor, profissional
- Linguagem acessível, como amigo | Emojis com moderação

## REGRAS
1. Responda APENAS sobre a ótica: produtos, preços, pagamento, frete, trocas, horário, localização.
2. Consulte o catálogo para dar preços e detalhes de produtos.
3. Para **calcular frete/prazo de entrega** → use function call "calcular_frete"
4. Para **falar com atendente/humano** → use function call "atendimento_humano"
5. Pergunta FORA do escopo → "Desculpe, só consigo ajudar com assuntos da Ótica Itamaraju! 😊 Posso te ajudar com lentes, armações ou serviços."
6. Sugira produtos relacionados. Respostas concisas (max 3-4 parágrafos). Use **negrito** para preços e nomes.

${CATALOGO}`;

// ========== Tools ==========
const tools = [
  {
    type: "function",
    function: {
      name: "calcular_frete",
      description: "Use quando o cliente perguntar sobre frete, prazo de entrega, custo de envio, ou verificar entrega.",
      parameters: {
        type: "object",
        properties: { motivo: { type: "string", description: "Motivo da consulta" } },
        required: ["motivo"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "atendimento_humano",
      description: "Use quando o cliente pedir para falar com um atendente humano, pessoa real, ou transferir para alguém.",
      parameters: {
        type: "object",
        properties: { motivo: { type: "string", description: "Motivo do atendimento" } },
        required: ["motivo"],
      },
    },
  },
];

// ========== Chat route ==========
app.post("/api/chat", rateLimit, async (req, res) => {
  try {
    const { messages, userInfo } = req.body;
    if (!messages || !Array.isArray(messages)) return res.status(400).json({ error: "messages obrigatório" });

    const completion = await openai.chat.completions.create({
      model,
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
      tools,
      tool_choice: "auto",
      temperature: 0.7,
      max_tokens: 500,
    });

    const msg = completion.choices[0]?.message;

    if (msg?.tool_calls?.length > 0) {
      const call = msg.tool_calls[0];
      const fnName = call.function.name;
      const args = JSON.parse(call.function.arguments || "{}");

      if (fnName === "calcular_frete") {
        return res.json({ reply: null, action: "calcular_frete", action_data: args });
      }

      if (fnName === "atendimento_humano") {
        // Auto-save lead
        if (userInfo?.nome) {
          const existing = leads.find((l) => l.email === userInfo.email);
          if (!existing) {
            leads.unshift({
              id: randomUUID(),
              nome: userInfo.nome,
              telefone: userInfo.telefone,
              email: userInfo.email,
              mensagens: messages,
              origem: "chat_luna",
              criadoEm: new Date().toISOString(),
              lido: false,
            });
          }
        }

        const reply = `Entendi, ${userInfo?.nome?.split(" ")[0] || ""}! Vou te conectar com nossa equipe. 📱\n\n**Nosso WhatsApp:** (73) 99999-9999\nRespondemos em até 5 minutinhos no horário comercial (Seg-Sex 8h–18h, Sáb 8h–13h).\n\nSeus dados já foram enviados para nossa equipe, e entraremos em contato o mais breve possível! 🙌`;

        return res.json({ reply, action: "atendimento_humano", action_data: args });
      }
    }

    res.json({ reply: msg?.content || "Desculpe, não entendi.", action: null });
  } catch (err) {
    console.error("OpenAI Error:", err.message);
    res.status(500).json({ error: "Erro ao processar mensagem." });
  }
});

// ========== Frete route ==========
app.post("/api/frete", async (req, res) => {
  try {
    const { cep } = req.body;
    if (!cep || cep.trim().length < 3) return res.status(400).json({ error: "CEP inválido" });

    const today = new Date();
    const pacDays = 8 + Math.floor(Math.random() * 5);
    const sedexDays = 3 + Math.floor(Math.random() * 3);
    const fmt = (d) => d.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });

    const pacDate = new Date(today); pacDate.setDate(pacDate.getDate() + pacDays);
    const sedexDate = new Date(today); sedexDate.setDate(sedexDate.getDate() + sedexDays);
    const freeDate = new Date(today); freeDate.setDate(freeDate.getDate() + pacDays + 2);

    res.json({
      cep: cep.trim(),
      opcoes: [
        { tipo: "PAC", preco: "R$ 29,90", prazo: `${pacDays} dias úteis`, previsao: fmt(pacDate) },
        { tipo: "SEDEX", preco: "R$ 49,90", prazo: `${sedexDays} dias úteis`, previsao: fmt(sedexDate) },
        { tipo: "Grátis", preco: "R$ 0,00", prazo: `${pacDays + 2} dias úteis`, previsao: fmt(freeDate), condicao: "Compras acima de R$ 500" },
      ],
    });
  } catch (err) {
    res.status(500).json({ error: "Erro ao calcular frete." });
  }
});

// ========== Leads CRUD ==========
app.get("/api/leads", (_req, res) => {
  res.json(leads);
});

app.post("/api/leads", (req, res) => {
  const { nome, telefone, email, mensagens, origem } = req.body;
  if (!nome || !email) return res.status(400).json({ error: "nome e email obrigatórios" });

  const existing = leads.find((l) => l.email === email);
  if (existing) {
    existing.mensagens = mensagens || existing.mensagens;
    return res.json(existing);
  }

  const lead = {
    id: randomUUID(),
    nome, telefone: telefone || "", email,
    mensagens: mensagens || [],
    origem: origem || "chat_luna",
    criadoEm: new Date().toISOString(),
    lido: false,
  };
  leads.unshift(lead);
  res.status(201).json(lead);
});

app.patch("/api/leads/:id/read", (req, res) => {
  const lead = leads.find((l) => l.id === req.params.id);
  if (!lead) return res.status(404).json({ error: "Lead não encontrado" });
  lead.lido = true;
  res.json(lead);
});

// ========== Health ==========
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", bot: "Flow", leads: leads.length });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`⚡ Flow API em http://localhost:${PORT}`));
