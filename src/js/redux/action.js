import { generateRandomNumber } from '../utils/common.js';
import { LOTTO, PURCHASE_TYPE } from '../utils/constants.js';
import {
  AUTO_PURCHASE,
  CALCULATE_PROFIT,
  CREATE_LOTTOS,
  DECIDE_WINNER,
  MANUAL_PURCHASE,
  RESTART,
  UPDATE_PAYMENT,
} from './actionType.js';

export const updatePayment = payment => {
  'use strict';
  payment -= payment % LOTTO.PRICE;
  return {
    type: UPDATE_PAYMENT,
    payload: { payment },
  };
};

export const changePurchaseType = purchaseType => {
  'use strict';
  if (purchaseType !== MANUAL_PURCHASE && purchaseType !== AUTO_PURCHASE) {
    purchaseType = AUTO_PURCHASE;
  }
  return {
    type: purchaseType,
  };
};

export const createLottos = props => {
  'use strict';
  const { payment, lottoNumbers, purchaseType } = props;
  if (purchaseType === PURCHASE_TYPE.MANUAL) {
    return {
      type: CREATE_LOTTOS,
      payload: { lottos: [lottoNumbers] },
    };
  }

  const generateLottoNumbers = () => {
    const lottoNumbers = new Set();
    while (lottoNumbers.size < LOTTO.LENGTH) {
      lottoNumbers.add(generateRandomNumber(LOTTO.MIN_NUM, LOTTO.MAX_NUM));
    }
    return [...lottoNumbers];
  };
  const lottoCount = Math.floor(payment / LOTTO.PRICE);
  const lottos = Array.from({ length: lottoCount }, () =>
    generateLottoNumbers(),
  );

  return {
    type: CREATE_LOTTOS,
    payload: { lottos },
  };
};

export const decideWinner = (winningNumbers, bonusNumber) => {
  'use strict';
  return {
    type: DECIDE_WINNER,
    payload: {
      winningNumbers,
      bonusNumber,
    },
  };
};

export const calculateProfit = () => {
  'use strict';
  return {
    type: CALCULATE_PROFIT,
  };
};

export const restart = () => {
  'use strict';
  return {
    type: RESTART,
  };
};