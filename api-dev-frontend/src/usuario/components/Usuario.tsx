import { useForm } from "react-hook-form";

export function Usuario() {
  const { register, handleSubmit } = useForm({
    mode: "all",
  });

  const handleSubmitData = (data: any) => {
    console.log("submit", data);
  }; // função que executa SE o forme estiver com dados válidos

  return (
    <form onSubmit={handleSubmit(handleSubmitData)}>
      <h2>Cadastro de usuário</h2>

      <label>Nome completo</label>
      <input type="text" placeholder="Nome completo" {...register("name")} />

      <label>E-mail</label>
      <input
        type="email"
        placeholder="email@server.com"
        {...register("email")}
      />

      <div className="form-group">
        <button type="submit">Salvar</button>
      </div>
    </form>
  );
}
