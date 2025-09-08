// files for api response types for stock operations

// ticker stock type
// {
//             "id": 53555426,
//             "company_id": 24951,
//             "close": 12575.0,
//             "open": 12680.0,
//             "high": 12738.0,
//             "low": 12560.0,
//             "volume": 30738.0,
//             "change": -76.0,
//             "percent": -0.6007430242668563,
//             "date": "2025-09-05T11:04:56Z",
//             "symbol": "ULTRACEMCO",
//             "comp_name": "UltraTech Cement Ltd",
//             "scripcode": 532538,
//             "prev_close": 12575.0,
//             "mcap": 371204.4,
//             "pe": 53.62,
//             "roe_ttm": 8.5411,
//             "roce_ttm": 9.6488
//         },
interface ISStock {
  id: number;
  company_id: number;
  close: number;
  open: number;
  high: number;
  low: number;
  volume: number;
  change: number;
  percent: number;
  date: string;
  symbol: string;
  comp_name: string;
  scripcode: number;
  prev_close: number;
  mcap: number;
  pe: number;
  roe_ttm: number;
  roce_ttm: number;
}

// stock ticker response type
export interface IStockTickerResponse {
  name: string;
  index_name: string;
  total_count: number;
  losers_count: number;
  gainers_count: number;
  gainers: ISStock[];
  losers: ISStock[];
  exchange: string;
  volume_movers: ISStock[];
}
export type StockTicker = ISStock;

/* --------------- stock search type --------------  */
interface ISStockSearch {
  id: number;
  company: string;
  symbol: string;
}

export interface IStockSearchResponse {
  total_count: number;
  stocks: ISStockSearch[];
}
export type StockSearch = ISStockSearch;

/* --------------- stock prices type --------------  */

// {
//     "open": 16.98,
//     "high": 16.98,
//     "close": 16.98,
//     "low": 16.98,
//     "date": "2025-09-05 09:38:00+05:30",
//     "volume": 45575.0,
//     "value": 773863.5,
//     "change": 0.8,
//     "percent": 4.94,
//     "prev_close": 16.98
// }

export interface ISStockPrice {
  open: number;
  high: number;
  close: number;
  low: number;
  date: string;
  volume: number;
  value: number;
  change: number;
  percent: number;
  prev_close: number;
}
