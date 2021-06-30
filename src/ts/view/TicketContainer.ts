import LottoData from '../model/LottoData.js';

export default class TicketContainer {
  private $container: HTMLElement;
  private $ticketSizeLabel: HTMLLabelElement;
  private $ticketRenderContainer: HTMLDivElement;
  private $ticketElement: HTMLSpanElement;

  constructor() {
    this.$container = document.querySelector<HTMLElement>('#ticket-container')!;
    this.$ticketSizeLabel = document.querySelector<HTMLLabelElement>('#ticket-container > div > label')!;
    this.$ticketRenderContainer = document.querySelector<HTMLDivElement>('#ticket-container > div.flex-wrap')!;

    this.$ticketElement = document.createElement('span');
    this.$ticketElement.classList.add('mx-1', 'text-4xl');
  }

  updateView(data: LottoData) {
    this.$container.style.visibility = 'visible';
    this.$ticketSizeLabel.innerHTML = `총 ${data.tickets.length}개를 구매하였습니다.`;
    this.$ticketRenderContainer.innerHTML = '';
    data.tickets.forEach(() => {
      const currTicket = this.$ticketElement.cloneNode() as HTMLSpanElement;
      currTicket.innerHTML = '🎟️ ';
      this.$ticketRenderContainer.appendChild(currTicket);
    });
  }
}
