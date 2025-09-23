import axios from "axios";
import type { UsuarioResponseList } from "./types";

const BASE_URL = "http://localhost:8080/usuario";

export const usuarioService = () => {
  // async function findAll(pageNumber: number, pageSize: number) {
  //   const response = await axios.get<UsuarioResponseList>(
  //     `${BASE_URL}/paginacao-2-filtro-complexo`,
  //     {
  //       params: {
  //         pageNumber,
  //         pageSize,
  //       },
  //     }
  //   );
  //   return response?.data ?? {};
  // }

  async function findAll() {
    const response = await axios.get<UsuarioResponseList>(
      `${BASE_URL}/paginacao-2-filtro-complexo`
    );
    return response?.data ?? {};
  }

  return {
    findAll,
  };
};
