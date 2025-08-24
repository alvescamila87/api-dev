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
