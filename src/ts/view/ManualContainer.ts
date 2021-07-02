import ManualController from '../controller/ManualController.js';
import LottoData, { Lotto } from '../model/LottoData.js';

export default class ManualContainer {
  private $container: HTMLFormElement;
  // eslint-disable-next-line no-undef
  private $manualNumberInputs: NodeListOf<HTMLInputElement>;
  private $buyManualButton: HTMLButtonElement;
  private $buyLeftButton: HTMLButtonElement;

  private controller: ManualController;

  constructor(data: LottoData) {
    this.$container = document.querySelector<HTMLFormElement>('#manual-container')!;
    this.$manualNumberInputs = this.$container.querySelectorAll('input');
    this.$buyManualButton = document.querySelector<HTMLButtonElement>('.buy-manual-button')!;
    this.$buyLeftButton = document.querySelector<HTMLButtonElement>('.buy-left-button')!;

    this.controller = new ManualController(data);
  }

  onBuyManualButtonClicked = () => {
    const ticket: Lotto = [];
    this.$manualNumberInputs.forEach(($input) => {
      ticket.push(Number($input.value));
    });
    if (!this.controller.buyManualTicket(ticket)) {
      return;
    }
    this.$manualNumberInputs.forEach(($input) => {
      $input.value = '';
    });
  };

  onBuyLeftButtonClicked = () => {
    this.controller.buyLeftAutoTicket();
  }

  updateView = (data: LottoData) => {
    const ticketSize = Math.floor(data.money / 1000);
    this.$container.style.display = 'block';
    this.$buyLeftButton.innerText = `남은 돈으로 자동 ${ticketSize}매 구매하기`;
  }

  disableView = () => {
    this.$manualNumberInputs.forEach(($input: HTMLInputElement) => {
      $input.disabled = true;
    });
    this.$buyManualButton.disabled = true;
    this.$buyLeftButton.disabled = true;
    this.$buyLeftButton.innerText = '구입 금액으로 로또를 모두 구매했습니다';
  }

  resetView = () => {
    this.$manualNumberInputs.forEach(($input: HTMLInputElement) => {
      $input.disabled = false;
    });
    this.$buyManualButton.disabled = false;
    this.$buyLeftButton.disabled = false;
    this.$container.style.display = 'none';
  }

  setEventListener = () => {
    this.$buyManualButton.addEventListener('click', this.onBuyManualButtonClicked);
    this.$buyLeftButton.addEventListener('click', this.onBuyLeftButtonClicked);
  }
}
