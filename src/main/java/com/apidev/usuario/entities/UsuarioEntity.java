package com.apidev.usuario.entities;

import com.apidev.usuario.dtos.UsuarioDTO;
import com.apidev.usuario.enums.EnumTipoPermissao;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.beans.BeanUtils;

@Entity
@Table(name = "tb_usuario")
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UsuarioEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome", nullable = false)
    private String nome;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_permissao", nullable = false)
    private EnumTipoPermissao tipoPermissao;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "senha", nullable = false)
    private String senha;

    @Builder.Default
    @Column(name = "ativo", nullable = false)
    private boolean ativo = false;

    public UsuarioEntity(UsuarioDTO dto) {
        BeanUtils.copyProperties(dto, this);
    }

    public static UsuarioEntity from(UsuarioDTO usuarioDTO) {
        return UsuarioEntity
                .builder()
                .id(usuarioDTO.getId())
                .nome(usuarioDTO.getNome())
                .tipoPermissao(usuarioDTO.getTipoPermissao())
                .email(usuarioDTO.getEmail())
                .senha(usuarioDTO.getSenha())
                .ativo(usuarioDTO.isAtivo())
                .build();
    }
}
