import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/index";

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor(private httpClient: HttpClient) { }
  getSummary({username, password}: LoginModel, type: string): Observable<AccountSummary> {
    const baseUrl = AccountsService.getUrl(type);
    return this.httpClient.get<AccountSummary>(`${baseUrl}?username=${username}&password=${password}`);
  }
  static getUrl(type: string) {
    switch(type) {
      case 'CIBC':
        return 'http://localhost:3000/summary';
      case 'TDMesoMM':
        return 'http://localhost:3000/td/mesoMM/netWorth';
      case 'TDMesoHolding':
        return 'http://localhost:3000/td/mesoHolding/netWorth';
    }
  }
}
