package com.apidev.categoria.services;

import com.apidev.categoria.dtos.CategoriaDTO;
import com.apidev.categoria.entity.CategoriaEntity;
import com.apidev.categoria.repositories.CategoriaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CaetgoriaService {

    private final CategoriaRepository repository;

    public Page<CategoriaDTO> findAll(int page, int size) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by("nome").ascending());

        Page<CategoriaEntity> listaCategorias = repository.findAll(pageRequest);

        return listaCategorias.map(CategoriaDTO::of);

    }

    public List<CategoriaDTO> listAll(){
        List<CategoriaDTO> listaCegoriasDTO = new ArrayList<>();

        List<CategoriaEntity> listaCategoriaEntity = repository.findAll();

        for (CategoriaEntity categoria : listaCategoriaEntity) {
            CategoriaDTO.of(categoria);

            listaCegoriasDTO.add(CategoriaDTO.of(categoria));
        }

        return listaCegoriasDTO;
    }

    public void findById(Long id) {
        repository
                .findById(id)
                .orElseThrow(() -> new IllegalArgumentException("ID " + id + " nao encontrado" ));

    }

    public void delete(Long id) {
        findById(id);
        repository.deleteById(id);
    }
}
