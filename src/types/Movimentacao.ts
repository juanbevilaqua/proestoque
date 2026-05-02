export type Movimentacao = {
  id: string;
  produtoId: string;
  tipo: "entrada" | "saida";
  quantidade: number;
  data: string;
  observacao?: string;
};

// -----------

export const MOVIMENTACOES_MOCK: Movimentacao[] = [
  { id: "mov_1", produtoId: "prod_2", tipo: "entrada", quantidade: 24, data: "2024-11-13T14:20:00Z", observacao: "Reposição semanal" },
  { id: "mov_2", produtoId: "prod_1", tipo: "saida",   quantidade: 6,  data: "2024-11-14T10:30:00Z" },
  { id: "mov_3", produtoId: "prod_8", tipo: "saida",   quantidade: 4,  data: "2024-11-07T10:10:00Z", observacao: "Fim do estoque" },
  { id: "mov_4", produtoId: "prod_4", tipo: "entrada", quantidade: 10, data: "2024-11-11T16:45:00Z" },
  { id: "mov_5", produtoId: "prod_5", tipo: "saida",   quantidade: 5,  data: "2024-11-10T11:00:00Z" },
];