import { BuyXGetYFree, DiscountType, Offer } from './Offer'
import { getTicketOffers, getCartOffers } from '../api/offers';
import { Cart } from '../cart/Cart';
import { poundsToPennies, penniesToPounds } from '../utils/utils';
import { Ticket } from '../ticket/Ticket';

export class OfferCalculator {

  cartOffers: Offer[];
  ticketOffers: Offer[];
  date: Date;

  constructor() {
    this.cartOffers = this.fetchCartOffers();
    this.ticketOffers = this.fetchTicketOffers();
    this.date = new Date(Date.now());
  }
  // does cart meet criteria
  // apply discount
  // give best discount
  // discount name

  getDate() {
    return this.date;
  }

  setDate(date: Date) {
    this.date = date;
  }

  fetchTicketOffers() {
    const ticketOffers: Offer[] = [];
    getTicketOffers().map((offer) => {
      ticketOffers.push(new Offer(offer.description, DiscountType.PERCENTAGE, offer.offerCriteria, offer.percentageDiscount));
    })
    return ticketOffers;
  }

  fetchCartOffers() {
    const cartOffers: Offer[] = [];
    getCartOffers().map((offer) => {
      if (offer.discountType === 'percentage') {
        cartOffers.push(new Offer(offer.description, DiscountType.PERCENTAGE, offer.offerCriteria, offer.percentageDiscount, offer.buyXGetYFree));
      } else if (offer.discountType === 'buyXGetYFree') {
        cartOffers.push(new Offer(offer.description, DiscountType.BUY_X_GET_Y_FREE, offer.offerCriteria, offer.percentageDiscount, offer.buyXGetYFree));
      }
    })
    return cartOffers;
  }

  getBestCartDiscount(cart: Cart) {
    // return the best possible discount
    return this.getOffersForCart(cart)[0];
  }

  getBestTicketDiscount(ticket: Ticket) {
    // return the best possible discount
    return this.getOffersForTicket(ticket)[0];
  }

  getOffersForCart(cart: Cart) {
    let eligibleCartOffers = this.getEligibleCartOffers(cart);
    let potentialDiscounts: number[] = [];
    if (eligibleCartOffers.length > 0) {
      eligibleCartOffers.forEach((offer) => {
        potentialDiscounts.push(this.calculateCartDiscount(cart, offer));
      })
    }
    return potentialDiscounts.sort((a, b) => a - b);
  }

  getOffersForTicket(ticket: Ticket) {
    let eligibleTicketOffers = this.getEligibleTicketOffers(ticket);
    let potentialDiscounts: number[] = [];
    if (eligibleTicketOffers.length > 0) {
      eligibleTicketOffers.forEach((offer) => {
        potentialDiscounts.push(this.calculateTicketDiscount(ticket, offer));
      })
    }
    return potentialDiscounts.sort((a, b) => a - b);
  }

  getEligibleCartOffers(cart: Cart) {
    let eligibleCartOffers = this.cartOffers.filter((cartOffer) => {
      return this.doesCartMeetCriteria(cartOffer, cart);
    })

    return eligibleCartOffers;
  }

  getEligibleTicketOffers(ticket: Ticket) {
    let eligibleTicketOffers = this.ticketOffers.filter((ticketOffer) => {
      return this.doesTicketMeetCriteria(ticketOffer, ticket)
    })
    return eligibleTicketOffers;
  }

  calculateCartDiscount(cart: Cart, offer: Offer) {
    if (offer.discountType === DiscountType.BUY_X_GET_Y_FREE && offer.buyXGetYFree) {
      const offerBuyXGetYFree = offer.buyXGetYFree;
      return this.calculateBuyXgetYFreeDiscount(cart, offerBuyXGetYFree);
    } else if (offer.discountType === DiscountType.PERCENTAGE) {
      return this.calculatePercentageDiscount(cart.calculateTotalCost(), offer.percentageDiscount);
    }
    return 0;
  }

  calculateTicketDiscount(ticket: Ticket, offer: Offer) {
    if (offer.discountType === DiscountType.PERCENTAGE) {
      return this.calculatePercentageDiscount(ticket.getPrice(), offer.percentageDiscount);
    }
    return 0;
  }

  calculatePercentageDiscount(price: number, percentageDiscount: number) {
    // returns the discounted cost
    return price / 100 * percentageDiscount;
  }

  calculateBuyXgetYFreeDiscount(cart: Cart, buyXGetYFree: BuyXGetYFree) {
    let discountedPrice = poundsToPennies(cart.calculateTotalCost());
    const { x, y, minNumberOfTickets } = buyXGetYFree;
    if (cart.getNumberOfTickets() >= (minNumberOfTickets)) {
      // cheapest items should be free
      let sortedTickets = cart.getTickets().sort((a, b) => {
        return a.getPrice() - b.getPrice()
      })
      let numberOfTicketsToRemove = 0;
      if (cart.getNumberOfTickets() % (minNumberOfTickets) === 0) {
        numberOfTicketsToRemove = cart.getNumberOfTickets() / (minNumberOfTickets);
      } else {
        const remainder = cart.getNumberOfTickets() % (minNumberOfTickets);
        numberOfTicketsToRemove = (cart.getNumberOfTickets() - remainder) / (minNumberOfTickets);
      }
      for (let i = 0; i < (y * numberOfTicketsToRemove); i++) {
        discountedPrice -= poundsToPennies(sortedTickets[i].getPrice());
      }
    }
    return penniesToPounds(discountedPrice);

  }

  doesCartMeetCriteria(offer: Offer, cart: Cart) {
    let cartMeetsCriteria = true;
    let numberOfRules = offer.offerCriteria.length;
    let counter = 0;
    while (counter < numberOfRules && cartMeetsCriteria) {
      let offerRule = offer.offerCriteria[counter];
      switch (offerRule.description) {
        case 'day':
          cartMeetsCriteria = this.getDate().getDay() === offerRule.value;
          break;
        case 'quantity':
          cartMeetsCriteria = cart.getNumberOfTickets() >= offerRule.value;
          break;
        default:
          break;
      }
      counter++;
    }
    return cartMeetsCriteria;
  }

  doesTicketMeetCriteria(offer: Offer, ticket: Ticket) {
    let ticketMeetsCriteria = true;
    let numberOfRules = offer.offerCriteria.length;
    let counter = 0;
    while (counter < numberOfRules && ticketMeetsCriteria) {
      let offerRule = offer.offerCriteria[counter];
      switch (offerRule.description) {
        case 'ticketType':
          ticketMeetsCriteria = ticket.getType() === offerRule.value
          break;
        case 'ticketExtra':
          ticketMeetsCriteria = ticket.getTicketExtras().filter(ticketExtra => ticketExtra.id === offerRule.value).length > 0;
          break;
        default:
          break;
      }
      counter++;
    }
    return ticketMeetsCriteria;
  }
}