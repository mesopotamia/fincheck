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
interface Mortgage {
  originalAmount: number;
  currentBalance: number;
  regularPaymentAmount: number;
  paymentDayOfMonth: number;
  termOfLoanInMonths: number;
}
interface Property {
  id: string;
  marketValue: number;
  address: string;
  avatar: string;
  mortgage: Mortgage;
}
