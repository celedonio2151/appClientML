export interface Reading {
  _id: number;
  date: Date;
  beforeMonth: Month;
  lastMonth: Month;
  cubicMeters: number;
  balance: number;
  meterImage: null;
  description: null | string;
  waterMeterId: number;
  createdAt: Date;
  updatedAt: Date;
  waterMeter: WaterMeter;
  invoice: Invoice | null;
}

export interface Month {
  date: Date;
  meterValue: number;
}

export interface Invoice {
  _id: number;
  amountDue: number;
  isPaid: boolean;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface WaterMeter {
  _id: number;
  ci: number;
  fullname: string;
  meterNumber: number;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
}
