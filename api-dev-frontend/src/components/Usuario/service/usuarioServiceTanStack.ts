import axios, { type AxiosResponse } from "axios";
import type { UsuarioPageableResponse } from "./types";

const API_URL = "http://localhost:8080/usuario";

export const usuarioServiceTanStack = () => {
  //  Modelo 1
  // const findAll = async (): Promise<UsuarioPageableResponse> => {
  //   const response: AxiosResponse<UsuarioPageableResponse> = await axios.get(
  //     `${API_URL}` + `/paginacao-2-filtro-complexo`
  //   );
  //   return response?.data ?? {};
  // };

  const findAll = async (): Promise<AxiosResponse<UsuarioPageableResponse>> => {
    const response = await axios.get(
      `${API_URL}` + `/paginacao-2-filtro-complexo`
    );
    return response;
  };

  return {
    findAll,
  };
};
