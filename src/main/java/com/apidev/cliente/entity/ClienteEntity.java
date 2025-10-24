package com.apidev.cliente.entity;

import com.apidev.cliente.dtos.ClienteDTO;
import com.apidev.cliente.enums.EnumTipoPessoa;
import com.apidev.endereco.entity.EnderecoEntity;
import jakarta.persistence.*;
import jakarta.servlet.http.PushBuilder;
import lombok.*;
import org.springframework.beans.BeanUtils;

import java.time.LocalDate;

@Entity
@Table(name = "tb_cliente")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ClienteEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome", nullable = false)
    private String nome;

    @Column(name = "sobrenome", nullable = false)
    private String sobrenome;

    @Column(name = "data_nascimento", nullable = false)
    private LocalDate dataNascimento;

    @Column(name = "telefone", nullable = false)
    private String telefone;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_pessoa", nullable = false)
    private EnumTipoPessoa tipoPessoa;

    @Column(name = "documento", nullable = false)
    private String documento;

    @ManyToOne
    @JoinColumn(name = "endereco_id", referencedColumnName = "id")
    private EnderecoEntity endereco;

    public ClienteEntity (ClienteDTO clienteDTO) {
        BeanUtils.copyProperties(this, clienteDTO);
    }

    public static ClienteEntity from(ClienteDTO clienteDTO) {
        return ClienteEntity
                .builder()
                .id(clienteDTO.getId())
                .nome(clienteDTO.getNome())
                .sobrenome(clienteDTO.getSobrenome())
                .dataNascimento(clienteDTO.getDataNascimento())
                .telefone(clienteDTO.getTelefone())
                .tipoPessoa(clienteDTO.getTipoPessoa())
                .documento(clienteDTO.getDocumento())
                .endereco(clienteDTO.getEndereco())
                .build();
    }
}
