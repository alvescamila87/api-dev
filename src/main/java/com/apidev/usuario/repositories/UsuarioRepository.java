package com.apidev.usuario.repositories;

import com.apidev.usuario.entity.UsuarioEntity;
import com.apidev.usuario.enums.EnumTipoPermissao;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<UsuarioEntity, Long> {

    //Page<UsuarioEntity> findAll(Pageable pageable);
    Page<UsuarioEntity> findAllByNomeContainingIgnoreCase(String nome, Pageable pageable);

    Page<UsuarioEntity> findAllByEmailContainingIgnoreCase(String email, Pageable pageable);

    Page<UsuarioEntity> findByTipoPermissao(EnumTipoPermissao tipoPermissao, Pageable pageable);

    Optional<UsuarioEntity> findByEmail(String email);
}
