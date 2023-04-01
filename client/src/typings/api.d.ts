declare interface LoginParams {
  account: string
  password: string
}

declare interface SignupParams extends LoginParams {}
