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
    if (!this.controller.setTicketByMoney(Number(this.$buyInput.value))) {
      this.$buyInput.value = '';
      return;
    }
    this.$buyInput.disabled = true;
    this.$buyButton.disabled = true;
  };

  setEventListener = () => {
    this.$buyButton.addEventListener('click', this.onBuyButtonClicked);
  };
}
