import LottoData from './model/LottoData.js';
import BuyContainer from './view/BuyContainer.js';
import ResultContainer from './view/ResultContainer.js';
import TicketContainer from './view/TicketContainer.js';

const $showResultButton = document.querySelector('.open-result-modal-button');
const $modalClose = document.querySelector('.modal-close');
const $modal = document.querySelector('.modal');
// const $lottoNumbersToggleButton = document.querySelector(
//   '.lotto-numbers-toggle-button'
// );

const onModalShow = () => {
  $modal!.classList.add('open');
};

const onModalClose = () => {
  $modal!.classList.remove('open');
};

$showResultButton!.addEventListener('click', onModalShow);
$modalClose!.addEventListener('click', onModalClose);

const data = new LottoData();

const buyView = new BuyContainer(data);
const ticketView = new TicketContainer(data);
const resultView = new ResultContainer();

data.buyView = buyView;
data.ticketView = ticketView;
data.resultView = resultView;
buyView.setEventListener();
ticketView.setEventListener();
