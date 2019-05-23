import { Component } from '@angular/core';
import {AccountsService} from "./accounts.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  accountSummary: AccountSummary;
  creditScore: CreditScore;
  constructor(private accountsService: AccountsService, private httpClient: HttpClient) {
    this.accountSummary = {
      netWorth: Number(localStorage.getItem('netWorth')),
      liabilities: Number(localStorage.getItem('liabilities')),
      assets: Number(localStorage.getItem('assets'))
    };
    this.creditScore = {
      score: localStorage.getItem('score'),
      description: localStorage.getItem('description')
    }
  }
  onLogin(event: LoginEvent) {
    switch (event.type) {
      case 'CIBC':
        console.log('calling CIBC');
        console.log('with credentials', event.loginModel);
        this.getSummary(event.loginModel);
        break;
      case 'EQUIFAX':
        this.getScore(event.loginModel);
        break;
    }
  }
  getScore(loginModel: LoginModel) {
    const url = `http://localhost:3000/credit-score?username=${loginModel.username}&password=${loginModel.password}`;
    this.httpClient.get<CreditScore>(url).subscribe((credit: CreditScore) => {
      this.creditScore.score = credit.score;
      this.creditScore.description = credit['status'];
      localStorage.setItem('score', credit.score);
      localStorage.setItem('description', credit.description);
    })
  }
  getSummary(loginModel: LoginModel) {
    return this.accountsService.getSummary(loginModel).subscribe((accountSummary: AccountSummary) => {
      const {assets, liabilities} = accountSummary;
      const netWorth = assets - liabilities;
      this.accountSummary = {
        ...accountSummary,
        netWorth
      };
      localStorage.setItem('assets', String(assets));
      localStorage.setItem('liabilities', String(liabilities));
      localStorage.setItem('netWorth', String(netWorth));
    })
  }
}
