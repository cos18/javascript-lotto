import BuyController from '../controller/BuyController.js';
import LottoData from '../model/LottoData.js';

export default class BuyContainer {
  private $buyInput: HTMLInputElement;
  private $buyButton: HTMLButtonElement;
  private controller: BuyController;

  constructor(data: LottoData) {
    this.$buyInput = document.querySelector<HTMLInputElement>('#buy-container > div > input')!;
    this.$buyButton = document.querySelector<HTMLButtonElement>('#buy-container > div > button')!;
    this.controller = new BuyController(data);
  }

  onBuyButtonClicked = () => {
    this.controller.setTicketByMoney(Number(this.$buyInput.value));
  };

  setEventListener = () => {
    this.$buyButton.addEventListener('click', this.onBuyButtonClicked);
  };
}
