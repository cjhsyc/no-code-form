import request from './request'

// 登录
export const reqLogin = (params: LoginParams) => request.post('user/login', params)
// 注册
export const reqSignup = (params: SignupParams) => request.post('user', params)
