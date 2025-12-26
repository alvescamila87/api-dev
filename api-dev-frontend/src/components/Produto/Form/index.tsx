import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useConsultaProduto } from "../List/useConsultaProduto";

const schema = yup.object().shape({
  nome: yup.string().required("Campo obrigatório"),
  categoria: yup.string().required("Campo obrigatório"),
});

export function UsuarioForm() {
  const { register, handleSubmit, formState, reset, setFocus } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
    reValidateMode: "onChange",
    defaultValues: {
      nome: "",
      categoria: "",
    },
  });

  const { errors, isSubmitting } = formState;

  const { data, isLoading } = useConsultaProduto();

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
      <h2>Cadastro de produto</h2>

      <label>Nome</label>
      <input type="text" autoFocus placeholder="Nome" {...register("nome")} />
      {errors.nome && <p>{errors.nome.message}</p>}

      <label>Categoria</label>
      <input
        type="text"
        autoFocus
        placeholder="Categoria"
        {...register("categoria")}
      />
      {errors.categoria && <p>{errors.categoria.message}</p>}

      {isLoading ? (
        <p>Loading... </p>
      ) : (
        <>
          {data?.map((product) => (
            <div key={product.id}>
              <p>{product.nome}</p>
            </div>
          ))}
        </>
      )}
    </form>
  );
}
