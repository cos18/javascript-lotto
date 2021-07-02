import LottoData from '../model/LottoData.js';

export default class BuyController {
  private data: LottoData;

  constructor(data: LottoData) {
    this.data = data;
  }

  setTicketByMoney = (money: number): boolean => {
    if (Number.isNaN(money) || money < 1000) {
      alert('🚨 1000원 이상을 입력해야 합니다 🚨');
      return false;
    }

    this.data.setMoney(money);
    return true;
  };
}
