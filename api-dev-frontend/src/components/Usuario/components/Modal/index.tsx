import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useCreateModal } from "./useCreateModal";
// import type { AxiosError } from "axios";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Controller } from "react-hook-form";
import { TipoPermissaoDescription } from "../../service/types";
import "./modal.css";

interface CreateModalProps {
  onClose: () => void;
  idSelected?: number | null;
  mode?: "view" | "create" | "edit";
}

export const CreateModal = ({
  onClose,
  idSelected,
  mode = "create",
}: CreateModalProps) => {
  const {
    mutateUsuario,
    register,
    handleSubmit,
    errors,
    onSubmit,
    control,

    showPassword,
    handleClickShowPassword,
    handleMouseDownPassword,

    isFetching,
  } = useCreateModal({ onClose, idSelected, mode });

  const isView = mode === "view";

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-body">
        {idSelected ? <h2>Edição de usuário</h2> : <h2>Dados de usuário</h2>}

        <Box
          component="form"
          className="input-container"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="Nome"
            {...register("nome")}
            defaultValue={""}
            required
            fullWidth
            margin="normal"
            error={!!errors.nome}
            helperText={errors.nome?.message}
            disabled={isView}
          />
          <TextField
            label="E-mail"
            type="email"
            {...register("email")}
            defaultValue={""}
            required
            fullWidth
            margin="normal"
            error={!!errors.email}
            helperText={errors.email?.message}
            disabled={isView}
          />
          <TextField
            label="Senha"
            type={showPassword ? "text" : "password"}
            defaultValue={""}
            {...register("senha")}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            fullWidth
            required
            margin="normal"
            error={!!errors.senha}
            helperText={errors.senha?.message}
            disabled={isView}
          />
          <FormControl
            fullWidth
            margin="normal"
            error={!!errors.tipoPermissao}
            disabled={isView}
            required
          >
            <InputLabel>Tipo de Permissão</InputLabel>
            <Controller
              name="tipoPermissao"
              control={control}
              render={({ field }) => (
                <Select
                  labelId="tipo-permissao-label"
                  label="Tipo de Permissão"
                  {...field}
                  disabled={isView}
                >
                  <MenuItem value="" disabled>
                    Selecione uma opção
                  </MenuItem>
                  {Object.entries(TipoPermissaoDescription).map(
                    ([value, label]) => (
                      <MenuItem key={value} value={value}>
                        {label}
                      </MenuItem>
                    )
                  )}
                </Select>
              )}
            />
            {errors.tipoPermissao && (
              <Typography color="error" variant="caption" sx={{ ml: 2 }}>
                {errors.tipoPermissao.message}
              </Typography>
            )}
          </FormControl>
          <FormControlLabel
            control={<Checkbox {...register("ativo")} defaultChecked />}
            label="Usuário ativo"
          />
          {isView && (
            <div
              style={{ display: "flex", justifyContent: "flex-end", gap: 5 }}
            >
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={mutateUsuario.isPending || mode === "view"}
              >
                Salvar
              </Button>
              <Button
                variant="outlined"
                color="primary"
                type="reset"
                onClick={onClose}
                disabled={mutateUsuario.isPending}
              >
                Cancelar
              </Button>
            </div>
          )}
        </Box>
        {/* {mutateUsuario.isPending && <Typography>Salvando...</Typography>}
        {mutateUsuario.isError && (
          <Typography color="error">
            Ocorreu um erro: {(mutateUsuario.error as AxiosError).message}
          </Typography>
        )}
        {mutateUsuario.isSuccess && (
          <Typography color="primary">Usuário salvo com sucesso!</Typography>
        )} */}
      </div>
    </div>
  );
};
