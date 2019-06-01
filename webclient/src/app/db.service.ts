import { Injectable } from '@angular/core';
import Dexie from "dexie";
import {NetWorth} from "../types/database";

@Injectable({
  providedIn: 'root'
})
export class DbService {
  private db;
  constructor() {
    this.init().then();
  }
  async init() {
    try {
      this.db = await new Dexie('fincheck');
      await this.db.version(1).stores({
        netWorth: 'source, liabilities, assets, netWorth'
      });
    }
    catch(e) {
      console.log('my error');
      console.log(e)
    }
  }
  async updateNetWorth(changes: NetWorth) {
    await this.db.netWorth.put(changes);
  }
}
