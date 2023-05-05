package com.example.domain;

import lombok.Data;

@Data
public class Rule {
    private Integer id;
    private Integer userId;
    private String code;
    private String name;
    private String message;
    private String rule;
}
