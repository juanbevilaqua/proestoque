export type Categoria = {
  id: string;
  nome: string;
  icone: string; // Nome do ícone Ionicons
  cor: string;   // Cor hex para o badge
};

export const CATEGORIAS_MOCK: Categoria[] = [
  { id: "cat_1", nome: "Bebidas",      icone: "cafe-outline",        cor: "#7c3aed" },
  { id: "cat_2", nome: "Alimentos",    icone: "fast-food-outline",   cor: "#059669" },
  { id: "cat_3", nome: "Limpeza",      icone: "sparkles-outline",    cor: "#0284c7" },
  { id: "cat_4", nome: "Eletrônicos",  icone: "hardware-chip-outline",cor: "#d97706" },
  { id: "cat_5", nome: "Papelaria",    icone: "document-outline",    cor: "#db2777" },
];

// -----

export const getTotalCategorias = () =>
  CATEGORIAS_MOCK.length;

