package com.apidev.cliente.dtos;

import com.apidev.cliente.entity.ClienteEntity;
import com.apidev.cliente.enums.EnumTipoPessoa;
import com.apidev.endereco.entity.EnderecoEntity;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ClienteDTO {

    private Long id;
    private String nome;
    private String sobrenome;
    private LocalDate dataNascimento;
    private String telefone;
    private EnumTipoPessoa tipoPessoa;
    private String documento;
    private EnderecoEntity endereco;

    public static ClienteDTO of(ClienteEntity clienteEntity) {
        return ClienteDTO
                .builder()
                .id(clienteEntity.getId())
                .nome(clienteEntity.getNome())
                .sobrenome(clienteEntity.getSobrenome())
                .dataNascimento(clienteEntity.getDataNascimento())
                .telefone(clienteEntity.getTelefone())
                .tipoPessoa(clienteEntity.getTipoPessoa())
                .documento(clienteEntity.getDocumento())
                .endereco(clienteEntity.getEndereco())
                .build();
    }
}
