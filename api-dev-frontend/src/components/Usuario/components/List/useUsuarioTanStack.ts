import { useEffect, useState } from "react";
import { useUsuarioServiceTanStack } from "../../service/useUsuarioServiceTanStack";
import { useQuery } from "@tanstack/react-query";
import { type UsuarioPageableResponse } from "../../service/types";

export const useUsuarioTanStack = () => {
  const { findAll } = useUsuarioServiceTanStack();

  const [filters, setFilters] = useState<string>("");
  const [debouncedFilters, setDebouncedFilters] = useState<string>("");

  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedFilters(filters);
      setPageNumber(0);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [filters]);

  const query = useQuery<UsuarioPageableResponse>({
    queryFn: async () => {
      console.log("🔎 Chamando API...", {
        pageNumber,
        pageSize,
        debouncedFilters,
      });
      return await findAll(pageNumber, pageSize, debouncedFilters);
    },
    queryKey: ["usuario-data", pageNumber, pageSize, debouncedFilters],
    retry: 2,
  });

  const handleControlModal = () => {
    console.log("Cliquei no botão novo");
    setOpenModal((prevState) => !prevState);
  };

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
    ...query,
    usuarios: query?.data?.content ?? [],
    totalPages: query?.data?.totalPages ?? 0,

    pageNumber,
    handlePageNumberChange,
    pageSize,
    handlePageSizeChange,
    filters,
    handleFiltersChange,

    openModal,
    handleControlModal,
  };
};
