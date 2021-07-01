import LottoData from '../model/LottoData.js';

export default class TicketController {
  private data: LottoData;

  constructor(data: LottoData) {
    this.data = data;
  }

  setLottoNumberView = (isNumberOpened: boolean) => {
    this.data.isNumberOpened = isNumberOpened;
    this.data.updateView();
  };
}
