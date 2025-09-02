import axios from "axios";
import type { UsuarioResponseList } from "./types";

const BASE_URL = "http://localhost:8080/usuario";

export const usuarioService = () => {
  async function findAll(
    pageNumber: number,
    pageSize: number,
    filters: string
  ) {
    const response = await axios.get<UsuarioResponseList>(
      `${BASE_URL}/paginacao-2-filtro-complexo`,
      {
        params: {
          pageNumber,
          pageSize,
          filters,
        },
      }
    );
    return response?.data ?? {};
  }

  return {
    findAll,
  };
};
