import readlineSync from 'readline-sync';
import { convertCompilerOptionsFromJson } from 'typescript';
import { getTicketOffers, getCartOffers } from './api/offers'
import { prices } from './mock/prices'
import { Cart } from './cart/Cart'
import { Ticket, TicketType } from './ticket/Ticket';

const t1 = new Ticket(TicketType.Standard, []);
const t2 = new Ticket(TicketType.Concession, []);
const t3 = new Ticket(TicketType.Standard, [{ id: 1, description: 'imax', price: 1.50 }]);
const cart = new Cart();

cart.addToCart(t1);
cart.addToCart(t2);
cart.addToCart(t3);

const offers = getOffers();

console.log('<---- Welcome to the Cinema! ---->');
console.log('We have the following offers currently:');
// offers.forEach((offer) => {
//   console.log(offer.description);

// })
// console.log(`Standard tickets cost £${prices.standard.toFixed(2)}`);
// console.log(`Concession tickets cost £${prices.concession.toFixed(2)}`);

// const shouldAddAnotherTicket = () => {
//   let answerToQuestion = false;
//   let yesOrNo = readlineSync.question('Would you like to add another ticket to the basket? (y/n)');

//   if (yesOrNo === 'y') {
//     answerToQuestion = true;
//   } else if (yesOrNo === 'n') {
//     answerToQuestion = false;
//   }

//   return answerToQuestion;
// }


// let keepAddingTickets = true;

// while (keepAddingTickets) {
//   let ticketToAdd = readlineSync.question('What kind of ticket would you like to add to the cart? (Standard or Concession): ');
//   console.log('We have the following extras which can be added to your tickets');
//   prices.extras.forEach((extra) => {
//     console.log(`ID: ${extra.id} ${extra.description} for £${extra.price.toFixed(2)}`)
//   })
//   let shouldAddExtra = readlineSync.question('Would you like to add an extra? (y/n): ');
//   if (shouldAddExtra === 'y') {
//     let extraId = readlineSync.question('Please specify the ID of the extra you would like to add:');
//     console.log(`${extraId}`);

//   }

//   console.log(`${ticketToAdd} added to cart`);
//   keepAddingTickets = shouldAddAnotherTicket();
// }
console.log('You have the following items in your cart:');
cart.getItems().forEach((item) => {
  console.log(`${item.getType()} - £${item.getPrice().toFixed(2)}`);
})
console.log(`Offer calculator offers - ${cart.offerCalculator.getOffers()[0].description}`)


