package com.example.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.example.common.Message;
import com.example.domain.SubmitData;
import com.example.service.impl.SubmitDataServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("data")
public class SubmitDataController {
    @Autowired
    private SubmitDataServiceImpl submitDataService;

    @PostMapping
    public Message saveSubmitData(@RequestBody SubmitData submitData) {
        if (submitDataService.save(submitData)) {
            return new Message("success", "提交成功");
        }
        return new Message("error", "提交失败");
    }

    @GetMapping("{code}")
    public Message getSubmitData(@PathVariable String code) {
        QueryWrapper<SubmitData> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("form_code", code);
        return new Message("success", "", submitDataService.list(queryWrapper));
    }

    @GetMapping("form/list/{id}")
    public Message getSubmitFormList(@PathVariable Integer id) {
        return new Message("success", "");
    }
}
