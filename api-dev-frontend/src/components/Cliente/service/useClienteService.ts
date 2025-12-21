import axios from "axios";
import type { ClienteFilters, ClientePageableResponse } from "./types";

export const useClienteoService = () => {
  const API_URL = "/clientes";

  async function findAll(
    pageNumber: number,
    pageSize: number,
    filters: ClienteFilters
  ) {
    const response = await axios.get<ClientePageableResponse>(`${API_URL}`, {
      params: {
        pageNumber,
        pageSize,
        filters,
      },
    });

    return response.data ?? {};
  }

  return {
    findAll,
  };
};
