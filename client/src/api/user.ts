import request from './request'

// 登录
export const reqLogin = (params: LoginParams) => request.post('user/login', params)
// 注册
export const reqSignup = (params: SignupParams) => request.post('user', params)
// 修改密码
export const reqUpdatePassword = (params: UpdatePasswordParams) =>
  request.put('user/password', params)
// 修改头像
export const reqUpdateAvatar = (id: number, params: UpdateAvatarParams) =>
  request.put(`user/avatar/${id}`, params)
