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
      currencyCode: "USD"
    },
    reasonForPayment: "Online payment for Camera",
    resultUrl: "https://my.resulturl.com",
    returnUrl: "https://my.return.url.com"
  };

  const result = await client.initiateTransaction(transaction);
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
      currencyCode: "USD"
    },
    merchantReference:  Math.floor(Math.random() * 10000).toString(),
    reasonForPayment: "Online payment for Camera",
    resultUrl: "https://my.return.url.com",
    paymentMethodCode:  "PZW211",
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

test('initiate and poll seamless payment', async () => {
  const payment = {
    amountDetails: {
      amount: 10,
      currencyCode: "USD"
    },
    merchantReference: Math.floor(Math.random() * 10000).toString(),
    reasonForPayment: "Online payment for Camera",
    resultUrl: "https://my.return.url.com",
    paymentMethodCode: "PZW211",
    customer: {
      phoneNumber: phoneNumber,
    },
    paymentMethodRequiredFields: { customerPhoneNumber: phoneNumber }
  };

  var result;
  try {
    result = await client.initiateAndPollSeamlessTransaction(payment);
  } catch (error) {
    console.log(error);
  }

  expect(result).toBeDefined();
  if (result) {
    expect(result.transactionStatus).not.toBe("PENDING");
    expect(result.transactionStatus).not.toBe("PROCESSING");
  }
},65000); // set timeout for 65s


test('get active currencies', async () => {
  const result = await client.getActiveCurrencies();
  console.log(result)
  expect(result).toBeDefined();
});

test('get payment methods by currency', async () => {
  const currencyCode = 'USD';
  const result = await client.getPaymentMethodsByCurrency(currencyCode);
  expect(result).toBeDefined();
});
