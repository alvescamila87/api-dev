import axios from "axios";
import type { UsuarioPageableResponse } from "./types";

const API_URL = "http://localhost:8080/usuario";

export const usuarioService = () => {
  async function findAll(
    pageNumber: number,
    pageSize: number,
    filters: string
  ) {
    const response = await axios.get<UsuarioPageableResponse>(
      `${API_URL}` + `/paginacao-2-filtro-complexo`,
      {
        params: {
          page: pageNumber,
          size: pageSize,
          nome: filters,
        },
      }
    );
    return response?.data ?? {};
  }

  return {
    findAll,
  };
};
