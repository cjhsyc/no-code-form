package com.example.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.example.common.SubmitForm;
import com.example.domain.SubmitData;

import java.util.List;

public interface SubmitDataService extends IService<SubmitData> {
    List<SubmitForm> getSubmitFormList(Integer userId);
}
