package com.apidev.categoria.services;

import com.apidev.categoria.dtos.CategoriaDTO;
import com.apidev.categoria.entity.CategoriaEntity;
import com.apidev.categoria.repositories.CategoriaRepository;
import com.apidev.usuario.exceptions.ValidationException;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoriaService {

    private final CategoriaRepository categoriaRepository;

    public Page<CategoriaDTO> findAll(int page, int size) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by("nome").ascending());

        Page<CategoriaEntity> listaCategorias = categoriaRepository.findAll(pageRequest);

        return listaCategorias.map(CategoriaDTO::of);

    }

    public List<CategoriaDTO> listAll(){
        List<CategoriaDTO> listaCegoriasDTO = new ArrayList<>();

        List<CategoriaEntity> listaCategoriaEntity = categoriaRepository.findAll();

        for (CategoriaEntity categoria : listaCategoriaEntity) {
            CategoriaDTO.of(categoria);

            listaCegoriasDTO.add(CategoriaDTO.of(categoria));
        }

        return listaCegoriasDTO;
    }

    public boolean addCategoria(CategoriaDTO categoriaDTO) {
        validarInput(categoriaDTO);

        categoriaRepository.save(CategoriaEntity.from(categoriaDTO));

        return true;
    }

    public void findById(Long id) {
        categoriaRepository
                .findById(id)
                .orElseThrow(() -> new IllegalArgumentException("ID " + id + " nao encontrado" ));

    }

    public void delete(Long id) {
        findById(id);
        categoriaRepository.deleteById(id);
    }

    protected void validarInput(CategoriaDTO categoriaDTO) {
        if(categoriaDTO == null){
            throw new ValidationException("Campos obrigatórios não preenchidos.");
        }

        if(StringUtils.isBlank(categoriaDTO.getNome())){
            throw new ValidationException("Favor informar o NOME do categoria.");
        }

        if(StringUtils.isBlank(categoriaDTO.getDescricao())) {
            throw new ValidationException("Favor informar o DESCRIÇÃO do categoria.");
        }
    }
}
