export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: "lente" | "armacao";
  filters: Record<string, string>;
}

export const lenses: Product[] = [
  { id: "l1", name: "Lente Visão Simples", description: "Lente com proteção UV e antirreflexo para uso diário.", price: 189.9, image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=400&h=400&fit=crop", category: "lente", filters: { tipo: "Visão Simples", material: "Resina", tratamento: "Antirreflexo" } },
  { id: "l2", name: "Lente Multifocal Premium", description: "Lente progressiva com tecnologia digital para conforto visual.", price: 489.9, image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop", category: "lente", filters: { tipo: "Multifocal", material: "Policarbonato", tratamento: "Blue Light" } },
  { id: "l3", name: "Lente Blue Light", description: "Proteção contra luz azul de telas. Ideal para quem trabalha no computador.", price: 249.9, image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop", category: "lente", filters: { tipo: "Visão Simples", material: "Resina", tratamento: "Blue Light" } },
  { id: "l4", name: "Lente Fotossensível", description: "Escurece automaticamente na presença de luz solar.", price: 349.9, image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=400&fit=crop", category: "lente", filters: { tipo: "Visão Simples", material: "Policarbonato", tratamento: "Fotossensível" } },
  { id: "l5", name: "Lente Bifocal Flat-Top", description: "Lente bifocal clássica com campo de leitura definido.", price: 279.9, image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=400&h=400&fit=crop", category: "lente", filters: { tipo: "Bifocal", material: "Resina", tratamento: "Antirreflexo" } },
  { id: "l6", name: "Lente Multifocal Digital", description: "Adaptação rápida com design digital de última geração.", price: 599.9, image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop", category: "lente", filters: { tipo: "Multifocal", material: "Resina", tratamento: "Antirreflexo" } },
];

export const frames: Product[] = [
  { id: "a1", name: "Armação Aviador Clássico", description: "Design atemporal em metal com hastes confortáveis.", price: 299.9, image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=400&fit=crop", category: "armacao", filters: { formato: "Aviador", material: "Metal", genero: "Unissex" } },
  { id: "a2", name: "Armação Retangular Acetato", description: "Armação moderna em acetato italiano com cores sofisticadas.", price: 349.9, image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop", category: "armacao", filters: { formato: "Retangular", material: "Acetato", genero: "Masculino" } },
  { id: "a3", name: "Armação Cat-Eye Feminina", description: "Estilo gatinho elegante para um visual marcante.", price: 279.9, image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=400&h=400&fit=crop", category: "armacao", filters: { formato: "Cat-Eye", material: "Acetato", genero: "Feminino" } },
  { id: "a4", name: "Armação Redonda Retrô", description: "Inspiração vintage com toque contemporâneo.", price: 259.9, image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop", category: "armacao", filters: { formato: "Redondo", material: "Metal", genero: "Unissex" } },
  { id: "a5", name: "Armação Esportiva Flex", description: "Ultra leve e resistente, ideal para atividades físicas.", price: 319.9, image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=400&fit=crop", category: "armacao", filters: { formato: "Retangular", material: "TR90", genero: "Masculino" } },
  { id: "a6", name: "Armação Quadrada Premium", description: "Design minimalista em titânio para máximo conforto.", price: 449.9, image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop", category: "armacao", filters: { formato: "Quadrado", material: "Titânio", genero: "Unissex" } },
];

export const lensFilters = {
  tipo: ["Visão Simples", "Multifocal", "Bifocal"],
  material: ["Resina", "Policarbonato"],
  tratamento: ["Antirreflexo", "Blue Light", "Fotossensível"],
};

export const frameFilters = {
  formato: ["Aviador", "Retangular", "Cat-Eye", "Redondo", "Quadrado"],
  material: ["Metal", "Acetato", "TR90", "Titânio"],
  genero: ["Masculino", "Feminino", "Unissex"],
};
