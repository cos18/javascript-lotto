import TicketContainer from '../view/TicketContainer.js';
import BuyContainer from '../view/BuyContainer.js';
import ResultContainer from '../view/ResultContainer.js';

export default class LottoData {
  public tickets: number[][];
  public buyView: BuyContainer | undefined;
  public ticketView: TicketContainer | undefined;
  public resultView: ResultContainer | undefined;

  constructor() {
    this.tickets = [];
    this.buyView = undefined;
    this.ticketView = undefined;
    this.resultView = undefined;
  }

  addAutoTicket() {
    const ticketSet = new Set<number>();
    while (ticketSet.size !== 6) {
      ticketSet.add(Math.ceil(Math.random() * 45));
    }
    this.tickets.push(Array.from(ticketSet).sort());
  }

  updateView = () => {
    this.ticketView?.updateView(this);
    this.resultView?.updateView(this);
  }
}
