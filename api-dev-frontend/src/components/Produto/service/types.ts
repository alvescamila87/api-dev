export type ProdutoResponse = {
    id: number | null,
    categoria: number | null,
    nome: string | null;
}

export type ProdutoList = ProdutoResponse[];

export type ProdutoPageableResponse = {
    content: ProdutoList;
    totalPages: number;
    pageNumber: number;
    pageSize: number;

}