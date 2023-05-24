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
  .then(response => {
    console.log(response);
    // User the redirect url to complete the transaction on Pesepay payment page
    const redirectUrl = response.redirectUrl;
    // Save the reference number (used to check the status of a transaction and to make the payment)
    const referenceNumber = response.referenceNumber;
  })
  .catch(error => console.error(error));
```
 Alternatively, use await with try-catch syntax 
 ```javascript
 try{
    result = await client.initiateTransaction(transactionDetails);
    // User the redirect url to complete the transaction on Pesepay payment page
    const redirectUrl = response.redirectUrl;
    // Save the reference number (used to check the status of a transaction and to make the payment)
    const referenceNumber = response.referenceNumber;
 }catch(error){
    console.error(error)
    //handle error
 }

 ```


**`makeSeamlessPayment(paymentDetails)`**
Makes a seamless payment:
```javascript
// Provide the required payment details
const paymentDetails = {
    amountDetails: {
      amount: 10,
      currencyCode: "ZWL"
    },
    merchantReference:  "YOUR-UNIQUE-REF",
    reasonForPayment: "Online payment for Camera",
    resultUrl: "https://my.return.url.com",
    paymentMethodCode:  "PZW201",
    customer: {
      phoneNumber:"0770000000",
    },
    paymentMethodRequiredFields: { customerPhoneNumber: "0770000000"}
  };

client.makeSeamlessPayment(paymentDetails)
  .then(response => {
       // Save the poll url and reference number (used to check the status of a transaction)
       const pollUrl = response.pollUrl;
       const referenceNumber = response.referenceNumber;
     })
     .catch(error => {
       // Handle error
     });

```

**`checkPaymentStatus(referenceNumber)`**
Checks the status of a payment:
```javascript
client.checkPaymentStatus('transaction-reference-number')
  .then(response => {
    console.log(response)
    // check transaction status
    const status = response.transactionStatus
    })
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
const currencyCode = 'ZWL'
client.getPaymentMethods(currencyCode)
  .then(response => console.log(response))
  .catch(error => console.error(error));
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