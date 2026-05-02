export type Produto = {
  id: string;
  nome: string;
  categoriaId: string;
  quantidade: number;
  quantidadeMinima: number; // Abaixo disso = alerta de estoque baixo
  preco: number;
  unidade: string;          // "un", "kg", "cx", "L"
  ultimaMovimentacao: string; // ISO date string
};

// ---------------

export const PRODUTOS_MOCK: Produto[] = [
  {
    id: "prod_1",
    nome: "Café Especial 250g",
    categoriaId: "cat_1",
    quantidade: 4,
    quantidadeMinima: 10,
    preco: 32.90,
    unidade: "un",
    ultimaMovimentacao: "2024-11-14T10:30:00Z",
  },
  {
    id: "prod_2",
    nome: "Água Mineral 500ml",
    categoriaId: "cat_1",
    quantidade: 48,
    quantidadeMinima: 24,
    preco: 2.50,
    unidade: "un",
    ultimaMovimentacao: "2024-11-13T14:20:00Z",
  },
  {
    id: "prod_3",
    nome: "Suco de Laranja 1L",
    categoriaId: "cat_1",
    quantidade: 6,
    quantidadeMinima: 12,
    preco: 8.90,
    unidade: "un",
    ultimaMovimentacao: "2024-11-12T09:15:00Z",
  },
  {
    id: "prod_4",
    nome: "Arroz Branco 5kg",
    categoriaId: "cat_2",
    quantidade: 15,
    quantidadeMinima: 5,
    preco: 28.00,
    unidade: "cx",
    ultimaMovimentacao: "2024-11-11T16:45:00Z",
  },
  {
    id: "prod_5",
    nome: "Feijão Carioca 1kg",
    categoriaId: "cat_2",
    quantidade: 3,
    quantidadeMinima: 8,
    preco: 9.50,
    unidade: "un",
    ultimaMovimentacao: "2024-11-10T11:00:00Z",
  },
  {
    id: "prod_6",
    nome: "Azeite Extra Virgem",
    categoriaId: "cat_2",
    quantidade: 2,
    quantidadeMinima: 5,
    preco: 45.00,
    unidade: "un",
    ultimaMovimentacao: "2024-11-09T08:30:00Z",
  },
  {
    id: "prod_7",
    nome: "Detergente 500ml",
    categoriaId: "cat_3",
    quantidade: 22,
    quantidadeMinima: 10,
    preco: 3.99,
    unidade: "un",
    ultimaMovimentacao: "2024-11-08T13:20:00Z",
  },
  {
    id: "prod_8",
    nome: "Sabão em Pó 3kg",
    categoriaId: "cat_3",
    quantidade: 0,
    quantidadeMinima: 4,
    preco: 24.90,
    unidade: "cx",
    ultimaMovimentacao: "2024-11-07T10:10:00Z",
  },
  {
    id: "prod_9",
    nome: "Cabo USB-C 1m",
    categoriaId: "cat_4",
    quantidade: 12,
    quantidadeMinima: 5,
    preco: 29.90,
    unidade: "un",
    ultimaMovimentacao: "2024-11-06T15:00:00Z",
  },
  {
    id: "prod_10",
    nome: "Caneta Esferográfica",
    categoriaId: "cat_5",
    quantidade: 1,
    quantidadeMinima: 20,
    preco: 1.50,
    unidade: "cx",
    ultimaMovimentacao: "2024-11-05T09:45:00Z",
  },
];

// --------

export const getTotalProdutos = () =>
  PRODUTOS_MOCK.length;

export const getProdutosComEstoqueBaixo = () =>
  PRODUTOS_MOCK.filter((p) => p.quantidade < p.quantidadeMinima);

// Retorna o valor total do estoque (quantidade × preço)
export const getValorTotalEstoque = () =>
  PRODUTOS_MOCK.reduce((acc, p) => acc + p.quantidade * p.preco, 0);

// Formata preço em BRL
export const formatarPreco = (valor: number) =>
  valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });