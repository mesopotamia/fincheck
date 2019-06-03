import { Injectable } from '@angular/core';
import Dexie from "dexie";
import {NetWorth} from "../types/database";

@Injectable({
  providedIn: 'root'
})
export class DbService {
  private db;
  public netWorthList: NetWorth[] = [];
  constructor() {
    this.init();
  }
  async init() {
    try {
      this.db = await new Dexie('fincheck');
      await this.db.version(1).stores({
        netWorth: 'source, liabilities, assets, netWorth'
      });
      await this.getNetWorthListFromDB();
    }
    catch(e) {
      console.log('my error');
      console.log(e)
    }
    window['db'] = this.db;
  }
  async getNetWorthListFromDB() {
    this.netWorthList = await this.db.netWorth.toArray();
  }
  async updateNetWorth(changes: NetWorth) {
    await this.db.netWorth.put(changes);
  }
  getNetWorthBySource(source: string) {
    return this.netWorthList.find((item) => item.source === source);
  }
}
