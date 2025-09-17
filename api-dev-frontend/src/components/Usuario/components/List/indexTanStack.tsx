import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
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
  TextField,
  Typography,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { CreateModal } from "../Modal";
import { useUsuarioTanStack } from "./useUsuarioTanStack";
// import { CreateModal } from "../Modal";

export default function ListaUsuarioTanStack() {
  const {
    usuarios,
    isFetching,

    pageNumber,
    handlePageNumberChange,
    pageSize,
    handlePageSizeChange,
    filters,
    handleFiltersChange,
    totalPages,

    openModal,
    handleControlModal,

    selectId,
    handleOpenViewModal,
  } = useUsuarioTanStack();
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
            Lista de Usuários - TANSTACK
          </Typography>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleControlModal}
          >
            Novo
          </Button>
        </Box>

        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <TextField
            label="Filtrar por nome"
            variant="outlined"
            value={filters}
            onChange={handleFiltersChange}
            fullWidth
            size="small"
          />

          <FormControl sx={{ minWidth: 120 }} size="small">
            <InputLabel>Itens/Página</InputLabel>
            <Select
              value={pageSize}
              label="Itens/Página"
              onChange={handlePageSizeChange}
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
                <TableCell align="right">Nome</TableCell>
                <TableCell align="right">E-mail</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Tipo Permissão</TableCell>
                <TableCell align="center">Ações</TableCell>
              </TableRow>
            </TableHead>
            {isFetching ? (
              <CircularProgress />
            ) : (
              <TableBody>
                {usuarios?.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="right">{row.id}</TableCell>

                    <TableCell align="right">{row.nome}</TableCell>
                    <TableCell align="right">{row.email}</TableCell>
                    <TableCell align="right">
                      {row.ativo ? "Ativo" : "Inativo"}
                    </TableCell>
                    <TableCell align="right">{row.tipoPermissao}</TableCell>
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
                          //onClick={() => console.log("Visualizar", row.id)}
                          onClick={() => handleOpenViewModal(row.id)}
                        >
                          <VisibilityIcon />
                        </IconButton>
                        <IconButton
                          aria-label="editar"
                          color="warning"
                          onClick={() => console.log("Editar", row.id)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          aria-label="excluir"
                          color="error"
                          onClick={() => console.log("Excluir", row.id)}
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
        <CreateModal onClose={handleControlModal} idSelected={selectId!} />
      )}
    </>
  );
}
