package com.apidev.produto.services;

import com.apidev.produto.dtos.ProdutoDTO;
import com.apidev.produto.entity.ProdutoEntity;
import com.apidev.produto.repositories.ProdutoRepository;
import com.apidev.usuario.exceptions.ValidationException;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProdutoService {

    private final ProdutoRepository produtoRepository;

    public Page<ProdutoDTO> findAll(int page, int size) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, "nome"));

        Page<ProdutoEntity> listaProdutos = this.produtoRepository.findAll(pageRequest);

        return listaProdutos.map(ProdutoDTO::of);
    }

    public boolean addProduto(ProdutoDTO produtoDTO) {
        setValues(produtoDTO);

        produtoRepository.save(ProdutoEntity.from(produtoDTO));

        return true;
    }

    public boolean updateProduto(ProdutoDTO produtoDTO, Long id) {
        findById(id);

        setValues(produtoDTO);

        produtoRepository.save(ProdutoEntity.from(produtoDTO));

        return true;
    }

    public void findById(Long id) {
        produtoRepository.
                findById(id)
                .orElseThrow(() -> new IllegalArgumentException("ID: " + id + " não encontrado."));
    }

    protected void setValues(ProdutoDTO produtoDTO) {
        if(produtoDTO == null) {
            throw new ValidationException("Campos obrigatórios não preenchidos");
        }

        if(StringUtils.isEmpty(produtoDTO.getNome())) {
            throw new ValidationException("Campo obrigatório não preenchido");
        }

        if(StringUtils.isEmpty(produtoDTO.getCategoriaId().toString())) {
            throw new ValidationException("Campo obrigatório não preenchido");
        }
    }
}
