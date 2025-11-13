package com.apidev.endereco.services;

import com.apidev.endereco.dtos.EnderecoDTO;
import com.apidev.endereco.entity.EnderecoEntity;
import com.apidev.endereco.repositories.EnderecoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EnderecoService {

    private final EnderecoRepository enderecoRepository;

    public Page<EnderecoDTO> findAll(int pageNumber, int pageSize, String cep) {
        PageRequest pageRequest = PageRequest.of(pageNumber, pageSize, Sort.by("cep").ascending());

        Page<EnderecoEntity> listaEnderecoEntity;

        if(cep != null && !cep.isEmpty()) {
            listaEnderecoEntity = enderecoRepository.findAllByCep(cep, pageRequest);
        } else {
            listaEnderecoEntity = enderecoRepository.findAll(pageRequest);
        }

        return listaEnderecoEntity.map(EnderecoDTO::of);
    }
}
