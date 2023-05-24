export interface Currency {
    active: boolean;
    code: string;
    defaultCurrency: boolean;
    description: string;
    id: number;
    name: string;
    rateToDefault: number;
  }