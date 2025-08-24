import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const schema = Yup.object().shape({
  nome: Yup.string().required("Campo obrigatório"),
  email: Yup.string().required("Campo obrigatório"),
  senha: Yup.string()
    .min(6, "A senha precisa ter pelo menos 6 caracteres.")
    .required("Campo obrigatório"),
});

export function Usuario() {
  const { register, handleSubmit, formState, reset } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
    defaultValues: {
      nome: "",
      email: "",
      senha: "",
    },
  });

  const { errors, isSubmitting } = formState;

  console.log("Errors: ", errors);
  console.log("isSubmitting: ", isSubmitting);

  const handleSubmitData = (data: any) => {
    console.log("submit", data);
    reset();
  }; // função que executa SE o forme estiver com dados válidos

  return (
    <form onSubmit={handleSubmit(handleSubmitData)}>
      <h2>Cadastro de usuário</h2>

      <label>Nome completo</label>
      <input type="text" placeholder="Nome completo" {...register("nome")} />
      {errors.nome && <p>{errors.nome.message}</p>}

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

      <div className="form-group">
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Enviando" : "Salvar"}
        </button>
      </div>
    </form>
  );
}
