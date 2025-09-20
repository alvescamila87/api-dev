import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";
import {
  ENUM_TIPO_PERMISSAO,
  type TipoPermissao,
  type UsuarioForm,
} from "../../service/types";
import { useUsuarioServiceTanStack } from "../../service/useUsuarioServiceTanStack";
import { mountPayload, responseToForm } from "../../util";

interface UseCreateModalProps {
  onClose: () => void;
  idSelected?: number | null;
  mode: "create" | "edit" | "view";
}

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

export const useCreateModal = ({
  onClose,
  idSelected,
  mode,
}: UseCreateModalProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const { upsert, findById } = useUsuarioServiceTanStack();

  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
    reValidateMode: "onChange",
    defaultValues: INITIAL_STATE_VALUES,
  });

  const { data: usuarioData, isFetching } = useQuery({
    queryKey: ["usuario", idSelected],
    queryFn: () => findById(Number(idSelected!)),
    enabled: !!idSelected,
  });

  useEffect(() => {
    if (usuarioData) {
      reset(responseToForm(usuarioData));
    } else {
      reset(INITIAL_STATE_VALUES);
    }
  }, [usuarioData, reset]);

  const mutateUsuario = useMutation({
    mutationFn: upsert,
    retry: 2,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["usuario-data"] });
      toast.success("Usuário salvo com sucesso!");
      if (onClose) {
        reset(INITIAL_STATE_VALUES);
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
    if (mode === "view") return;

    // mutate.mutate(formData);
    const usuarioForm = mountPayload(formData);

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
    control,

    showPassword,
    handleClickShowPassword,
    handleMouseDownPassword,

    isFetching,
  };
};
