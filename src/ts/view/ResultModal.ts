import ResultController from '../controller/ResultController.js';
import LottoData from '../model/LottoData.js';

export default class ResultModal {
  private $modal: HTMLDivElement;
  private $modalClose: HTMLDivElement;
  private $resetButton: HTMLButtonElement;

  private controller: ResultController;

  constructor(controller: ResultController) {
    this.$modal = document.querySelector('.modal')!;
    this.$modalClose = document.querySelector('.modal-close')!;
    this.$resetButton = this.$modal.querySelector('div > div > button')!;

    this.controller = controller;
  }

  onModalCloseClicked = () => {
    this.$modal.classList.remove('open');
  }

  onResetButtonClicked = () => {
    this.controller.resetLotto();
    this.onModalCloseClicked();
  }

  setEventListener = () => {
    this.$modalClose.addEventListener('click', this.onModalCloseClicked);
    this.$resetButton.addEventListener('click', this.onResetButtonClicked);
  }

  updateModal = (data: LottoData) => {
    this.$modal.classList.add('open');
  }
}
