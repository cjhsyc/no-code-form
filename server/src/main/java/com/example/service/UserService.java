package com.example.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.example.domain.User;

import java.util.List;

public interface UserService extends IService<User> {
    List<User> searchUserByAccount(String username);
    List<User> searchUser(String username, String password);
    Boolean addUser(User user);
}
