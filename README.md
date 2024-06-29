# PesePay-JS

A Node.js client library for integrating with the PesePay API with Typescript support.

>**This is an unofficial library made by [Michael Nyamande](https://twitter.com/mikeyny_zw) after being frustrated with the official library which is not well documented and is not regularly updated.**

## Installation

Using npm:

```bash
npm install pesepay-js
```

## Usage
To use this library, you need to initialize the PesePayClient with your API Key and Encryption Key:
```javascript
const { PesePayClient } = require('pesepay-js');

const client = new PesePayClient('your-api-key', 'your-encryption-key');
```
### Available Methods

**`initiateTransaction(transactionDetails)`**
Initiates a transaction:

**Using async/await syntax:**

```javascript
const transactionDetails = {
  amountDetails: {
    amount: 10,
    currencyCode: 'ZWL'
  },
  reasonForPayment: 'Online payment for Camera',
  resultUrl: 'https://my.resulturl.com',
  returnUrl: 'https://my.return.url.com'
};

try {
  const response = await client.initiateTransaction(transactionDetails);
  console.log(response);
  // Use the redirect URL to complete the transaction on the Pesepay payment page
  const redirectUrl = response.redirectUrl;
  // Save the reference number (used to check the status of a transaction and to make the payment)
  const referenceNumber = response.referenceNumber;
} catch (error) {
  console.error(error);
  // Handle error
}
```

Using promise syntax:
```javascript

client.initiateTransaction(transactionDetails)
  .then(response => {
    console.log(response);
    // User the redirect url to complete the transaction on Pesepay payment page
    const redirectUrl = response.redirectUrl;
    // Save the reference number (used to check the status of a transaction and to make the payment)
    const referenceNumber = response.referenceNumber;
  })
  .catch(error => console.error(error));
```


**`makeSeamlessPayment(paymentDetails)`**
Makes a seamless payment:
```javascript
// Provide the required payment details
const paymentDetails = {
  amountDetails: {
    amount: 10,
    currencyCode: "USD"
  },
  merchantReference: "YOUR-UNIQUE-REF",
  reasonForPayment: "Online payment for Camera",
  resultUrl: "https://my.return.url.com",
  paymentMethodCode: "PZW211",
  customer: {
    phoneNumber: "0770000000",
  },
  paymentMethodRequiredFields: { customerPhoneNumber: "0770000000" }
};

try {
  const response = await client.makeSeamlessPayment(paymentDetails);
  // Save the poll URL and reference number (used to check the status of a transaction)
  const pollUrl = response.pollUrl;
  const referenceNumber = response.referenceNumber;
} catch (error) {
  console.error(error);
  // Handle error
}
```

**`checkPaymentStatus(referenceNumber)`**
Checks the status of a payment:
```javascript
try {
  const response = await client.checkPaymentStatus('transaction-reference-number');
  console.log(response);
  // Check transaction status
  const status = response.transactionStatus;
} catch (error) {
  console.error(error);
  // Handle error
}
```

**`initiateAndPollSeamlessTransaction(request, pollingInterval?)`**
Initiates a seamless transaction and polls its status until completion. The polling frequency is optional and by default set to 3000 milliseconds.

```javascript
const paymentDetails = {
  amountDetails: {
    amount: 10,
    currencyCode: "USD"
  },
  merchantReference: "YOUR-UNIQUE-REF",
  reasonForPayment: "Online payment for Camera",
  resultUrl: "https://my.return.url.com",
  paymentMethodCode: "PZW211",
  customer: {
    phoneNumber: "0770000000",
  },
  paymentMethodRequiredFields: { customerPhoneNumber: "0770000000" }
};

try {
  const transaction = await client.initiateAndPollSeamlessTransaction(paymentDetails, 3000);
  console.log(transaction);
  // Transaction completed
} catch (error) {
  console.error(error);
  // Handle error
}
```

**`getActiveCurrency()`**
Gets the current active currencies on the gateway:
```javascript
try {
  const response = await client.getActiveCurrencies();
  console.log(response);
} catch (error) {
  console.error(error);
  // Handle error
}
```

**`getPaymentMethods(currencyCode)`**
Gets the payment methods available for a specified currency:
```javascript
const currencyCode = 'USD';
try {
  const response = await client.getPaymentMethodsByCurrency(currencyCode);
  console.log(response);
} catch (error) {
  console.error(error);
  // Handle error
}
```

## Testing

This project uses `Jest` to run it's tests. Before running tests, open `test/pesepay.test.ts` and change the values at the top of the file:
```javascript
// Replace with your actual keys for real testing
const ENCRYPTION_KEY= ""
const INTEGRATION_KEY=""
const phoneNumber=""
const referenceNumber = ""
```

After replacing this variables, you can run the tests with the following command:
```bash
npm run test
```

## License
This project is licensed under the ISC License.
