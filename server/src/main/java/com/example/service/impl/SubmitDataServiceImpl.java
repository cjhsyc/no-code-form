package com.example.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.common.SubmitForm;
import com.example.dao.SubmitDataMapper;
import com.example.domain.Form;
import com.example.domain.SubmitData;
import com.example.service.SubmitDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubmitDataServiceImpl extends ServiceImpl<SubmitDataMapper, SubmitData> implements SubmitDataService {
    @Autowired
    private SubmitDataMapper submitDataMapper;

    public List<SubmitForm> getSubmitFormList(Integer userId){
        Form form = new Form();
        form.setUserId(userId);
        return submitDataMapper.getSubmitFormList(userId);
    }
}
