export interface PaymentMethod {
    active: boolean;
    code: string;
    currencies: string[];
    description: string;
    id: number;
    maximumAmount: number;
    minimumAmount: number;
    name: string;
    processingPaymentMessage: string;
    redirectRequired: boolean;
    redirectURL: string;
    requiredFields: RequiredField[];
  }
  
  export interface RequiredField {
    displayName: string;
    fieldType: FieldType;
    name: string;
    optional: boolean;
  }
  
  export type FieldType = "DATE" | "FILE" | "NUMBER" | "TEXT";