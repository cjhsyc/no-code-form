package com.example.domain;

import lombok.Data;

@Data
public class Form {
    private Integer id;
    private Integer userId;
    private String renderData;
    private String saveTime;
    private Boolean publish;
    private String code;
}
