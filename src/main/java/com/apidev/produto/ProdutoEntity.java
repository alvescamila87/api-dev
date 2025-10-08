package com.apidev.produto;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "tb_produto")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProdutoEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
}
