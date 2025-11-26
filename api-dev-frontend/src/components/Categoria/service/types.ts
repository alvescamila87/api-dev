export type CategoriaResponse = {
  id: number | null;
  nome: string;
  descricao: string | null;
};

export type CategoriaList = CategoriaResponse[];

export type CategoriaPageableResponse = {
  content: CategoriaList;
  totalPages: number;
  pageNumber: number;
  pageSize: number;
};

export type CategoriaFilter = {
  nome: string | null;
};
