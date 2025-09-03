import { usuarioServiceTanStack } from "../../service/usuarioServiceTanStack";
import { useQuery } from "@tanstack/react-query";

export const useUsuarioTanStack = () => {
  const { findAll } = usuarioServiceTanStack();

  const query = useQuery({
    queryFn: findAll,
    queryKey: ["usuario-data"],
    retry: 2,
  });

  return {
    ...query,
    data: query?.data?.data, // axios e tanstack fazem a mesma coisa, por isso 2 datas.
  };
};
