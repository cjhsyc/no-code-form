package com.example.common;

import lombok.Data;

@Data
public class PasswordUpdateData {
    private Integer id;
    private String oldPassword;
    private String password;
}
