import axios from "axios";
import type { CategoriaFilter, CategoriaPageableResponse } from "./types";

const API_URL = "http://localhost:8080/categoria";

export const useCategoriaService = () => {
  
    async function findAll(
    filters?: CategoriaFilter,
    pageNumber?: number,
    pageSize?: number
  ) {
    const response = await axios.get<CategoriaPageableResponse>(`${API_URL}`, {
      params: {
        nome: filters,
        page: pageNumber,
        size: pageSize,
      },
    });
    return response.data ?? {};
  }

  return {
    findAll,
  };
};
