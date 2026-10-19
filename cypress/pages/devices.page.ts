/**
 * This class represents the all Devices list page
 */
class DevicesPage {
    get selectors() {
        return {
            searchInput: '#device-search',
            deviceRow: '[data-cy="device-row"]',
        };
    }

    visit() {
        cy.visit('/devices');
    }

    /**
     * @param term - device name or location to search for
     */
    search(term: string) {
        cy.get(this.selectors.searchInput).clear().type(term);
    }

    clearSearch() {
        cy.get(this.selectors.searchInput).clear();
    }
}

export default new DevicesPage();
