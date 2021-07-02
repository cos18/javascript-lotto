import LottoData, { Lotto } from '../model/LottoData.js';

export default class ManualController {
  private data: LottoData;

  constructor(data: LottoData) {
    this.data = data;
  }

  buyManualTicket(ticket: Lotto): boolean {
    if (ticket.filter((num: number) => (Number.isNaN(num) || num < 1 || num > 45)).length) {
      alert('🚨 수동 구매 티켓 정보가 잘못되었습니다 🚨');
      return false;
    }
    const ticketSet = new Set(ticket);
    if (ticketSet.size !== 6) {
      alert('🚨 수동 구매 티켓 정보가 잘못되었습니다 🚨');
      return false;
    }
    this.data.addManualTicket(ticket);
    return true;
  }

  buyLeftAutoTicket() {
    this.data.addLeftTicket();
  }
}
