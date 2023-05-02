package com.example.domain;

import lombok.Data;

@Data
public class Dict {
    private Integer id;
    private Integer userId;
    private String code;
    private String name;
    private String options;
}
