/* eslint-disable no-undef */
describe('Buy container', () => {
  function inputMoneyString(money: string): Cypress.Chainable<JQuery<any>> {
    return (
      cy.get(Cypress.env('BUY_INPUT')).type(money)
        .get(Cypress.env('BUY_BUTTON')).click()
    );
  }

  it('change visibility of ticket and result container', () => {
    cy.visit('/');
    inputMoneyString('3000')
      .get(Cypress.env('TICKET_CONTAINER'))
      .should('be.visible')
      .get(Cypress.env('RESULT_CONTAINER'))
      .should('be.visible');
  });

  it('alert and fixable when user input money is less than 1000', () => {
    let alertMessage: String;
    cy.on('window:alert', (str) => {
      alertMessage = str;
    });

    cy.reload().then(() => {
      alertMessage = undefined;
    });
    inputMoneyString('5').then(() => {
      expect(alertMessage).to.equal('🚨 1000원 이상을 입력해야 합니다 🚨');
      alertMessage = undefined;
    }).get(Cypress.env('BUY_INPUT')).should('not.be.disabled');

    inputMoneyString('999').then(() => {
      expect(alertMessage).to.equal('🚨 1000원 이상을 입력해야 합니다 🚨');
    }).get(Cypress.env('BUY_INPUT')).should('not.be.disabled');
  });

  it('calculate ticket size and render tickets', () => {
    function checkTickets(money: number): Cypress.Chainable<JQuery<any>> {
      const ticketSize = Math.floor(money / 1000);
      return (
        inputMoneyString(money.toString())
          .get(Cypress.env('BUY_INPUT'))
          .should('be.disabled')
          .get(Cypress.env('BUY_BUTTON'))
          .should('be.disabled')
          .get(Cypress.env('TICKET_SIZE_LABEL'))
          .should('have.text', `총 ${ticketSize}개를 구매하였습니다.`)
          .get(Cypress.env('TICKET_RENDER_CONTAINER'))
          .find('span')
          .should('have.length', ticketSize)
      );
    }

    cy.reload();
    checkTickets(5000);

    cy.reload();
    checkTickets(50000);

    cy.reload();
    checkTickets(27000);
  });

  it('alert when user input money value with remainder', () => {
    let alertMessage: String;
    cy.on('window:alert', (str) => {
      alertMessage = str;
    });

    cy.reload().then(() => {
      alertMessage = undefined;
    });
    inputMoneyString('5500').then(() => {
      expect(alertMessage).to.equal('잔돈으로 500원이 남았습니다');
    });

    cy.reload().then(() => {
      alertMessage = undefined;
    });
    inputMoneyString('1234').then(() => {
      expect(alertMessage).to.equal('잔돈으로 234원이 남았습니다');
    });
  });

  it('show numbers when number toggle enable', () => {
    cy.reload();
    inputMoneyString('4672')
      .get(Cypress.env('TICKET_NUMBER_TOGGLE')).click()
      .get(Cypress.env('TICKET_RENDER_CONTAINER'))
      .find('span')
      .each(($el) => {
        const numArr = $el.text().split(', ').map((val) => Number(val));
        expect(numArr).to.be.an('array')
          .and.to.be.lengthOf(6)
          .and.to.satisfy((nums) => (
            nums.every((num) => (num >= 1 && num <= 45))
          ));
      });
  });
});
