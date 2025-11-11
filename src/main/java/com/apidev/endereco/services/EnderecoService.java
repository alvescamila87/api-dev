package com.apidev.endereco.services;

import com.apidev.endereco.repositories.EnderecoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EnderecoService {

    private final EnderecoRepository enderecoRepository;

    public void findAll() {
        final var endereco =  enderecoRepository.findAll();
    }
}
