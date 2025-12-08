const API_URL = "/http://localhost:8080/produto"


export const useProdutoService = () => {

    const axios =

    async function findAll(pageNumber: number, pageSize: number, filter: any) {
        const response = await axios.get(`${API_URL}`, {
            params: {
                page: pageNumber,
                size: pageSize,
                nome: filter,
            }
        })

        return response.data ?? {};
    }

    return { findlAll }
}