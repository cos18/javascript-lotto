import LottoData from './model/LottoData.js';
import BuyContainer from './view/BuyContainer.js';
import ResultContainer from './view/ResultContainer.js';
import TicketContainer from './view/TicketContainer.js';

const data = new LottoData();

const buyView = new BuyContainer(data);
const ticketView = new TicketContainer(data);
const resultView = new ResultContainer(data);

data.buyView = buyView;
data.ticketView = ticketView;
data.resultView = resultView;
buyView.setEventListener();
ticketView.setEventListener();
resultView.setEventListener();
