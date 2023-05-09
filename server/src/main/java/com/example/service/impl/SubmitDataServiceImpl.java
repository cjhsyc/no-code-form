package com.example.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.dao.SubmitDataMapper;
import com.example.domain.SubmitData;
import com.example.service.SubmitDataService;
import org.springframework.stereotype.Service;

@Service
public class SubmitDataServiceImpl extends ServiceImpl<SubmitDataMapper, SubmitData> implements SubmitDataService {
}
