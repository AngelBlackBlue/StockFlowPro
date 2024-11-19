
export enum TypeDetail {
    initial = 0,
    buy = 1,
    sell = 2,
  }
  
  export type Product = {
    tokenId: string;
    uuid: string;
    sku: string;
    timestamp: string;
    detail: string;
    input: string;
    unitCost: string;
    output: string;
    balance: string;
    totalCost: string;
    ppp: string;
  };
  