import axios, { AxiosInstance } from 'axios';
import { Transaction } from './models/transaction'; // Import from your transaction file
import { PesePaySecurity } from './lib/security-handler'; // Import from your security file
import { MakePaymentRequest, TransactionInitiationRequest } from './models/payment';
import { Currency } from './models/currency';
import { PaymentMethod } from './models/payment-method';

/**
 * PesePayClient class to interact with the PesePay API.
 */
export class PesePayClient {
  private http: AxiosInstance;
  private security: PesePaySecurity;

  /**
   * Creates an instance of PesePayClient.
   * @param {string} integrationKey - The integration key for authorization.
   * @param {string} encryptionKey - The encryption key for securing requests.
   */

  constructor(integrationKey: string, encryptionKey: string) {
    const baseURL = 'https://api.pesepay.com/api/payments-engine/'

    this.http = axios.create({
      baseURL,
      headers: {
        'authorization': integrationKey,
        'content-type': 'application/json'
      }, insecureHTTPParser: true
    });

    this.security = new PesePaySecurity(encryptionKey);
  }

  /**
   * Initiates a [transaction](https://developers.pesepay.com/api-reference/initiate-transaction).
   * @param {TransactionInitiationRequest} request - The transaction initiation request.
   * @returns {Promise<Transaction>} - The initiated transaction.
   */
  async initiateTransaction(request: TransactionInitiationRequest): Promise<Transaction> {
    const encryptedPayload = this.security.encryptData(request);
    const response = await this.http.post('v1/payments/initiate', { payload: encryptedPayload });
    return this.security.decryptData(response.data.payload) as Transaction;
  }

  /**
   * Makes a [seamless payment](https://developers.pesepay.com/api-reference/make-payment).
   * @param {MakePaymentRequest} request - The make payment request.
   * @returns {Promise<Transaction>} - The resulting transaction.
   */
  async makeSeamlessPayment(request: MakePaymentRequest): Promise<Transaction> {
    if (!request.customer.email) {
      request.customer.email = "" // their api allows an empty string here
    }

    if (!request.customer.name) {
      request.customer.name = "GUEST"
    }
    request.resultUrl = "https://pesepay.com/"  //not needed for seamless payment so defaulting it to their website
    const payload = this.security.encryptData(request);
    const response = await this.http.post('v2/payments/make-payment', { payload });
    const decryptedResponse = this.security.decryptData(response.data.payload);
    return decryptedResponse as Transaction;
  }

  /**
   * [Checks the status](https://developers.pesepay.com/api-reference/check-payment-status) of a payment.
   * @param {string} referenceNumber - The reference number of the transaction.
   * @returns {Promise<Transaction>} - The transaction status.
   */
  async checkPaymentStatus(referenceNumber: string): Promise<Transaction> {
    const response = await this.http.get(`v1/payments/check-payment?referenceNumber=${referenceNumber}`);
    return this.security.decryptData(response.data.payload) as Transaction;
  }

  /**
   * Initiates and polls a seamless transaction until it is no longer pending or processing.
   * @param {MakePaymentRequest} request - The make payment request.
   * @param {number} [pollingInterval=5000] - The polling interval in milliseconds.
   * @returns {Promise<Transaction>} - The final transaction status.
   */
  async initiateAndPollSeamlessTransaction(request: MakePaymentRequest, pollingInterval: number = 3000): Promise<Transaction> {
    const transaction = await this.makeSeamlessPayment(request);
    let transactionStatus = transaction.transactionStatus;

    while (transactionStatus === "PENDING" || transactionStatus === "PROCESSING") {
      await new Promise(resolve => setTimeout(resolve, pollingInterval));
      const updatedTransaction = await this.checkPaymentStatus(transaction.referenceNumber);
      transactionStatus = updatedTransaction.transactionStatus;
      if (transactionStatus !== "PENDING" && transactionStatus !== "PROCESSING") {
        return updatedTransaction;
      }
    }

    return transaction;
  }

  /**
   * Gets the list of [active currencies](https://developers.pesepay.com/api-reference/get-active-currencies).
   * @returns {Promise<Currency[]>} - The list of active currencies.
   */
  async getActiveCurrencies(): Promise<Currency[]> {
    const response = await this.http.get<Currency[]>('v1/currencies/active');
    return response.data;
  }

  /**
   * Gets the [payment methods](https://developers.pesepay.com/api-reference/get-payment-methods-by-currency) available for a given currency.
   * @param {string} currencyCode - The currency code.
   * @returns {Promise<PaymentMethod[]>} - The list of payment methods.
   */
  async getPaymentMethodsByCurrency(currencyCode: string): Promise<PaymentMethod[]> {
    const response = await this.http.get<PaymentMethod[]>(`v1/payment-methods/for-currency?currencyCode=${currencyCode}`);
    return response.data;
  }
}