import {
  ENUM_TIPO_PERMISSAO,
  type TipoPermissao,
  type UsuarioForm,
} from "../../service/types";
import { useUsuarioServiceTanStack } from "../../service/useUsuarioServiceTanStack";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const INITIAL_STATE_VALUES: UsuarioForm = {
  id: null,
  nome: null,
  email: null,
  senha: null,
  tipoPermissao: "" as TipoPermissao,
  ativo: true,
};

const schema = yup.object().shape({
  id: yup.number().nullable(),
  nome: yup.string().required("Campo obrigatório"),
  email: yup.string().required("Campo obrigatório"),
  senha: yup.string().required("Campo obrigatório"),
  tipoPermissao: yup
    .string()
    .oneOf(ENUM_TIPO_PERMISSAO)
    .required("Campo obrigatório"),
  ativo: yup.bool().nullable(),
});

export const useCreateModal = () => {
  const { upsert } = useUsuarioServiceTanStack();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
    reValidateMode: "onChange",
    defaultValues: INITIAL_STATE_VALUES,
  });

  const mutateUsuario = useMutation({
    mutationFn: upsert,
    retry: 2,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["usuario-data"] });
      // reset(),
    },
  });

  const onSubmit = (formData: UsuarioForm) => {
    // mutate.mutate(formData);
    const usuarioForm: UsuarioForm = {
      id: formData?.id,
      nome: formData?.nome,
      tipoPermissao: formData?.tipoPermissao,
      email: formData?.email,
      senha: formData?.senha,
      ativo: formData?.ativo,
    };

    mutateUsuario.mutate(usuarioForm);
  };

  return {
    mutateUsuario,
    register,
    handleSubmit,
    errors,
    onSubmit,
  };
};
