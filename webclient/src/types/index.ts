interface LoginEvent {
  type: string;
  loginModel: LoginModel
}
interface LoginModel {
  username: string;
  password: string;
}
