import axios, { AxiosInstance } from 'axios';
import {  Transaction } from './models/transaction'; // Import from your transaction file
import { PesePaySecurity } from './lib/security-handler'; // Import from your security file
import { MakePaymentRequest, TransactionInitiationRequest } from './models/payment';
import { Currency } from './models/currency';
import { PaymentMethod } from './models/payment-method';


export class PesePayClient {
    private http: AxiosInstance;
    private security: PesePaySecurity;
    constructor(integrationKey: string, encryptionKey: string) {
      const baseURL = 'https://api.pesepay.com/api/payments-engine/'

        this.http = axios.create({
          baseURL,
          headers: {
            'authorization': integrationKey,
            'content-type': 'application/json'
          },insecureHTTPParser:true
        });
    
        this.security = new PesePaySecurity(encryptionKey);

        // Function to sanitize response headers




    // Add a response interceptor
    this.http.interceptors.response.use(
      response => {
          // Sanitize headers in the response
          response.headers = this.sanitizeHeaders(response.headers);
          return response;
      },
      error => {
          // Check if the error is due to invalid header value character
          if (error.response) {
              error.response.headers = this.sanitizeHeaders(error.response.headers);
              return Promise.resolve(error.response);
          }
          return Promise.reject(error);
      }
    );
      }

      sanitizeHeaders(headers: any): Record<string, string | string[]>{
        const sanitizedHeaders: Record<string, string | string[]> = {};
        for (const key in headers) {
            if (headers.hasOwnProperty(key)) {
                try {
                    sanitizedHeaders[key] = headers[key].replace(/[\x00-\x1F\x7F-\x9F]/g, '');
                } catch (e) {
                    sanitizedHeaders[key] = headers[key];
                }
            }
        }
        return sanitizedHeaders;
      };
    
      async initiateTransaction(request: TransactionInitiationRequest): Promise<Transaction> {
        const encryptedPayload = this.security.encryptData(request);
        const response = await this.http.post('v1/payments/initiate', { payload: encryptedPayload });
        return this.security.decryptData(response.data.payload) as Transaction;
      }

      async makeSeamlessPayment(request: MakePaymentRequest): Promise<Transaction> {
        if(!request.customer.email){
          request.customer.email = "" // their api allows an empty string here
        }

        if(!request.customer.name){
          request.customer.name = "GUEST"
        }
        request.resultUrl = "https://pesepay.com/"  //not needed for seamless payment so defaulting it to their website
        const payload = this.security.encryptData(request);
        const response = await this.http.post('v2/payments/make-payment', { payload });
        const decryptedResponse = this.security.decryptData(response.data.payload);
        return decryptedResponse as Transaction;
      }

  async checkPaymentStatus(referenceNumber: string): Promise<Transaction> {
    const response = await this.http.get(`v1/payments/check-payment?referenceNumber=${referenceNumber}`);
    return this.security.decryptData(response.data.payload)as Transaction;
  }

  async getActiveCurrencies(): Promise<Currency[]> {
    const response = await this.http.get<Currency[]>('v1/currencies/active');
    return  response.data ;
  }

  async getPaymentMethodsByCurrency(currencyCode: string): Promise<PaymentMethod[]> {
    const response = await this.http.get<PaymentMethod[]>(`v1/payment-methods/for-currency?currencyCode=${currencyCode}`);
    return response.data ;
  }
}