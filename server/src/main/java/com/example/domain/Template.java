package com.example.domain;

import lombok.Data;

@Data
public class Template {
    private Integer id;
    private Integer userId;
    private String renderData;
    private String saveTime;
    private Boolean share;
    private String code;
}
