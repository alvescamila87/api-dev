export type UsuarioResponse = {
  id: number;
  nome: string;
  tipoPermissao: TipoPermissao;
  email: string;
  senha: string;
  ativo: boolean;
};

export type UsuarioForm = {
  id: number | null;
  nome: string;
  tipoPermissao: TipoPermissao | "";
  email: string;
  senha: string;
  ativo: boolean;
};

export type TipoPermissao = "ADMIN" | "GERENTE" | "OPERADOR" | "VISITANTE";

export type UsuarioResponseList = UsuarioResponse[];

export type UsuarioPageableResponse = {
  content: UsuarioResponseList;
  totalPages: number;
  pageNumber: number;
  pageSize: number;
};

export const defaultUsuarioPageableResponse: UsuarioPageableResponse = {
  content: [],
  totalPages: 0,
  pageNumber: 0,
  pageSize: 10,
};

export const ENUM_TIPO_PERMISSAO = [
  "ADMIN",
  "GERENTE",
  "OPERADOR",
  "VISITANTE",
] as const;
