import axios from "axios";
import type { CategoriaFilter, CategoriaPageableResponse } from "./types";

const API_URL = "http://localhost:8080/categoria";

export const useCategoriaService = () => {
  async function findAll(
    pageNumber?: number,
    pageSize?: number,
    filters?: CategoriaFilter
  ) {
    const response = await axios.get<CategoriaPageableResponse>(`${API_URL}`, {
      params: {
        page: pageNumber,
        size: pageSize,
        nome: filters,
      },
    });
    return response.data ?? {};
  }

  return {
    findAll,
  };
};
