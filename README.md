# README

Congratulations on reaching this stage of our application process and thank you for taking the time to do our tech test! 🍕 🎉

### Expectations

Please think carefully about each aspect of the problem and define a solution that fits the requirements listed. Ideally answers should be written in Javascript (preferably Typescript) and can make use (or not) of any frameworks as desired. A complete solution to the problem is not required and a UI is not expected.

Please note any assumptions you make and what you would do differently in a production system.

As a guide this test should take approximately 3 hours, it is designed to be challenging and there are lots of ways to approach it. It's ok to spend more time on it but we don't want to take up an excessive amount of your time. If you don't have time to complete everything you'd like to, feel free to submit a partial solution with a summary of how you'd tackle the outstanding aspects. It won't count against you, we're aware that varying circumstances can make finding time for recruitment exercises tricky.

The code we have provided is just a Typescript/Javascript starting point. Feel free to add your own packages, amend the structure as needed, or use a different language. An example Typescript function and test can be found in the src/examples directory.

### Your Task

A cinema requires a new ticketing system to be used in their new app. There are two
types of ticket:

- Standard: £7.90
- Concession: £5.40

In addition, there are a few extras which can be added to some tickets:

- Real3D: £0.90
- IMAX: £1.50

The Cinema also wants to have special offers that are applied automatically. A specific offer
they would like to include from the start is:

- Three for One Thursdays (buy one get two free for tickets purchased on Thursdays)

Your task is to implement a checkout system that can calculate the total cost of any combination of tickets that a user might buy using the app.

Please bear in mind:

- Tickets can be added in any order
- Offers should always be applied if possible
- The cinema owner would like to be able to show the customer how much they saved when offers have been applied
- New types of pricing/offers may need to be added in the future

### Getting Started

Node Version:

```
v16.13.1
```

Install dependencies:

```shell
npm install
```

### Testing

This project uses [ts-jest](https://github.com/kulshekhar/ts-jest) which lets you use [Jest](https://jestjs.io/docs/getting-started) to test projects written in TypeScript.

Run all tests in watch mode:

```shell
npm test
```

### Assumptions

External data such as prices or offers would be retrieved via an API call. In the mock folder some examples have been included, retrieving via an array means that the prices could change in the backend and this would be retrieved in the shopping cart application. Any additonal extras are included in the extras array. Again if these were changed this would be reflected in the application.

```json
{
  "standard": 7.9,
  "concession": 5.4,
  "extras": [
    {
      "id": 1,
      "description": "Imax",
      "price": 1.5
    },
    {
      "id": 2,
      "description": "Real3D",
      "price": 0.9
    }
  ]
}
```

Offers are also included in the mock below is an example of one. The structure is the following

- description: Contains the description of the offer
- discountType: Can be percentage or buyXGetYFree offer
- offerCriteria: This is an array of rules which must be met to be eligible for the offer
  - description: can be day, or quantity
  - value: number if day corresponds to the day returned by .getDay(), if quantity corresponds to the number of tickets in the cart

```json
{
  "description": "Three for one Thursday",
  "discountType": "buyXGetYFree",
  "offerCriteria": [
    {
      "description": "day",
      "value": 4
    },
    {
      "description": "quantity",
      "value": 3
    }
  ],
  "percentageDiscount": 0,
  "buyXGetYFree": {
    "x": 1,
    "y": 2,
    "minNumberOfTickets": 3
  }
}
```
