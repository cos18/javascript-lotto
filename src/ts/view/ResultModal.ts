import ResultController from '../controller/ResultController.js';
import LottoData, { WinningInfo } from '../model/LottoData.js';

export default class ResultModal {
  private $modal: HTMLDivElement;
  private $modalClose: HTMLDivElement;
  private $resetButton: HTMLButtonElement;
  // eslint-disable-next-line no-undef
  private $resultTD: NodeListOf<HTMLTableDataCellElement>;
  private $profitRateP: HTMLParagraphElement;

  private controller: ResultController;

  constructor(controller: ResultController) {
    this.$modal = document.querySelector('.modal')!;
    this.$modalClose = document.querySelector('.modal-close')!;
    this.$resetButton = this.$modal.querySelector('div > div > button')!;
    this.$resultTD = this.$modal.querySelectorAll('td')!;
    this.$profitRateP = this.$modal.querySelector('p')!;

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

  updateModal = (data: LottoData, winningTickets: WinningInfo) => {
    this.$resultTD[2].innerHTML = `${winningTickets.fifth}개`;
    this.$resultTD[5].innerHTML = `${winningTickets.forth}개`;
    this.$resultTD[8].innerHTML = `${winningTickets.third}개`;
    this.$resultTD[11].innerHTML = `${winningTickets.second}개`;
    this.$resultTD[14].innerHTML = `${winningTickets.first}개`;
    this.$profitRateP.innerHTML = `당신의 총 수익률은 ${winningTickets.winningPrize / (data.tickets.length * 10)}%입니다.`;
    this.$modal.classList.add('open');
  }
}
