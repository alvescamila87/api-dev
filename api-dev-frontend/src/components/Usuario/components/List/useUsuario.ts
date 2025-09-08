import { useCallback, useEffect, useState } from "react";
import type { UsuarioResponseList } from "../../service/types";
import { useUsuarioService } from "../../service/useUsuarioService";

export const useUsuario = () => {
  const [filters, setFilters] = useState<string>("");
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  useUsuarioService();

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<UsuarioResponseList | null>(null);

  const fetchList = useCallback(async () => {
    try {
      const { findAll } = useUsuarioService();
      const response = await findAll(pageNumber, pageSize, filters);
      console.log("DATA", response);
      setData(response?.content);
      setTotalPages(response?.totalPages);
    } catch (error) {
      console.error("Ocorreu um erro ao buscar dados de usuário.", error);
    } finally {
      setIsLoading(false);
    }
  }, [pageNumber, pageSize, filters]);

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  const handlePageNumberChange = (event: any, value: number) => {
    setPageNumber(value - 1);
  };

  const handlePageSizeChange = (event: any) => {
    setPageSize(Number(event.target.value));
    setPageNumber(0);
  };

  const handleFiltersChange = (event: any) => {
    setFilters(event.target.value);
    setPageNumber(0);
  };

  return {
    data,
    isLoading,

    pageNumber,
    handlePageNumberChange,
    pageSize,
    handlePageSizeChange,
    filters,
    handleFiltersChange,
    totalPages,
  };
};
