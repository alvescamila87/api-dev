package com.apidev.categoria.dtos;

import com.apidev.categoria.entity.CategoriaEntity;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.springframework.beans.BeanUtils;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CategoriaDTO {

    private Long id;

    @NotBlank(message = "Nome é um campo obrigatório")
    @Size(max = 100, message = "O nome pode ter no máximo {max} caracteres")
    private String nome;

    @NotBlank(message = "Descrição é um campo obrigatório")
    private String descricao;

    public  CategoriaDTO (CategoriaEntity entity) {
        BeanUtils.copyProperties(entity, this);
    }

    public static CategoriaDTO of(CategoriaEntity entity) {
        return CategoriaDTO
                .builder()
                .nome(entity.getNome())
                .descricao(entity.getDescricao())
                .build();
    }
}
