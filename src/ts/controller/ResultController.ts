import LottoData from '../model/LottoData.js';

export default class ResultController {
  private data: LottoData;

  constructor(data: LottoData) {
    this.data = data;
  }

  calcutateResult = (winningNumbers: number[]): boolean => {
    for (let idx = 0; idx < 7; idx += 1) {
      if (Number.isNaN(winningNumbers[idx])
          || winningNumbers[idx] < 1
          || winningNumbers[idx] > 45) {
        return false;
      }
    }
    const winningSet = new Set(winningNumbers);
    if (winningSet.size !== winningNumbers.length) {
      return false;
    }
    this.data.updateModal(winningNumbers);
    return true;
  }

  resetLotto = () => {
    this.data.reset();
  }
}
