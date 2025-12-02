import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { ENUM_TIPO_PERMISSAO, type TipoPermissao } from "../../service/types";
import { useUsuario } from "../List/useUsuario";

const schema = yup.object().shape({
  nome: yup.string().required("Campo obrigatório"),
  //permissao: Yup.mixed<TipoPermissao>().required("Campo obrigatório"),
  permissao: yup
    .string()
    .oneOf(ENUM_TIPO_PERMISSAO)
    .required("Campo obrigatório"),
  email: yup.string().required("Campo obrigatório"),
  senha: yup
    .string()
    .min(6, "A senha precisa ter pelo menos 6 caracteres.")
    .required("Campo obrigatório"),
  ativo: yup.bool().nullable(),
});

export function UsuarioForm() {
  const { register, handleSubmit, formState, reset, setFocus } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
    reValidateMode: "onChange",
    defaultValues: {
      nome: "",
      //permissao: null,
      permissao: "" as TipoPermissao,
      email: "",
      senha: "",
      ativo: true,
    },
  });

  const { errors, isSubmitting } = formState;

  const { data, isLoading } = useUsuario();

  console.log("Errors: ", errors);
  console.log("isSubmitting: ", isSubmitting);

  // useEffect(() => {
  //   setFocus("nome");
  // }, [setFocus]);

  const handleSubmitData = (data: any) => {
    console.log("submit", data);
    reset();
  }; // função que executa SE o forme estiver com dados válidos

  return (
    <form onSubmit={handleSubmit(handleSubmitData)}>
      <h2>Cadastro de usuário</h2>

      <label>Nome completo</label>
      <input
        type="text"
        autoFocus
        placeholder="Nome completo"
        {...register("nome")}
      />
      {errors.nome && <p>{errors.nome.message}</p>}

      <label>Permissão</label>
      <select {...register("permissao")}>
        <option value={""}>Selecione uma permissão</option>
        {Object.values(ENUM_TIPO_PERMISSAO).map((permissao, index) => (
          <option key={index} value={permissao}>
            {permissao}
          </option>
        ))}
      </select>
      {errors.permissao && <p>{errors.permissao.message}</p>}

      <label>E-mail</label>
      <input
        type="email"
        placeholder="email@server.com"
        {...register("email")}
      />
      {errors.email && <p>{errors.email.message}</p>}

      <label>Senha</label>
      <input
        type="password"
        placeholder="6 caracteres"
        {...register("senha")}
      />
      {errors.senha && <p>{errors.senha.message}</p>}

      <label>Ativo</label>
      <input type="checkbox" {...register("ativo")} />
      {errors.ativo && <p>{errors.ativo.message}</p>}

      <div className="form-group">
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Enviando" : "Salvar"}
        </button>
      </div>

      {isLoading ? (
        <p>Loading... </p>
      ) : (
        <>
          {data?.map((user) => (
            <div key={user.id}>
              <p>{user.nome}</p>
            </div>
          ))}
        </>
      )}
    </form>
  );
}
