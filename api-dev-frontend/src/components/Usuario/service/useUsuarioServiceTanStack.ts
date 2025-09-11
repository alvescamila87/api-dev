import axios, { Axios, type AxiosResponse } from "axios";
import { type UsuarioForm, type UsuarioPageableResponse } from "./types";

const API_URL = "http://localhost:8080/usuario";

export const useUsuarioServiceTanStack = () => {
  //  Modelo 1
  // const findAll = async (): Promise<UsuarioPageableResponse> => {
  //   const response: AxiosResponse<UsuarioPageableResponse> = await axios.get(
  //     `${API_URL}` + `/paginacao-2-filtro-complexo`
  //   );
  //   return response?.data ?? {};
  // };

  const findAll = async (
    pageNumber?: number,
    pageSize?: number,
    filters?: string
  ): Promise<UsuarioPageableResponse> => {
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
    return response?.data;
  };

  const findById = async (id: number) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response?.data ?? {};
  };

  const upsert = async (data: UsuarioForm) => {
    let response: AxiosResponse<UsuarioForm>;

    if (data?.id) {
      response = await axios.put(`${API_URL}/${data.id}`, data);
    } else {
      response = await axios.post(`${API_URL}`, data);
    }
    return response;
  };

  return {
    findAll,
    findById,
    upsert,
  };
};
