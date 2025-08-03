package com.apidev.usuario.entities;

import com.apidev.usuario.dtos.UsuarioDTO;
import jakarta.persistence.*;
import lombok.*;

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

    @Column(name = "tipo_usuario", nullable = false)
    private String tipoUsuario;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "senha", nullable = false)
    private String senha;

    @Builder.Default
    @Column(name = "ativo", nullable = false)
    private boolean ativo = false;

    public static UsuarioEntity from(UsuarioDTO usuarioDTO) {
        return UsuarioEntity
                .builder()
                .id(usuarioDTO.getId())
                .nome(usuarioDTO.getNome())
                .tipoUsuario(usuarioDTO.getTipoUsuario())
                .email(usuarioDTO.getEmail())
                .senha(usuarioDTO.getSenha())
                .ativo(usuarioDTO.isAtivo())
                .build();
    }
}
