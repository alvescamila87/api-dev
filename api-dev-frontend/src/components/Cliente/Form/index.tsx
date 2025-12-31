import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useConsultaCliente } from "../List/useConsultaCliente";

const schema = yup.object().shape({
  nome: yup.string().required("Campo obrigatório"),
  dataNascimento: yup.string().required("Campo obrigatório"),
  tipoPessoa: yup.string().required("Campo obrigatório"),
  documento: yup.string().required("Campo obrigatório")
  cep: yup.string().required("Campo obrigatório"),
  logradouro: yup.string().required("Campo obrigatório")

});

export function ClienteForm() {
  const { register, handleSubmit, formState, reset, setFocus } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
    reValidateMode: "onChange",
    defaultValues: {
      nome: "",
      dataNascimento: "",
      tipoPessoa: "FISICA",
      documento: "",
      cep: "",
      logradouro: "",
      numero: "",
      complemento: "",
      bairro: "",
      municipio: ""
      uf: ""
    },
  });

  const { errors, isSubmitting } = formState;

  const { data, isLoading } = useConsultaCliente();

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
      <h2>Cadastro de cliente</h2>

      <label>Nome</label>
      <input
        type="text"
        autoFocus
        placeholder="Nome"
        {...register("nome")}
        required
      />
      {errors.nome && <p>{errors.nome.message}</p>}

      <label>Data nascimento</label>
      <input
        type="text"
        autoFocus
        placeholder="Data nascimento"
        {...register("dataNascimento")}
      />
      {errors.dataNascimento && <p>{errors.dataNascimento.message}</p>}

      <div className="form-group">
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Enviando" : "Salvar"}
        </button>
      </div>

      {isLoading ? (
        <p>Loading... </p>
      ) : (
        <>
          {data?.map((client) => (
            <div key={client.id}>
              <p>{client.nome}</p>
            </div>
          ))}
        </>
      )}
    </form>
  );
}
