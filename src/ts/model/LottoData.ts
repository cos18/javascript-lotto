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

  updateView = () => {
    this.ticketView?.updateView(this);
    this.resultView?.updateView(this);
  }
}
