import {useEffect, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {useProdutoService} from "../service/useProdutoService.ts";
import type {ProdutoFilter, ProdutoPageableResponse} from "../service/types.ts";

export const useConsultaProduto = () => => {
    const { findlAll } = useProdutoService();

    const [filters, setFilters] = useState<ProdutoFilter | null>(null);
    const [debouncedFilters, setDebouncedFilters] = useState<string>("");

    const [pageNumber, setPageNumber] = useState(0);
    const [pageSize, setPageSize] = useState(10);

    const [openModal, setOpenModal] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

    const [modalMode, setModalMode] = useState<"create" | "edit" | "view">(
        "create"
    );

    const [selectId, setSelectId] = useState<number | null>(null);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setDebouncedFilters(filters);
            setPageNumber(0);
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [filters]);

    const query = useQuery<ProdutoPageableResponse>({
        queryFn: async () => {
            console.log("🔎 Chamando API...", {
                pageNumber,
                pageSize,
                debouncedFilters,
            });
            return await findAll(pageNumber, pageSize, filters);
        },
        queryKey: ["produto-data", pageNumber, pageSize, debouncedFilters],
        retry: 2,
    });

    const handleControlModal = () => {
        setOpenModal((prevState) => !prevState);
        if (openModal) {
            setSelectId(null);
        }
        setModalMode("create");
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

    const handleOpenViewModal = (id: number) => {
        setSelectId(id);
        setOpenModal(true);
        setModalMode("view");
    };

    const handleOpenEditModal = (id: number) => {
        setSelectId(id);
        setOpenModal(true);
        setModalMode("edit");
    };

    const handleOpenDeleteDialog = (id: number) => {
        setOpenDeleteDialog(true);
        setSelectId(id);
    };

    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
    };

    return {
        ...query,
        produtos: query?.data?.content ?? [],
        totalPages: query?.data?.totalPages ?? 0,

        pageNumber,
        handlePageNumberChange,
        pageSize,
        handlePageSizeChange,
        filters,
        handleFiltersChange,

        modalMode,

        openModal,
        handleControlModal,

        selectId,
        handleOpenViewModal,

        handleOpenEditModal,

        openDeleteDialog,
        handleOpenDeleteDialog,
        handleCloseDeleteDialog,
    };
};
