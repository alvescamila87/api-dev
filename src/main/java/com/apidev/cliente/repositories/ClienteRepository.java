package com.apidev.cliente.repositories;

import com.apidev.cliente.entity.ClienteEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ClienteRepository extends JpaRepository<ClienteEntity, Long> {

    Page<ClienteEntity> findAllByNomeContainingIgnoreCase(String nome, Pageable pageable);

    Optional<ClienteEntity> findByDocumento(String documento);

    boolean existsByDocumento(String documento);
}
