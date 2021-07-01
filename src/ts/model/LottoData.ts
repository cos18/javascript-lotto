import TicketContainer from '../view/TicketContainer.js';
import BuyContainer from '../view/BuyContainer.js';
import ResultContainer from '../view/ResultContainer.js';

export type Lotto = number[];

export interface WinningInfo {
  first: number;
  second: number;
  third: number;
  forth: number;
  fifth: number;
  winningPrize: number;
}

export default class LottoData {
  public tickets: Lotto[];
  public isNumberOpened: boolean;

  public buyView: BuyContainer | undefined;
  public ticketView: TicketContainer | undefined;
  public resultView: ResultContainer | undefined;

  constructor() {
    this.tickets = [];
    this.isNumberOpened = false;
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
    this.resultView?.updateView();
  }

  updateModal = (winningNumbers: number[]) => {
    const winningTickets: WinningInfo = {
      first: 0,
      second: 0,
      third: 0,
      forth: 0,
      fifth: 0,
      winningPrize: 0,
    };
    const winningSet = new Set(winningNumbers.slice(0, -1));

    this.tickets.forEach((ticket: Lotto) => {
      const intersection = new Set(ticket.filter((num: number) => winningSet.has(num)));
      switch (intersection.size) {
        case 6:
          winningTickets.first += 1;
          winningTickets.winningPrize += 2000000000;
          break;
        case 5:
          if (ticket.find((num: number) => num === winningNumbers[6])) {
            winningTickets.second += 1;
            winningTickets.winningPrize += 30000000;
          } else {
            winningTickets.third += 1;
            winningTickets.winningPrize += 1500000;
          }
          break;
        case 4:
          winningTickets.forth += 1;
          winningTickets.winningPrize += 50000;
          break;
        case 3:
          winningTickets.fifth += 1;
          winningTickets.winningPrize += 5000;
          break;
        default:
          break;
      }
    });

    this.resultView?.updateModal(this, winningTickets);
  }

  reset = () => {
    this.tickets.length = 0;
    this.isNumberOpened = false;
    this.updateView();
  }
}
