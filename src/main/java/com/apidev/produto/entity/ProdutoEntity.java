package com.apidev.produto.entity;

import com.apidev.categoria.entity.CategoriaEntity;
import com.apidev.produto.dtos.ProdutoDTO;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.beans.BeanUtils;


@Entity
@Table(name = "tb_produto")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProdutoEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome", nullable = false)
    private String nome;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "categoria_id", referencedColumnName = "id")
    private CategoriaEntity categoria;

    public ProdutoEntity(ProdutoDTO dto) {
        BeanUtils.copyProperties(dto, this);
    }

    public static ProdutoEntity from(ProdutoDTO dto) {

        CategoriaEntity categoria = dto.getCategoriaId() != null
                ? CategoriaEntity.builder().id(dto.getCategoriaId()).build()
                : null;

        return ProdutoEntity
                .builder()
                .id(dto.getId())
                .nome(dto.getNome())
                .categoria(categoria)
                .build();
    }
}
