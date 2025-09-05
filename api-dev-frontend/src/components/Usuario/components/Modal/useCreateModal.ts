import { useState } from "react";
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
    formState: {},
    reset,
  } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
    reValidateMode: "onChange",
    defaultValues: currentData?.id ? currentData : INITIAL_STATE_VALUES,
  });

  const { errors, isSubmitting } = formState;
  console.log("Errors: ", errors);
  console.log("isSubmitting: ", isSubmitting);

  const [currentData, setCurrentData] = useState<UsuarioForm | null>(null);

  const mutate = useMutation({
    mutationFn: upsert,
    retry: 2,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["usuario-data"] });
    },
  });

  return { register };
};
