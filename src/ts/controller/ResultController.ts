import LottoData from '../model/LottoData.js';

export default class ResultController {
  private data: LottoData;

  constructor(data: LottoData) {
    this.data = data;
  }

  calcutateResult = () => {
    this.data.updateModal();
  }

  resetLotto = () => {
    this.data.reset();
  }
}
