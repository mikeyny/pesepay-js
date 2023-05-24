export interface Transaction {
    amountDetails: AmountDetails;
    applicationCode: string;
    applicationName: string;
    chargeType: ChargeType;
    customer: Customer;
    customerAmountPaid: AmountPaid;
    dateOfTransaction: string;
    id: number;
    internalReference: string;
    liquidationStatus: LiquidationStatus;
    liquidationTransactionReference: string;
    localDateTimeOfTransaction: string;
    merchantReference: string;
    paymentMetadata: Record<string, unknown>; 
    paymentMethodDetails: PaymentMethodDetails;
    pollUrl: string;
    reasonForPayment: string;
    redirectRequired: boolean;
    redirectUrl: string;
    referenceNumber: string;
    resultUrl: string;
    returnUrl: string;
    settlementMode: string;
    timeOfTransaction: string;
    transactionDate: string;
    transactionStatus: TransactionStatus;
    transactionStatusCode: number;
    transactionStatusDescription: string;
    transactionType: TransactionType;
}
  
  
  export interface AmountDetails {
    amount: number;
    currencyCode: string;
    customerPayableAmount: number;
    defaultCurrencyAmount: number;
    defaultCurrencyCode: string;
    formattedMerchantAmount: string;
    merchantAmount: number;
    totalTransactionAmount: number;
    transactionServiceFee: number;
  }
  
  export interface Customer {
    contactNumbers: string[];
    email: string;
    name: string;
  }
  
  export interface AmountPaid {
    amountPaid: number;
    currencyCode: string;
  }
  
  export interface PaymentMethodDetails {
    paymentMethodCode: string;
    paymentMethodId: number;
    paymentMethodMessage: string;
    paymentMethodName: string;
    paymentMethodReference: string;
    paymentMethodStatus: string;
  }
  
  // Specific string values
  export type ChargeType = "NO_CHARGE" | "SHARED_TRANSACTIONAL_CHARGE" | "TRANSACTIONAL_CHARGE_FOR_CUSTOMER" | "TRANSACTIONAL_CHARGE_FOR_MERCHANT";
  
  export type LiquidationStatus = "COMPLETED" | "DUE_FOR_LIQUIDATION" | "IN_PROGRESS" | "NO_LIQUIDATION_REQUIRED" | "PENDING" | "WAITING_FOR_DETERMINATION";
  
  export type TransactionType = "BASIC" | "INVOICE";
  
  export type TransactionStatus = "AUTHORIZATION_FAILED" | "CANCELLED" | "CLOSED" | "CLOSED_PERIOD_ELAPSED" | "DECLINED" | "ERROR" | "FAILED" | "INITIATED" | "INSUFFICIENT_FUNDS" | "PARTIALLY_PAID" | "PENDING" | "PROCESSING" | "REVERSED" | "SERVICE_UNAVAILABLE" | "SUCCESS" | "TERMINATED
  