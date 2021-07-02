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
      $input.innerText = '';
    });
  };

  updateView = () => {
    this.$container.style.display = 'block';
  }

  setEventListener = () => {
    this.$buyManualButton.addEventListener('click', this.onBuyManualButtonClicked);
  }
}
