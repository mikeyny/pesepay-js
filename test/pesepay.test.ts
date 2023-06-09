// pesepay.test.ts
import { PesePayClient } from '../src/index';

// Replace with your actual keys for real testing
const ENCRYPTION_KEY= ""
const INTEGRATION_KEY=""
const phoneNumber=""
const referenceNumber = "";


const client = new PesePayClient(INTEGRATION_KEY, ENCRYPTION_KEY);

test('initiate transaction', async () => {
  const transaction = {
    amountDetails: {
      amount: 10,
      currencyCode: "ZWL"
    },
    reasonForPayment: "Online payment for Camera",
    resultUrl: "https://my.resulturl.com",
    returnUrl: "https://my.return.url.com"
  };

  const result = await client.initiateTransaction(transaction);
 // console.log(result);
  expect(result).toBeDefined();
});

test('check payment status', async () => {
  var result
  try{
   result = await client.checkPaymentStatus(referenceNumber);
  } catch (error) {
    console.log(error)
  }
  expect(result).toBeDefined();
});

test('make seamless payment', async () => {
  const payment = {
    amountDetails: {
      amount: 10,
      currencyCode: "ZWL"
    },
    merchantReference:  Math.floor(Math.random() * 10000).toString(),
    reasonForPayment: "Online payment for Camera",
    resultUrl: "https://my.return.url.com",
    paymentMethodCode:  "PZW201",
    customer: {
      phoneNumber:phoneNumber,
    },
    paymentMethodRequiredFields: { customerPhoneNumber: phoneNumber}
  };

  var result
  try {
    result = await client.makeSeamlessPayment(payment);
  } catch (error) {
    console.log(error)
  }

  expect(result).toBeDefined();
});

test('get active currencies', async () => {
  const result = await client.getActiveCurrencies();
  expect(result).toBeDefined();
  expect(result).toBeDefined();
});

test('get payment methods by currency', async () => {
  const currencyCode = 'testCurrencyCode';
  const result = await client.getPaymentMethodsByCurrency(currencyCode);
  expect(result).toBeDefined();
  expect(result).toBeDefined();
});
