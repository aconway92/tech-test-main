import { Cart } from "../cart/Cart"
import { Ticket, TicketType } from "../ticket/Ticket"
import { DiscountType, Offer } from "./Offer"
import { OfferCalculator } from "./OfferCalculator"

const products: Ticket[] = [
  new Ticket(TicketType.Standard, []),
  new Ticket(TicketType.Concession, []),
  new Ticket(TicketType.Standard, [{ id: 1, description: 'imax', price: 1.50 }])
]

describe('#getEligibleCartOffers', () => {
  test('get eligible cart offers returns an array of eligible offers', () => {
    const cart = new Cart();
    const offerCalculator = cart.offerCalculator;
    offerCalculator.setDate(new Date(2022, 0, 20));
    cart.addToCart(products[0]);
    cart.addToCart(products[0]);
    cart.addToCart(products[1]);

    const eligibleCartOffers = offerCalculator.getEligibleCartOffers(cart);

    expect(eligibleCartOffers.length).toBe(1);
    expect(eligibleCartOffers[0].description).toBe('Three for one Thursday');

  })
})

describe('#getElibileTicketOffers', () => {
  test('get eligible ticket offers returns true if ticket is eligble for offers', () => {
    const ticket = products[1];
    const offer = new Offer('Concessions half off', DiscountType.PERCENTAGE, [{ description: 'ticketType', value: 'Concession' }], 50);
    const offerCalculator = new OfferCalculator();


    const elibleTicketOffers = offerCalculator.getEligibleTicketOffers(ticket);
    expect(elibleTicketOffers.length).toBe(1);
    expect(elibleTicketOffers[0].description).toBe('Concessions half off');
  })
})

describe('#calculateCartDiscount', () => {
  test('calculate cart discount applies 3 for 1 thursday discount correctly', () => {
    const cart = new Cart();
    const offerCalculator = cart.offerCalculator;
    offerCalculator.setDate(new Date(2022, 0, 20));
    cart.addToCart(products[0]);
    cart.addToCart(products[0]);
    cart.addToCart(products[1]);
    const offer = new Offer('Three for one Thursday', DiscountType.BUY_X_GET_Y_FREE, [{ description: 'day', value: 5 }, { description: 'quantity', value: 3 }], 0, { x: 1, y: 2, minNumberOfTickets: 3 });

    const discountToBeApplied = offerCalculator.calculateCartDiscount(cart, offer);
    expect(discountToBeApplied).toBe(7.90);
  })

  test('3 for one Thursday should result in discount of 4 tickets if 6 tickets purchased', () => {
    const cart = new Cart();
    const offerCalculator = cart.offerCalculator;
    offerCalculator.setDate(new Date(2022, 0, 20));
    cart.addToCart(products[0]);
    cart.addToCart(products[0]);
    cart.addToCart(products[1]);
    cart.addToCart(products[0]);
    cart.addToCart(products[0]);
    cart.addToCart(products[1]);

    const offer = new Offer('Three for one Thursday', DiscountType.BUY_X_GET_Y_FREE, [{ description: 'day', value: 5 }, { description: 'quantity', value: 3 }], 0, { x: 1, y: 2, minNumberOfTickets: 3 });

    const discountToBeApplied = offerCalculator.calculateCartDiscount(cart, offer);
    expect(discountToBeApplied).toBe(15.80);
  })

  test('calculate cart discount applies 50% off cart when you buy 2 tickets', () => {
    const cart = new Cart();
    const offerCalculator = cart.offerCalculator;
    cart.addToCart(products[0]);
    cart.addToCart(products[0]);
    cart.addToCart(products[1]);

    const offer = new Offer('Three for one Thursday', DiscountType.PERCENTAGE, [{ description: 'quantity', value: 3 }], 50);

    const discountToBeApplied = offerCalculator.calculateCartDiscount(cart, offer);
    expect(discountToBeApplied).toBe(10.60);

  })
})

describe('#calculateTicketDiscount', () => {
  test('calculate ticket discount applies 50% off on standard tickets', () => {
    const cart = new Cart();
    const offerCalculator = cart.offerCalculator;
    cart.addToCart(products[0]);
    cart.addToCart(products[0]);

    const offer = new Offer('50% off standard tickets', DiscountType.PERCENTAGE, [{ description: 'ticketType', value: TicketType.Standard }], 50);

    const discountToBeApplied = offerCalculator.calculateTicketDiscount(products[0], offer);
    expect(discountToBeApplied).toBe(3.95);
  })
})