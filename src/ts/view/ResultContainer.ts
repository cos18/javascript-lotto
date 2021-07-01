import ResultController from '../controller/ResultController.js';
import LottoData from '../model/LottoData.js';
import ResultModal from './ResultModal.js';

export default class ResultContainer {
  private $container: HTMLFormElement;
  private $showResultButton: HTMLButtonElement;

  private modal: ResultModal;
  private controller: ResultController;

  constructor(data: LottoData) {
    this.$container = document.querySelector<HTMLFormElement>('#result-container')!;
    this.$showResultButton = document.querySelector('.open-result-modal-button')!;

    this.controller = new ResultController(data);
    this.modal = new ResultModal(this.controller);
  }

  onShowResultButtonClicked = () => {
    this.controller.calcutateResult();
  };

  setEventListener = () => {
    this.$showResultButton.addEventListener('click', this.onShowResultButtonClicked);
    this.modal.setEventListener();
  }

  updateView() {
    this.$container.style.visibility = 'visible';
  }

  updateModal(data: LottoData) {
    this.modal.updateModal(data);
  }
}
