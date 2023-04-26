package com.example.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.dao.FormMapper;
import com.example.domain.Form;
import com.example.service.FormService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FormServiceImpl extends ServiceImpl<FormMapper, Form> implements FormService {
    @Autowired
    private FormMapper formMapper;
}
