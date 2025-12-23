import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useConsultaProduto } from "./useConsultaProduto";
import { AddIcCallOutlined } from "@mui/icons-material";
import { ConfirmDeleteDialog } from "../../Usuario/components/ConfirmeDeleteDialog";

export const ConsultaProduto = () => {
  const {
    produtos,
    isFetching,
    totalPages,
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
  } = useConsultaProduto();
  return (
    <>
      <Box sx={{ p: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Lista de Produtos
          </Typography>

          <Button
            variant="contained"
            startIcon={<AddIcCallOutlined />}
            onClick={console.log}
          >
            Novo
          </Button>
        </Box>

        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <TextField
            label="Filtrar por nome"
            variant="outlined"
            value={console.log}
            onChange={console.log}
            fullWidth
            size="small"
          />

          <FormControl sx={{ minWidth: 120 }} size="small">
            <InputLabel>Itens/Página</InputLabel>
            <Select
              value={pageSize}
              label="Itens/Página"
              onChange={console.log}
            >
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={25}>25</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">ID</TableCell>
                <TableCell align="right">Categoria</TableCell>
                <TableCell align="center">Ações</TableCell>
              </TableRow>
            </TableHead>
            {isFetching ? (
              <CircularProgress />
            ) : (
              <TableBody>
                {produtos?.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="right">{row.id}</TableCell>

                    <TableCell align="right">{row.nome}</TableCell>
                    <TableCell align="center">
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          gap: 1,
                        }}
                      >
                        <IconButton
                          aria-label="visualizar"
                          color="primary"
                          onClick={() => {
                            handleOpenViewModal(row.id);
                          }}
                        >
                          <VisibilityIcon />
                        </IconButton>
                        <IconButton
                          aria-label="editar"
                          color="warning"
                          onClick={() => handleOpenEditModal(row.id)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          aria-label="excluir"
                          color="error"
                          onClick={() => handleOpenDeleteDialog(row.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
        </TableContainer>

        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Pagination
            count={totalPages}
            page={pageNumber + 1}
            onChange={handlePageNumberChange}
            siblingCount={0}
            boundaryCount={1}
            color="primary"
          />
        </Box>
      </Box>

      {openModal && (
        <CreateModal
          onClose={handleControlModal}
          idSelected={selectId!}
          mode={modalMode}
        />
      )}

      {openDeleteDialog && (
        <ConfirmDeleteDialog
          onClose={handleCloseDeleteDialog}
          onConfirm={handleConfirmDelete}
        />
      )}
    </>
  );
};
