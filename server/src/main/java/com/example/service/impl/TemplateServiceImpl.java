package com.example.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.dao.TemplateMapper;
import com.example.domain.Template;
import com.example.service.TemplateService;
import org.springframework.stereotype.Service;

@Service
public class TemplateServiceImpl extends ServiceImpl<TemplateMapper, Template> implements TemplateService {

}
