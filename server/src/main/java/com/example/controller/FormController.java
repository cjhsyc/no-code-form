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

    @GetMapping("info/{code}")
    public Message getFormByCode(@PathVariable String code) {
        QueryWrapper<Form> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("code", code);
        Form form = formService.getOne(queryWrapper);
        if (form != null) {
            return new Message("success", "查询成功", form);
        }
        return new Message("error", "查询失败");
    }

    @DeleteMapping("/{code}")
    public Message removeForm(@PathVariable String code) {
        QueryWrapper<Form> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("code", code);
        if (formService.remove(queryWrapper)) {
            return new Message("success", "删除成功");
        }
        return new Message("error", "删除失败");
    }

    @PutMapping("/publish/{code}/{publish}")
    // 发布或下线表单
    public Message publishForm(@PathVariable String code, @PathVariable Boolean publish) {
        Form form = new Form();
        form.setPublish(publish);
        QueryWrapper<Form> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("code", code);
        if (formService.update(form, queryWrapper)) {
            if (publish) {
                return new Message("success", "发布成功");
            } else {
                return new Message("success", "下线成功");
            }
        }
        if (publish) {
            return new Message("success", "发布失败");
        } else {
            return new Message("success", "下线失败");
        }
    }
}
