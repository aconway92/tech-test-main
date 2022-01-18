import { Product, totalPrice } from './example';

const products: Product[] = [
  {
    name: 'Ooni Karu 16 Multi-Fuel Pizza Oven',
    price: 699.00
  },
  {
    name: 'Ooni 16" Pizza Peel',
    price: 54.99
  }
]

describe('#totalPrice', () => {
  test('returns correct sum', () => {
    expect(totalPrice(products)).toEqual(753.99);
  });
});
