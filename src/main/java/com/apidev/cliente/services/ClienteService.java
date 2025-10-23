package com.apidev.cliente.services;

import com.apidev.cliente.repositories.ClienteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ClienteService {

    private final ClienteRepository clienteRepository;

    public void deleteCliente(Long id) {
        clienteRepository.deleteById(id);
    }
}
