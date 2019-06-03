import { Component } from '@angular/core';
import {AccountsService} from "./accounts.service";
import {HttpClient} from "@angular/common/http";
import dexie from 'dexie';
import {DbService} from "./db.service";
import {NetWorth} from "../types/database";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  accountSummary: AccountSummary;
  creditScore: CreditScore;
  constructor(private accountsService: AccountsService,
              private httpClient: HttpClient,
              public dbService: DbService) {
    this.accountSummary = {
      netWorth: Number(localStorage.getItem('netWorth')),
      liabilities: Number(localStorage.getItem('liabilities')),
      assets: Number(localStorage.getItem('assets'))
    };
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
      localStorage.setItem('score', this.creditScore.score);
      localStorage.setItem('description', this.creditScore.description);
    })
  }
  getSummary(loginModel: LoginModel) {
    return this.accountsService.getSummary(loginModel).subscribe(async(accountSummary: AccountSummary) => {
      const {assets, liabilities} = accountSummary;
      const netWorth = assets - liabilities;
      await this.dbService.updateNetWorth({liabilities, netWorth, source: 'CIBC', assets});
    })
  }
  async getNetWorth(source: string): Promise<NetWorth> {
    return await this.dbService.getNetWorthBySource(source);
  }
}
