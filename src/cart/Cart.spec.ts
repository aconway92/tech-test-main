import { Cart } from './Cart';
import { Ticket, TicketType } from '../ticket/Ticket';

const mockDate = () => {
  jest
    .spyOn(global.Date, 'now')
    .mockImplementationOnce(() =>
      new Date('2022-01-20T11:01:58.135Z').valueOf()
    )
}

const products: Ticket[] = [
  new Ticket(TicketType.Standard, []),
  new Ticket(TicketType.Concession, [])
]

describe('cart constructor', () => {
  test('when created product array is empty', () => {
    const cart = new Cart();
    expect(cart.getTickets().length).toBe(0);
  })

  test('when cart is created total value should be 0', () => {
    const cart = new Cart();
    expect(cart.getTotalCost()).toBe(0);
  })
});

describe('#addToCart', () => {
  test('adding product to cart increases items array by 1', () => {
    const cart = new Cart();
    cart.addToCart(products[0]);
    expect(products[0]).toBe(cart.getTickets()[0]);
  })

  test('adding a cart to product should increment the number of tickets in the cart', () => {
    const cart = new Cart();
    cart.addToCart(products[0]);
    expect(cart.getNumberOfTickets()).toBe(1);
  })
})

describe('#calculateTotalCost', () => {
  test('calculate total cost returns correct value', () => {
    const cart = new Cart();
    cart.addToCart(products[0]);
    cart.addToCart(products[1]);
    cart.addToCart(products[1]);

    expect(cart.calculateTotalCost()).toBe(18.70)
  })
})

describe('#applyDiscount', () => {
  test('calculates correct discount three for one thursday', () => {
    mockDate();
    const cart = new Cart();
    cart.addToCart(products[0]);
    cart.addToCart(products[1]);
    cart.addToCart(products[1]);

    expect(cart.getDiscountedCost()).toBe(7.9)
  })
})

describe('#showSavings', () => {
  test('when discount applied correct savings are calculted', () => {
    mockDate();
    const cart = new Cart();
    cart.addToCart(products[0]);
    cart.addToCart(products[1]);
    cart.addToCart(products[1]);

    expect(cart.getSavings()).toBe(10.80);
  })
})