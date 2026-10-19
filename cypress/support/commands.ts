/// <reference types="cypress" />
export {}

declare global {
  namespace Cypress {
    interface Chainable {
      login(): Chainable<void>
    }
  }
}

// -- This is a parent command --
Cypress.Commands.add('login', () => {
    // credentials come from cypress.env.json
    cy.env(['username', 'password'], { log: false }).then(({ username, password }) => {
        cy.session([username], () => {
            // login via api request
            cy.request({
                method: 'POST',
                url: '/api/auth/login',
                body: { username, password },
                log: false,
            }).then((response) => {
                // storing token in local storage
                window.localStorage.setItem('token', response.body.token);
            });
        });
    });
})