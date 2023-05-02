package com.example.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import com.example.common.Message;
import com.example.domain.Dict;
import com.example.service.impl.DictServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("dict")
public class DictController {
    @Autowired
    private DictServiceImpl dictService;

    @GetMapping("{userId}")
    public Message getDicts(@PathVariable Integer userId) {
        QueryWrapper<Dict> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("user_id", userId);
        if (userId != 3) {
            queryWrapper.or().eq("user_id", 3);
        }
        return new Message("success", "", dictService.list(queryWrapper));
    }

    @PostMapping
    public Message saveDict(@RequestBody Dict dict) {
        UpdateWrapper<Dict> updateWrapper = new UpdateWrapper<>();
        updateWrapper.eq("code", dict.getCode());
        if (dictService.update(dict, updateWrapper) || dictService.save(dict)) {
            return new Message("success", "保存成功");
        }
        return new Message("error", "保存失败");
    }

    @DeleteMapping("{code}")
    public Message removeDict(@PathVariable String code){
        QueryWrapper<Dict> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("code", code);
        if(dictService.remove(queryWrapper)) {
            return new Message("success", "删除成功");
        }
        return new Message("error", "删除失败");
    }
}
