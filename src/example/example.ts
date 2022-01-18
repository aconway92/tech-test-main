export interface Product {
  name: string;
  price: number;
}

export function totalPrice(products: Product[]): number {
  return products[0].price + products[1].price
}
