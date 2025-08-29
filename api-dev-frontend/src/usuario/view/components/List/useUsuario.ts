import { useCallback, useEffect, useState } from "react";
import type { UsuarioResponseList } from "../../../service/types";
import { usuarioService } from "../../../service/usuarioService";

const INITIAL_STATE_VALUES = {
  data: [],
  pageSize: 0,
  currentPage: 1,
  pageNumber: 10,
};

export const useUsuario = () => {
  const { findAll } = usuarioService();

  //const [pageNumber, setPageNumber] = useState(0);
  //const [pageSize, setPageSize] = useState(10);

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<UsuarioResponseList>([]);

  // const fetchAll = useCallback(async () => {
  //   try {
  //     setLoading(true);
  //     const response = await findAll(pageNumber, pageSize);
  //     console.log("DATA", response);
  //     setLoading(false);
  //     setData(response);
  //   } catch (error) {
  //     console.error(error, "Ocorreu um erro ao buscar dados de usuário.");
  //   } finally {
  //     setLoading(false);
  //   }
  // }, [findAll, pageNumber, pageSize]);

  const fetchList = useCallback(async () => {
    try {
      setIsLoading(true);
      const { findAll } = usuarioService();
      const response = await findAll();
      console.log("DATA", response);
      setData(response?.content);
    } catch (error) {
      console.error("Ocorreu um erro ao buscar dados de usuário.", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  return {
    data,
    isLoading,

    //setPageNumber,
    //setPageSize,
  };
};
