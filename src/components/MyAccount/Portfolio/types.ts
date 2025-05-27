export type InvestmentsData = {
  data: Array<OverallInvestment>;
  suggestions: Array<{ suggestion: string }>;
  net_worth: number;
  day_return: number;
  day_return_percent: number;
  cash_in_bank: number;
};

export type OverallInvestment = {
  name: "Equity" | "Debt" | "Gold";
  results: Array<Fund>;
  total_current: number;
  total_day_return: number;
  total_day_return_percent: number;
  day_change: number;
  fd?: number;
};

export type Fund = {
  name: "Shares" | "Mutual Funds";
  current: number;
  day_return: number;
  day_return_percent: number;
  investments: Array<Investment>;
  day_change: number;
};

export type Investment = {
  name: string;
  current_day_price: number;
  price: number;
  quantity: number;
  day_change: number;
};
