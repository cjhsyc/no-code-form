package com.example.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import com.example.common.Message;
import com.example.domain.Form;
import com.example.service.impl.FormServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/form")
public class FormController {
    @Autowired
    private FormServiceImpl formService;

    @PostMapping
    public Message saveForm(@RequestBody Form form) {
        UpdateWrapper<Form> updateWrapper = new UpdateWrapper<>();
        updateWrapper.eq("code", form.getCode());
        if (formService.update(form, updateWrapper) || formService.save(form)) {
            return new Message("success", "保存成功");
        }
        return new Message("error", "保存失败");
    }

    @GetMapping("/{userId}")
    public Message getForms(@PathVariable Integer userId) {
        QueryWrapper<Form> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("user_id", userId);
        return new Message("success", "", formService.list(queryWrapper));
    }
}
