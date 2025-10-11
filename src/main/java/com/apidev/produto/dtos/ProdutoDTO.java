package com.apidev.produto.dtos;

import com.apidev.produto.entity.ProdutoEntity;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProdutoDTO {

    private Long id;
    private String nome;
    private Long categoriaId;

    public static ProdutoDTO of(ProdutoEntity entity) {
        return ProdutoDTO
                .builder()
                .id(entity.getId())
                .nome(entity.getNome())
                .categoriaId(entity.getCategoria().getId())
                .build();
    }
}
