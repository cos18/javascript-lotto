import LottoData from '../model/LottoData.js';

export default class BuyController {
  private data: LottoData;

  constructor(data: LottoData) {
    this.data = data;
  }

  setTicketByMoney = (money: number) => {
    this.data.money = money;
    const ticketSize = Math.floor(money / 1000);
    for (let _ = 0; _ < ticketSize; _ += 1) {
      this.data.tickets.push([]);
    }
    this.data.updateView();
  };
}
