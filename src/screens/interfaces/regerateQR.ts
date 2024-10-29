export interface GenerateQRInterface {
  bankBNB:   BankBNB;
  aditional: Aditional;
}

export interface Aditional {
  currency:             string;
  gloss:                string;
  amount:               number;
  expirationDate:       string;
  singleUse:            boolean;
  additionalData:       string;
  destinationAccountId: number;
}

export interface BankBNB {
  id:      string;
  qr:      string;
  success: boolean;
  message: string;
}
