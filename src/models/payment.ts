interface AmountDetails {
  amount: number;
  currencyCode: string;
}

export interface TransactionInitiationRequest {
  amountDetails: AmountDetails;
  reasonForPayment: string;
  resultUrl: string;
  returnUrl: string;
}

export interface PaymentMethodRequiredFields {
  [key: string]: string;
}

export interface MakePaymentRequest {
  amountDetails: AmountDetails;
  merchantReference: string;
  reasonForPayment: string;
  resultUrl: string;
  returnUrl?: string;
  paymentMethodCode: string;
  customer: Customer;
  paymentMethodRequiredFields: PaymentMethodRequiredFields;
}

export interface Customer {
    phoneNumber: string;
    email?: string; //defaults to ""
    name?: string ; // defaults to "GEUST"
  }