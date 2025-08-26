import axios from "axios";
import type { UsuarioResponseList } from "./types";

const BASE_URL = "http://localhost:8080/usuario";
//const BASE_URL = "/";

export const usuarioService = () => {
  async function findAll() {
    const response = await axios.get<UsuarioResponseList>(BASE_URL);
    return response?.data ?? {};
  }

  return {
    findAll,
  };
};
