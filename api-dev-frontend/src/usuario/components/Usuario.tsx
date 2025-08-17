import { useForm } from "react-hook-form";

export function Usuario() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  }; // função que executa SE o forme estiver com dados válidos

  return (
    <div className="app-container">
      <div className="form-group">
        <label>Nome completo</label>
        <input type="text" placeholder="Nome completo" {...register("name")} />
      </div>

      <div className="form-group">
        <button onClick={() => handleSubmit(onSubmit)()}>Salvar</button>
      </div>
    </div>
  );
}
