export const useClienteoService = () => {
  const BASE_URL = "/clientes";

  async function findAll() {
    const response = await axios.get(``);
  }

  return {
    findAll,
  };
};
