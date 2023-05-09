package com.example.domain;

import lombok.Data;

@Data
public class SubmitData {
    private Integer id;
    private String formCode;
    private String formData;
    private String submitTime;
}
