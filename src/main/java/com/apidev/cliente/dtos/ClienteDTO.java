package com.apidev.cliente.dtos;

import com.apidev.cliente.entity.ClienteEntity;
import com.apidev.cliente.enums.EnumTipoPessoa;
import com.apidev.endereco.entity.EnderecoEntity;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ClienteDTO {

    private Long id;

    @NotBlank(message = "Nome é um campo obrigatório")
    @Size(max = 255, message = "O nome pode ter ATÉ {max} caracteres")
    private String nome;

    @NotNull(message = "Data de nascimento é um campo obrigatório")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate dataNascimento;

    private String telefone;

    @NotNull(message = "Tipo de pessoa é um campo obrigatório")
    private EnumTipoPessoa tipoPessoa;

    @NotBlank(message = "Documento é um campo obrigatório")
    private String documento;

    @NotNull(message = "Endereço é um obrigatório")
    private EnderecoEntity endereco;

    public static ClienteDTO of(ClienteEntity clienteEntity) {
        return ClienteDTO
                .builder()
                .id(clienteEntity.getId())
                .nome(clienteEntity.getNome())
                .dataNascimento(clienteEntity.getDataNascimento())
                .telefone(clienteEntity.getTelefone())
                .tipoPessoa(clienteEntity.getTipoPessoa())
                .documento(clienteEntity.getDocumento())
                .endereco(clienteEntity.getEndereco())
                .build();
    }
}
