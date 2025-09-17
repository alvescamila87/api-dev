import type {
  TipoPermissao,
  UsuarioForm,
  UsuarioFormPayload,
  UsuarioResponse,
} from "../service/types";

export const mountPayload = (data: UsuarioForm): UsuarioFormPayload => {
  return {
    id: data.id ?? null,
    nome: data.nome,
    tipoPermissao: data.tipoPermissao,
    email: data.email,
    senha: data.senha,
    ativo: data.ativo,
  } as UsuarioFormPayload;
};

export const responseToForm = (data: UsuarioResponse): UsuarioForm => {
  return {
    id: data.id,
    nome: data.nome,
    tipoPermissao: data.tipoPermissao as TipoPermissao,
    email: data.email,
    senha: data.senha,
    ativo: data.ativo,
  } as UsuarioForm;
};
