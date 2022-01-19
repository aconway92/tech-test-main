import { OfferCalculator } from '../offer/OfferCalculator';
import { Ticket } from '../ticket/Ticket';
import { penniesToPounds, poundsToPennies } from '../utils/utils';

export class Cart {
  tickets: Ticket[];
  totalCost: number;
  isDiscountApplied: boolean;
  numberOfTickets: number;
  discountedCost: number;
  offerCalculator: OfferCalculator;
  savings: number;

  constructor() {
    this.tickets = [];
    this.totalCost = 0;
    this.isDiscountApplied = false;
    this.numberOfTickets = 0;
    this.discountedCost = 0;
    this.offerCalculator = new OfferCalculator();
    this.savings = 0;
  }

  addToCart(ticket: Ticket) {
    this.tickets.push(ticket);
    this.setNumberOfTickets(this.numberOfTickets + 1);

    this.setTotalCost(penniesToPounds(poundsToPennies(this.getTotalCost()) + poundsToPennies(ticket.getPrice())));
    let cartDiscount = this.calculateCartOffers();

    this.applyDiscount(cartDiscount)
  }

  applyDiscount(discount: number) {
    this.discountedCost = discount;
    console.log(this.totalCost);

    this.setSavings(penniesToPounds(poundsToPennies(this.getTotalCost()) - poundsToPennies(this.discountedCost)));
  }

  calculateTicketOffers(ticket: Ticket) {
    return this.offerCalculator.getBestTicketDiscount(ticket)
  }

  calculateCartOffers() {
    return this.offerCalculator.getBestCartDiscount(this);
  }

  settickets(tickets: Ticket[]) {
    this.tickets = tickets;
  }

  getTickets() {
    return this.tickets;
  }

  getNumberOfTickets() {
    return this.numberOfTickets;
  }

  setNumberOfTickets(numberOfTickets: number) {
    this.numberOfTickets = numberOfTickets;
  }

  getSavings() {
    return this.savings;
  }

  setSavings(savings: number) {
    this.savings = savings;
  }

  calculateTotalCost() {
    const totalCost = this.tickets.reduce((previousValue, currentValue) => {
      return previousValue + poundsToPennies(currentValue.getPrice())
    }, 0);

    return penniesToPounds(totalCost);
  }

  setTotalCost(totalCost: number) {
    this.totalCost = totalCost;
  }

  getTotalCost() {
    return this.totalCost;
  }

  setDiscountedCost(discountedCost: number) {
    this.discountedCost = discountedCost;
  }

  getDiscountedCost() {
    return this.discountedCost;
  }

}