import { getGreeting } from '../support/app.po';

describe('front-e2e', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    // Function helper example, see `../support/app.po.ts` file
    getGreeting().contains(/Hello World!/);
  });
});
