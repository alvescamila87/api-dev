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
  nome: string | null;
  tipoPermissao: TipoPermissao | null;
  email: string | null;
  senha: string | null;
  ativo: boolean | null;
};

export type TipoPermissao = "ADMIN" | "GERENTE" | "OPERADOR" | "VISITANTE";

export type UsuarioResponseList = UsuarioResponse[];

// export const enum EnumTipoPermissao {
//   ADMIN = "ADMIN",
//   GERENTE = "GERENTE",
//   OPERADOR = "OPERADOR",
//   VISITANTE = "VISITANTE",
// }

export const ENUM_TIPO_PERMISSAO = [
  "ADMIN",
  "GERENTE",
  "OPERADOR",
  "VISITANTE",
] as const;
