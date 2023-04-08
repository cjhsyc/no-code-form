package com.example.controller;

import com.example.common.Message;
import com.example.common.PasswordUpdateData;
import com.example.constants.Constants;
import com.example.domain.User;
import com.example.service.impl.UserServiceImpl;
import com.example.util.Util;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserServiceImpl userService;

    @PostMapping
    public Message signup(@RequestBody User user) {
        if (!userService.searchUserByAccount(user.getUsername()).isEmpty()) {
            return new Message("warning", "该用户名已存在");
        } else if (Boolean.TRUE.equals(userService.addUser(user))) {
            return new Message("success", "注册成功");
        } else {
            return new Message("error", "注册失败");
        }
    }

    @PostMapping("login")
    public Message login(@RequestBody User user) {
        List<User> users = userService.searchUser(user.getUsername(), user.getPassword());
        if (!users.isEmpty()) {
            User userData = new User();
            userData.setId(users.get(0).getId());
            userData.setRole(users.get(0).getRole());
            userData.setAvatar(users.get(0).getAvatar());
            userData.setUsername(user.getUsername());
            return new Message("success", "登录成功", userData);
        } else {
            return new Message("error", "用户名或密码错误");
        }
    }

    @PutMapping("password")
    public Message updatePassword(@RequestBody PasswordUpdateData passwordUpdateData) {
        String oldPassword = userService.getById(passwordUpdateData.getId()).getPassword();
        if (oldPassword.equals(passwordUpdateData.getOldPassword())) {
            User user = new User();
            user.setId(passwordUpdateData.getId());
            user.setPassword(passwordUpdateData.getPassword());
            if (userService.updateById(user)) {
                return new Message("success", "密码修改成功");
            } else {
                return new Message("error", "密码修改失败");
            }
        } else {
            return new Message("error", "旧密码输入错误");
        }
    }

    //更新用户头像
    @PutMapping("avatar/{id}")
    public Message updateAvatar(@PathVariable Integer id, @RequestParam("file") MultipartFile avatarFile) {
        String fileName = Util.uuid() + avatarFile.getOriginalFilename();
        String filePath = Constants.PROJECT_PATH + System.getProperty("file.separator") + "img" + System.getProperty("file.separator") + "avatar";
        File file = new File(filePath);
        if (!file.exists()) {
            // 如果不存在该目录，则生成该目录
            file.mkdirs();
        }
        File dest = new File(filePath + System.getProperty("file.separator") + fileName);
        String imgPath = "/img/avatar/" + fileName;
        try {
            avatarFile.transferTo(dest);
            User user = new User();
            user.setId(id);
            user.setAvatar(imgPath);
            if (userService.updateById(user)) {
                return new Message("success", "上传成功", imgPath);
            } else {
                return new Message("error", "上传失败");
            }
        } catch (IOException e) {
            e.printStackTrace();
            return new Message("fatal", e.getMessage());
        }
    }
}
