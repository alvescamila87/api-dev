export type ClienteResponse = {
  id: number | null;
  nome: string | null;
};

export type ClienteFilters = {
  nome: string | null;
};

export type ClienteList = ClienteResponse[];

export type ClientePageableResponse = {
  content: ClienteList;
  totalPages: number;
  pageNumber: number;
  pageSize: number;
};
