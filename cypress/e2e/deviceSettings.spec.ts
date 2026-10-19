import DashboardPage from '../pages/dashboard.page';
import DeviceDetailsPage from '../pages/deviceDetails.page';

// tests only validate the form and never save, so the shared device data is not changed
describe('Device settings validation', () => {
    const sel = DeviceDetailsPage.selectors;

    beforeEach(() => {
        cy.login();
        // visitingCAP-18 Capacitor Bank device page
        DeviceDetailsPage.visit(18);

        // handle the default 'whats new' modal
        DashboardPage.handleWhatsNewModal();
        DeviceDetailsPage.scrollToSettings();
    });

    it('should show errors for empty / short device name and empty location', () => {
        DeviceDetailsPage.getSaveButton().should('be.disabled');

        cy.get(sel.deviceName).clear();
        DeviceDetailsPage.getHelperText(sel.deviceName).should('have.text', 'Device name is required');
        cy.get(sel.deviceName).type('AB');
        DeviceDetailsPage.getHelperText(sel.deviceName).should('have.text', 'Device name must be at least 3 characters');

        cy.get(sel.deviceLocation).clear();
        DeviceDetailsPage.getHelperText(sel.deviceLocation).should('have.text', 'Location is required');
        DeviceDetailsPage.getSaveButton().should('be.disabled');
    });

    it('should show errors for out of range thresholds', () => {
        cy.get(sel.minVoltage).clear().type('600');
        DeviceDetailsPage.getHelperText(sel.minVoltage)
            .should('have.text', 'Minimum voltage must be less than maximum voltage');

        cy.get(sel.minPowerFactor).clear().type('1.5');
        DeviceDetailsPage.getHelperText(sel.minPowerFactor)
            .should('have.text', 'Minimum power factor must be between 0 and 1');
        DeviceDetailsPage.getSaveButton().should('be.disabled');
    });

    it('should restore original values on "Reset changes"', () => {
        cy.get(sel.minVoltage).invoke('val').then((originalValue) => {
            cy.get(sel.minVoltage).clear().type('440');
            cy.contains(sel.unsavedChangesText).should('be.visible');

            DeviceDetailsPage.clickResetChanges();
            cy.get(sel.minVoltage).should('have.value', originalValue);
            cy.contains(sel.unsavedChangesText).should('not.exist');
        });
    });
});
