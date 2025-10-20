package com.apidev.endereco.entity;

import com.apidev.cliente.entity.ClienteEntity;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "tb_endereco")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EnderecoEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "logradouro", nullable = false)
    private String logradouro;

    @Column(name = "complemento")
    private String complemento;

    @Column(name = "bairro", nullable = false)
    private String bairro;

    @Column(name = "cidade", nullable = false)
    private String cidade;

    @Column(name = "cep", nullable = false, length = 9, unique = true)
    private String cep;

    @Column(name = "uf", nullable = false, length = 2)
    private String uf;

    @Column(name = "numero")
    private String numero;

    @OneToMany(mappedBy = "cliente")
    private List<ClienteEntity> clientes = new ArrayList<>();
}
