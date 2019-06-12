import { Injectable } from '@angular/core';
import Dexie from "dexie";
import {NetWorth} from "../types/database";

@Injectable({
  providedIn: 'root'
})
export class DbService {
  private db;
  public netWorthList: NetWorth[] = [];
  public properties: Property[] = [];
  constructor() {
    this.init();
  }
  async init() {
    try {
      this.db = await new Dexie('fincheck');
      await this.db.version(1).stores({
        netWorth: 'source, liabilities, assets, netWorth',
        properties: '++id, marketValue, address, avatar, mortgage'
      });
      await this.getNetWorthListFromDB();
      await this.db.properties.put({
        avatar: 'whatever2',
        marketValue: '600',
        address: '',
        mortgage: '23'
      });
      this.properties = await this.db.properties.toArray();
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
