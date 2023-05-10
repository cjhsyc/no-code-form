package com.example.common;

import lombok.Data;

@Data
public class SubmitForm {
    private String code;
    private String renderData;
    private Integer submitCount;
    private Boolean publish;
}
