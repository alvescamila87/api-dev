package com.apidev.endereco.repositories;

import com.apidev.endereco.entity.EnderecoEntity;
import com.apidev.usuario.entity.UsuarioEntity;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Page;

@Repository
public interface EnderecoRepository extends JpaRepository<EnderecoEntity, Long> {

    Page<UsuarioEntity> findAllByCep(String cep, Pageable pageable);
}
