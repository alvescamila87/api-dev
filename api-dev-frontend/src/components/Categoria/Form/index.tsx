import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yupResolver.object().shape({
  nome: yup.string().required("Campo obrigatório"),
});

export function CategoriaForm() {
  const { register, handleSubmit, formState, reset, setFocus } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
    reValidateMode: "onChange",
    defaultValues: {
      nome: "",
    },
  });

  const { errors, isSubmitting } = formState;

  const { data, isLoading } = useCategoria();

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

      <div className="form-group">
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Enviando" : "Salvar"}
        </button>
      </div>

      {isLoading ? (
        <p>Loading... </p>
      ) : (
        <>
          {data?.map((category) => (
            <div key={category.id}>
              <p>{category.nome}</p>
            </div>
          ))}
        </>
      )}
    </form>
  );
}
