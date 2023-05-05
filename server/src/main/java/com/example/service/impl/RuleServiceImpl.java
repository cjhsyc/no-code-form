package com.example.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.dao.RuleMapper;
import com.example.domain.Rule;
import com.example.service.RuleService;
import org.springframework.stereotype.Service;

@Service
public class RuleServiceImpl extends ServiceImpl<RuleMapper, Rule> implements RuleService {
}
