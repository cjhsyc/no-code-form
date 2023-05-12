package com.example.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import com.example.common.Message;
import com.example.domain.Template;
import com.example.service.impl.TemplateServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/template")
public class TemplateController {
    @Autowired
    private TemplateServiceImpl templateService;

    @PostMapping
    public Message saveTemplate(@RequestBody Template template) {
        UpdateWrapper<Template> updateWrapper = new UpdateWrapper<>();
        updateWrapper.eq("code", template.getCode());
        if (templateService.update(template, updateWrapper) || templateService.save(template)) {
            return new Message("success", "保存成功");
        }
        return new Message("error", "保存失败");
    }

    @GetMapping("/{userId}")
    public Message getTemplates(@PathVariable Integer userId) {
        QueryWrapper<Template> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("user_id", userId);
        return new Message("success", "", templateService.list(queryWrapper));
    }

    @DeleteMapping("/{code}")
    public Message removeTemplate(@PathVariable String code) {
        QueryWrapper<Template> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("code", code);
        if (templateService.remove(queryWrapper)) {
            return new Message("success", "删除成功");
        }
        return new Message("error", "删除失败");
    }

    @PutMapping("/share/{code}/{share}")
    public Message publishTemplate(@PathVariable String code, @PathVariable Boolean share) {
        Template template = new Template();
        template.setShare(share);
        QueryWrapper<Template> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("code", code);
        if (templateService.update(template, queryWrapper)) {
            if (share) {
                return new Message("success", "共享成功");
            } else {
                return new Message("success", "取消共享成功");
            }
        }
        if (share) {
            return new Message("success", "共享失败");
        } else {
            return new Message("success", "取消共享失败");
        }
    }

    @GetMapping("info/{code}")
    public Message getTemplateByCode(@PathVariable String code) {
        QueryWrapper<Template> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("code", code);
        Template template = templateService.getOne(queryWrapper);
        if (template != null) {
            return new Message("success", "查询成功", template);
        }
        return new Message("error", "查询失败");
    }

    @GetMapping("share")
    public Message getShareTemplates() {
        QueryWrapper<Template> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("share", true);
        return new Message("success", "", templateService.list(queryWrapper));
    }
}
