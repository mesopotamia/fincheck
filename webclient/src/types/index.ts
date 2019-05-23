interface LoginEvent {
  type: string;
  loginModel: LoginModel
}
interface LoginModel {
  username: string;
  password: string;
}
interface AccountSummary {
  assets: number;
  liabilities: number;
  netWorth?: number
}
interface CreditScore {
  score: string;
  description: string;
}
