import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/index";

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor(private httpClient: HttpClient) { }
  getSummary({username, password}: LoginModel): Observable<AccountSummary> {
    return this.httpClient.get<AccountSummary>(`http://localhost:3000/summary?username=${username}&password=${password}`);
  }
}
