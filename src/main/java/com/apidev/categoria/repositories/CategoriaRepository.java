package com.apidev.categoria.repositories;

import com.apidev.categoria.entity.CategoriaEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CategoriaRepository extends JpaRepository<CategoriaEntity, Long> {

    Page<CategoriaEntity> findAll(Pageable pageable);

    Optional<CategoriaEntity> findByNome(String nome);
}
