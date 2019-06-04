export interface NetWorth {
  source: 'CIBC' | 'TD' | string;
  liabilities: number;
  assets: number;
  netWorth: number;
}
