package com.example.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import com.example.common.Message;
import com.example.domain.Rule;
import com.example.service.impl.RuleServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("rule")
public class RuleController {
    @Autowired
    private RuleServiceImpl ruleService;

    @GetMapping("{userId}")
    public Message getRules(@PathVariable Integer userId) {
        QueryWrapper<Rule> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("user_id", userId);
        if (userId != 3) {
            queryWrapper.or().eq("user_id", 3);
        }
        return new Message("success", "", ruleService.list(queryWrapper));
    }

    @PostMapping
    public Message saveRule(@RequestBody Rule rule) {
        UpdateWrapper<Rule> updateWrapper = new UpdateWrapper<>();
        updateWrapper.eq("code", rule.getCode());
        if (ruleService.update(rule, updateWrapper) || ruleService.save(rule)) {
            return new Message("success", "保存成功");
        }
        return new Message("error", "保存失败");
    }

    @DeleteMapping("{code}")
    public Message removeRule(@PathVariable String code){
        QueryWrapper<Rule> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("code", code);
        if(ruleService.remove(queryWrapper)) {
            return new Message("success", "删除成功");
        }
        return new Message("error", "删除失败");
    }
}
