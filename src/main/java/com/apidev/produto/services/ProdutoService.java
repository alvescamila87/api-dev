package com.apidev.produto.services;

import com.apidev.produto.dtos.ProdutoDTO;
import com.apidev.produto.entity.ProdutoEntity;
import com.apidev.produto.repositories.ProdutoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProdutoService {

    private final ProdutoRepository produtoRepository;

    public Page<ProdutoDTO> findAll(int page, int size) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, "nome"));

        Page<ProdutoEntity> listaProdutos = this.produtoRepository.findAll(pageRequest);

        return listaProdutos.map(ProdutoDTO::of);
    }
}
