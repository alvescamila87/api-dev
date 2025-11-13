package com.apidev.endereco.dtos;

import com.apidev.endereco.entity.EnderecoEntity;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.springframework.beans.BeanUtils;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class EnderecoDTO {

    private Long id;

    @NotBlank(message = "Campo obrigatório")
    @Size(min = 8, max = 8, message = "O CEP deve ter exatamente {max} digitos")
    private String cep;
    private String logradouro;
    private String complemento;
    private String bairro;
    private String cidade;
    private String uf;
    private String numero;

    public static EnderecoDTO of(EnderecoEntity enderecoEntity) {
        return BeanUtils.copyProperties(this, enderecoEntity);
    }
}
