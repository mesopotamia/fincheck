import { Component } from '@angular/core';
import {AccountsService} from "./accounts.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  accountSummary: AccountSummary;
  constructor(private accountsService: AccountsService) {
    this.accountSummary = {
      netWorth: Number(localStorage.getItem('netWorth')),
      liabilities: Number(localStorage.getItem('liabilities')),
      assets: Number(localStorage.getItem('assets'))
    };
  }
  onLogin(event: LoginEvent) {
    switch (event.type) {
      case 'CIBC':
        console.log('calling CIBC');
        console.log('with credentials', event.loginModel);
        this.getSummary(event.loginModel);
        break;

    }
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
