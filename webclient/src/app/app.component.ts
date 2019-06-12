import { Component } from '@angular/core';
import {AccountsService} from "./accounts.service";
import {HttpClient} from "@angular/common/http";
import dexie from 'dexie';
import {DbService} from "./db.service";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  creditScore: CreditScore;
  constructor(private accountsService: AccountsService,
              private httpClient: HttpClient,
              public dbService: DbService) {
    this.creditScore = {
      score: localStorage.getItem('score'),
      description: localStorage.getItem('description')
    };
    window['Dexie'] = dexie;
  }
  onLogin(event: LoginEvent) {
    switch (event.type) {
      case 'CIBC':
        console.log('calling CIBC');
        console.log('with credentials', event.loginModel);
        this.getSummary(event);
        break;
      case 'TDMesoMM':
        console.log('calling TD Meso MM');
        console.log('with credentials', event.loginModel);
        this.getSummary(event);
        break;
      case 'TDMesoHolding':
        console.log('calling TD Meso Holding');
        console.log('with credentials', event.loginModel);
        this.getSummary(event);
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
      localStorage.setItem('score', this.creditScore.score);
      localStorage.setItem('description', this.creditScore.description);
    })
  }
  getSummary({loginModel, type}: LoginEvent) {
    return this.accountsService.getSummary(loginModel, type).subscribe(async(accountSummary: AccountSummary) => {
      const {assets, liabilities} = accountSummary;
      const netWorth = assets - liabilities;
      await this.dbService.updateNetWorth({liabilities, netWorth, source: type, assets});
    })
  }
}
