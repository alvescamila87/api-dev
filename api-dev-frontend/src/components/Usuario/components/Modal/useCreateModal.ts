import {
  ENUM_TIPO_PERMISSAO,
  type TipoPermissao,
  type UsuarioForm,
} from "../../service/types";
import { useUsuarioServiceTanStack } from "../../service/useUsuarioServiceTanStack";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { toast } from "react-toastify";
import { useForm, type SubmitHandler } from "react-hook-form";

const INITIAL_STATE_VALUES: UsuarioForm = {
  id: null,
  nome: "",
  email: "",
  senha: "",
  tipoPermissao: "" as TipoPermissao,
  ativo: true,
};

const schema = yup.object().shape({
  id: yup.number().nullable().default(null),
  nome: yup.string().required("Campo obrigatório"),
  email: yup.string().required("Campo obrigatório"),
  senha: yup
    .string()
    .min(6, "A senha deve possuir pelo menos 6 caracteres")
    .max(25, "A senha deve possuir no máximo 25 caracteres")
    .required("Campo obrigatório"),
  tipoPermissao: yup
    .string()
    .oneOf([...ENUM_TIPO_PERMISSAO, ""])
    .required("Campo obrigatório"),
  ativo: yup.bool().default(true),
});

export const useCreateModal = (onClose: () => void) => {
  const [showPassword, setShowPassword] = useState(false);
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
      toast.success("Usuaário salvo com sucesso!");
      if (onClose) {
        reset();
        onClose();
      }
    },
    onError: (error: any) => {
      if (Array.isArray(error.response?.data)) {
        error.response.data.forEach((msg: string) => toast.error(msg));
      } else {
        toast.error("Erro ao salvar usuário!");
      }
    },
  });

  const onSubmit: SubmitHandler<UsuarioForm> = (formData) => {
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

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return {
    mutateUsuario,
    register,
    handleSubmit,
    errors,
    onSubmit,

    showPassword,
    handleClickShowPassword,
    handleMouseDownPassword,
  };
};
