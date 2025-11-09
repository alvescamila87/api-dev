package com.apidev.cliente.controllers;

import com.apidev.cliente.dtos.ClienteDTO;
import com.apidev.cliente.dtos.ClienteFilterDTO;
import com.apidev.cliente.services.ClienteService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cliente")
@RequiredArgsConstructor
public class ClienteController {

    private final ClienteService clienteService;

    @GetMapping
    public ResponseEntity<Page<ClienteDTO>> listarClientes(
            @RequestParam(name = "page") int page,
            @RequestParam(name = "size") int size,
            @RequestParam(name = "nome", required = false) String nome
    ){
        return ResponseEntity.ok(clienteService.findAll(page, size, nome));
    }

    @GetMapping("/paginacao-com-filtro-avancado")
    public ResponseEntity<Page<ClienteDTO>> listaClientesComFiltro(
            @RequestParam(name = "page") int page,
            @RequestParam(name = "size") int size,
            ClienteFilterDTO filter
    ){
        return ResponseEntity.ok(clienteService.findAllComFiltro(page, size, filter));
    }

    @PostMapping
    public ResponseEntity addCliente(@Valid @RequestBody ClienteDTO clienteDTO) {
        boolean result = clienteService.addCliente(clienteDTO);

        if(!result) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PutMapping("/{id}")
    public ResponseEntity updateCliente(@PathVariable Long id, @RequestBody @Valid ClienteDTO clienteDTO) {
        boolean result = clienteService.updateCliente(id, clienteDTO);

        if(!result) {
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCliente(@PathVariable Long id){
        clienteService.deleteCliente(id);
        return ResponseEntity.noContent().build();
    }

}
