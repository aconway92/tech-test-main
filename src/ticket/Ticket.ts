import { penniesToPounds, poundsToPennies } from "../utils/utils";
import { prices } from '../mock/prices';

export enum TicketType {
  Standard = "Standard",
  Concession = "Concession"
}

export interface TicketExtras {
  id: number,
  description: string,
  price: number,
}

export class Ticket {
  private type: TicketType;
  private price: number;
  private ticketExtras: TicketExtras[];

  constructor(type: TicketType, ticketExtas: TicketExtras[]) {
    this.type = type;
    this.ticketExtras = ticketExtas;
    this.price = this.calculatePrice();
  }

  public getType() {
    return this.type;
  }

  public getTicketExtras() {
    return this.ticketExtras;
  }

  public getPrice() {
    return this.price;
  }

  public printExtras() {

  }

  private calculatePrice() {
    let cost = 0;
    if (this.type === TicketType.Standard) {
      cost += poundsToPennies(prices.standard);
    } else if (this.type === TicketType.Concession) {
      cost += poundsToPennies(prices.concession);
    }

    if (this.ticketExtras) {
      this.ticketExtras.forEach((ticketExtra) => {
        cost += poundsToPennies(ticketExtra.price)
      })
    }
    return penniesToPounds(cost);
  }

}