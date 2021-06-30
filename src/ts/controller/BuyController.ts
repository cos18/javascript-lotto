import LottoData from '../model/LottoData.js';

export default class BuyController {
  private data: LottoData;

  constructor(data: LottoData) {
    this.data = data;
  }

  setTicketByMoney = (money: number): boolean => {
    if (money < 1000) {
      alert('🚨 1000원 이상을 입력해야 합니다 🚨');
      return false;
    }

    const ticketSize = Math.floor(money / 1000);
    if (ticketSize * 1000 !== money) {
      alert(`잔돈으로 ${money - ticketSize * 1000}원이 남았습니다`);
    }

    for (let _ = 0; _ < ticketSize; _ += 1) {
      this.data.tickets.push([]);
    }
    this.data.updateView();
    return true;
  };
}
