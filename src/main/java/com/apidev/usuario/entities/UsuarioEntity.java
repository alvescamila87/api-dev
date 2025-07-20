package com.apidev.usuario.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;

@Entity
@Table(name = "tb_usuario")
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UsuarioEntity {

    private Long id;
    private String nome;
    private String tipoUsuario;
    private String email;
    private String senha;
    private boolean ativo;
}
