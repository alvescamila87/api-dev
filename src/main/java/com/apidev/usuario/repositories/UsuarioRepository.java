package com.apidev.usuario.repositories;

import com.apidev.usuario.entities.UsuarioEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends JpaRepository<UsuarioEntity, Long> {

    Page<UsuarioEntity> findAll(Pageable pageable);
}
