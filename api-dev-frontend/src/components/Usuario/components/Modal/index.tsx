import { useCreateModal } from "./useCreateModal";

export const CreateModal = () => {
  const { register } = useCreateModal();

  return (
    <div className="modal-overflow">
      <div className="modal-body">
        <h2>Cadastro de usuário</h2>

        <form className="input-container" onSubmit={}></form>
      </div>
    </div>
  );
};
