package com.apidev.categoria.entity;

import com.apidev.categoria.dtos.CategoriaDTO;
import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.*;

@Entity
@Table(name = "tb_categoria")
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CategoriaEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome", nullable = false, length = 100, unique = true)
    @Size(max = 100)
    private String nome;

    @Column(name = "descricao")
    private String descricao;

    public static CategoriaEntity from(CategoriaDTO categoriaDTO) {
        return CategoriaEntity
                .builder()
                .id(categoriaDTO.getId())
                .nome(categoriaDTO.getNome())
                .descricao(categoriaDTO.getDescricao())
                .build();
    }
}
