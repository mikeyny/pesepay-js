# PesePay-JS

A Node.js client library for integrating with the PesePay API.

>**This is an unofficial library made by [Michael Nyamande](https://twitter.com/mikeyny_zw) after being frustrated with the official library which is poorly documented and not well maintained.**

## Installation

Using npm:

```bash
npm install pesepay-js
```

## Usage
To use this library, you need to initialize the PesePayClient with your API Key and Encryption Key:
```javascript
const PesePayClient = require('pesepay-js');

const client = new PesePayClient('your-api-key', 'your-encryption-key');
```
### Available Methods

**`initiateTransaction(transactionDetails)`**
Initiates a transaction:
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

client.initiateTransaction(transactionDetails)
  .then(response => console.log(response))
  .catch(error => console.error(error));
```

**`makeSeamlessPayment(paymentDetails)`**
Makes a seamless payment:
```javascript
// Provide the required payment details
const paymentDetails = { /* ... */ };

client.makeSeamlessPayment(paymentDetails)
  .then(response => console.log(response))
  .catch(error => console.error(error));

```

**`checkPaymentStatus(referenceNumber)`**
Checks the status of a payment:
```javascript
client.checkPaymentStatus('transaction-reference-number')
  .then(response => console.log(response))
  .catch(error => console.error(error));
```

**`getActiveCurrency()`**
Gets the current active currencies on the gateway:
```javascript
client.getActiveCurrency()
  .then(response => console.log(response))
  .catch(error => console.error(error));

```

**`getPaymentMethods(currencyCode)`**
Gets the payment methods available for a specified currency:
```javascript
client.getPaymentMethods('ZWL')
  .then(response => console.log(response))
  .catch(error => console.error(error));
```

## Testing
You can run the tests with the following command:
```bash
npm run test
```

## License
This project is licensed under the MIT License.