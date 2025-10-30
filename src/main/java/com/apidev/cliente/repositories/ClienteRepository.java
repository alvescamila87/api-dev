package com.apidev.cliente.repositories;

import com.apidev.cliente.entity.ClienteEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ClienteRepository extends JpaRepository<ClienteEntity, Long> {

    Optional<ClienteEntity> findByDocumento(String documento);

    boolean existsByDocumento(String documento);
}
