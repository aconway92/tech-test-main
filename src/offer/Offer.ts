import { Cart } from '../cart/Cart';
import { TicketType, Ticket } from '../ticket/Ticket';

export interface OfferRules {
  description: string,
  value: number | TicketType | string
}


export enum DiscountType {
  BUY_X_GET_Y_FREE,
  PERCENTAGE
}

export interface BuyXGetYFree {
  x: number,
  y: number,
  minNumberOfTickets: number
}

export class Offer {
  description: string;
  discountType: DiscountType;
  offerCriteria: OfferRules[];
  percentageDiscount: number;
  buyXGetYFree?: BuyXGetYFree

  constructor(description: string, discountType: DiscountType, offerCriteria: OfferRules[], percentageDiscount: number = 0, buyXGetYFree?: BuyXGetYFree) {
    this.description = description;
    this.discountType = discountType;
    this.offerCriteria = offerCriteria;
    this.percentageDiscount = percentageDiscount;
    this.buyXGetYFree = buyXGetYFree;
  }


  doesTicketMeetCriteria(ticket: Ticket) {
    let ticketMeetsCriteria = false;
    this.offerCriteria.forEach((offerRule) => {
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
    })

    return ticketMeetsCriteria;
  }
}