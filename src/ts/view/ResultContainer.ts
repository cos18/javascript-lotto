import LottoData from '../model/LottoData.js';

export default class ResultContainer {
  private $container: HTMLFormElement;

  constructor() {
    this.$container = document.querySelector<HTMLFormElement>('#result-container')!;
  }

  updateView(data: LottoData) {
    this.$container.style.visibility = 'visible';
    console.log(data);
  }
}
