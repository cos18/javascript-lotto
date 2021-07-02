import ResultController from '../controller/ResultController.js';
import LottoData, { WinningInfo } from '../model/LottoData.js';
import ResultModal from './ResultModal.js';

export default class ResultContainer {
  private $container: HTMLFormElement;
  private $showResultButton: HTMLButtonElement;
  // eslint-disable-next-line no-undef
  private $winningNumberInputs: NodeListOf<HTMLInputElement>;

  private modal: ResultModal;
  private controller: ResultController;

  constructor(data: LottoData) {
    this.$container = document.querySelector<HTMLFormElement>('#result-container')!;
    this.$showResultButton = document.querySelector('.open-result-modal-button')!;
    this.$winningNumberInputs = this.$container.querySelectorAll('div > div > div > input')!;

    this.controller = new ResultController(data);
    this.modal = new ResultModal(this.controller);
  }

  onShowResultButtonClicked = () => {
    const winningNumbers: number[] = [];
    this.$winningNumberInputs.forEach(($input: HTMLInputElement) => {
      winningNumbers.push(Number($input.value));
    });
    if (!this.controller.calcutateResult(winningNumbers)) {
      alert('🚨 당첨번호 + 보너스번호의 형식이 잘못되었습니다 🚨');
      return;
    }
    this.$winningNumberInputs.forEach(($input: HTMLInputElement) => {
      $input.value = '';
    });
  };

  setEventListener = () => {
    this.$showResultButton.addEventListener('click', this.onShowResultButtonClicked);
    this.modal.setEventListener();
  }

  updateView() {
    this.$container.style.visibility = 'visible';
  }

  updateModal(data: LottoData, winningTickets: WinningInfo) {
    this.modal.updateModal(data, winningTickets);
  }

  resetView() {
    this.$container.style.visibility = 'hidden';
  }
}
