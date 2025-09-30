package com.apidev.categoria.services;

import com.apidev.categoria.dtos.CategoriaDTO;
import com.apidev.categoria.repositories.CategoriaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CaetgoriaService {

    private final CategoriaRepository repository;

    public List<CategoriaDTO> findAll(){
        return null;
    }
}
