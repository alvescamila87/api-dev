import axios, { Axios, type AxiosResponse } from "axios";
import type { UsuarioForm, UsuarioPageableResponse } from "./types";

const API_URL = "http://localhost:8080/usuario";

export const useUsuarioServiceTanStack = () => {
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

  const upsert = async (data: UsuarioForm) => {
    let response: AxiosResponse<UsuarioForm>;

    if (data?.id) {
      response = await axios.put(`${API_URL}/usuario/${data.id}`, data);
    } else {
      response = await axios.post(`${API_URL}/usuario`, data);
    }
    return response;
  };

  return {
    findAll,
    upsert,
  };
};
