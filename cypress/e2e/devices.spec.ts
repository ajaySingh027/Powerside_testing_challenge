import DashboardPage from '../pages/dashboard.page';
import DevicesPage from '../pages/devices.page';

describe('Devices list search', () => {
    const { deviceRow } = DevicesPage.selectors;

    beforeEach(() => {
        cy.login();
        DevicesPage.visit();

        // handle the default 'whats new' modal
        DashboardPage.handleWhatsNewModal();
        cy.get(deviceRow).should('have.length.greaterThan', 0);
    });

    it('should filter devices by name, case-insensitive', () => {
        cy.intercept({ method: 'GET', pathname: '/api/devices', query: { search: 'inv-' } }).as('searchDevices');
        DevicesPage.search('inv-');

        // wait for the search api, then verify the table shows the same number of rows
        cy.wait('@searchDevices').its('response.body.devices').then((devices) => {
            expect(devices).to.have.length.greaterThan(0);
            cy.get(deviceRow).should('have.length', devices.length);
        });

        // lower-case search term matches upper-case device names
        cy.get(deviceRow).each(($row) => {
            cy.wrap($row).should('contain', 'INV-');
        });
    });

    it('should filter devices by location', () => {
        cy.intercept({ method: 'GET', pathname: '/api/devices', query: { search: 'Substation 1' } }).as('searchDevices');
        DevicesPage.search('Substation 1');

        // wait for the search api, then verify the table shows the same number of rows
        cy.wait('@searchDevices').its('response.body.devices').then((devices) => {
            expect(devices).to.have.length.greaterThan(0);
            cy.get(deviceRow).should('have.length', devices.length);
        });

        cy.get(deviceRow).each(($row) => {
            cy.wrap($row).should('contain', 'Substation 1');
        });
    });

    it('should show empty state when no device matches the search', () => {
        DevicesPage.search('XYZ-999');
        cy.get(deviceRow).should('not.exist');
        cy.contains('No devices match your filters').should('be.visible');

        // clearing the search shows the devices list again
        DevicesPage.clearSearch();
        cy.get(deviceRow).should('have.length.greaterThan', 0);
    });
});
