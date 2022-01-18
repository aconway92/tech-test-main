import { Ticket, TicketType } from './Ticket';

const ticketExtras = [
  {
    id: 1,
    description: 'Imax',
    price: 1.50
  },
  {
    id: 2,
    description: 'Real3D',
    price: 0.90
  }
]

describe('#constructor', () => {
  test('ticket constructor creates correct ticket', () => {
    const ticket = new Ticket(TicketType.Standard, []);

    expect(ticket.getType()).toBe('Standard');
  })
});


describe('#getPrice', () => {

  test('returns the correct price for the ticket type without addons', () => {
    const ticketStandard = new Ticket(TicketType.Standard, []);
    const ticketConcession = new Ticket(TicketType.Concession, []);

    expect(ticketStandard.getPrice()).toBe(7.90);
    expect(ticketConcession.getPrice()).toBe(5.40);
  })

  test('returns the correct price when is only Real3D', () => {
    const ticketStandardReal3D = new Ticket(TicketType.Standard, [ticketExtras[1]]);
    const ticketConcessionReal3D = new Ticket(TicketType.Concession, [ticketExtras[1]]);

    expect(ticketStandardReal3D.getPrice()).toBe(8.80);
    expect(ticketConcessionReal3D.getPrice()).toBe(6.30);
  })

  test('returns the correct price when is only imax', () => {
    const ticketStandardImax = new Ticket(TicketType.Standard, [ticketExtras[0]]);
    const ticketConcessionImax = new Ticket(TicketType.Concession, [ticketExtras[0]])

    expect(ticketStandardImax.getPrice()).toBe(9.40);
    expect(ticketConcessionImax.getPrice()).toBe(6.90)
  })

  test('returns the correct price when is both imax and real3D', () => {
    const ticketStandardImaxReal3D = new Ticket(TicketType.Standard, [ticketExtras[0], ticketExtras[1]]);
    const ticketConcessionImaxReal3D = new Ticket(TicketType.Concession, [ticketExtras[0], ticketExtras[1]]);

    expect(ticketStandardImaxReal3D.getPrice()).toBe(10.30);
    expect(ticketConcessionImaxReal3D.getPrice()).toBe(7.80);
  })
})