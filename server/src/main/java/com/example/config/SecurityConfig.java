package com.example.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                // 开启请求验证
                .authorizeHttpRequests()
                .antMatchers("/user/login", "/user").permitAll()
                // 所有请求
                .anyRequest()
                // 都进行验证
                .authenticated()
                .and()
                // // 进行表单验证 对应的Filter：UsernamePasswordAuthenticationFilter
                .formLogin();
        // // 自定义登录页地址
        // .loginPage("/login")
        // 放行登录地址
        // .permitAll();
        return http.build();
    }
}