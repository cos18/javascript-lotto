import TicketController from '../controller/TicketController.js';
import LottoData, { Lotto } from '../model/LottoData.js';

export default class TicketContainer {
  private $container: HTMLElement;
  private $ticketSizeLabel: HTMLLabelElement;
  private $ticketNumberSwitchLabel: HTMLLabelElement;
  private $ticketNumberSwitchInput: HTMLInputElement;
  private $ticketRenderContainer: HTMLDivElement;
  private $ticketElement: HTMLSpanElement;

  private controller: TicketController;

  constructor(data: LottoData) {
    this.$container = document.querySelector<HTMLElement>('#ticket-container')!;
    this.$ticketSizeLabel = document.querySelector<HTMLLabelElement>('#ticket-container > div > label')!;
    this.$ticketNumberSwitchLabel = document.querySelector<HTMLLabelElement>('.switch')!;
    this.$ticketNumberSwitchInput = document.querySelector<HTMLInputElement>('.switch > input')!;
    this.$ticketRenderContainer = document.querySelector<HTMLDivElement>('#ticket-container > div.flex-wrap')!;

    this.$ticketElement = document.createElement('span');
    this.$ticketElement.classList.add('mx-1', 'text-4xl');

    this.controller = new TicketController(data);
  }

  onTicketNumberSwitchClicked = () => {
    this.controller.setLottoNumberView(this.$ticketNumberSwitchInput.checked);
  }

  setEventListener = () => {
    this.$ticketNumberSwitchLabel.addEventListener('click', this.onTicketNumberSwitchClicked);
  }

  updateView(data: LottoData) {
    this.$container.style.visibility = 'visible';
    this.$ticketSizeLabel.innerHTML = `총 ${data.tickets.length}개를 구매하였습니다.`;

    this.$ticketRenderContainer.classList.add('flex-col');
    if (!data.isNumberOpened) {
      this.$ticketRenderContainer.classList.remove('flex-col');
    }
    this.$ticketRenderContainer.innerHTML = '';
    data.tickets.forEach((ticket: Lotto) => {
      const currTicket = this.$ticketElement.cloneNode() as HTMLSpanElement;
      currTicket.innerHTML = `🎟️ ${data.isNumberOpened ? ticket.join(', ') : ''}`;
      this.$ticketRenderContainer.appendChild(currTicket);
    });
  }

  resetView() {
    this.$container.style.visibility = 'hidden';
    this.$ticketRenderContainer.innerHTML = '';
  }
}
