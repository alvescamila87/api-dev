import { useCategoriaService } from "../service/useCategoriaService";

export const useConsultaCategoria = () => {
  const { findAll } = useCategoriaService();

  async function fetchList() {
    try {
      const response = await findAll();
      return response.content;
    } catch (error) {
      console.error(error);
    }
  }

  return {
    fetchList,
  };
};
