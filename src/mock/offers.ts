import { DiscountType, Offer } from '../offer/Offer';

export const cartOffers = [
  {
    description: 'Three for one Thursday',
    discountType: 'buyXGetYFree',
    offerCriteria: [
      {
        description: 'day',
        value: 4
      },
      {
        description: 'quantity',
        value: 3
      }
    ],
    percentageDiscount: 0,
    buyXGetYFree: {
      x: 1,
      y: 2,
      minNumberOfTickets: 3
    }
  }, {
    description: 'Three for one Tuesday',
    discountType: 'buyXGetYFree',
    offerCriteria: [
      {
        description: 'day',
        value: 3
      },
      {
        description: 'quantity',
        value: 3
      }
    ],
    percentageDiscount: 0,
    buyXGetYFree: {
      x: 1,
      y: 2,
      minNumberOfTickets: 3
    }
  }
]

export const ticketOffers = [
  {
    description: 'Concessions half off',
    discountType: 'percentage',
    offerCriteria: [
      {
        description: 'ticketType',
        value: 'Concession'
      },
    ],
    percentageDiscount: 50
  }
]