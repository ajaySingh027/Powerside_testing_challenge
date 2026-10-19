/**
 * This class represents the respective Device details page
 */
class DeviceDetailsPage {
    get selectors() {
        return {
            deviceStatus: '.MuiStack-root span',
            deviceHeading: 'h1.MuiTypography-root',
            settingsHeading: 'h2',
            settingsHeadingText: 'Device settings',
            deviceName: '#device-name',
            deviceLocation: '#device-location',
            minVoltage: '#device-min-voltage',
            minPowerFactor: '#device-min-power-factor',
            saveButtonText: 'Save',
            resetButtonText: 'Reset changes',
            unsavedChangesText: 'Unsaved changes',
        };
    }

    /**
     * @param id - id of the device to open
     */
    visit(id: number) {
        cy.visit(`/devices/${id}`);
    }

    verifyPageLoad() {
        cy.url().should('include', '/devices/');
    }

    scrollToSettings() {
        cy.contains(this.selectors.settingsHeading, this.selectors.settingsHeadingText).scrollIntoView();
    }

    /**
     * @param field - selector of the settings input field
     * @returns - helper / error text element shown below the field
     */
    getHelperText(field: string) {
        return cy.get(`${field}-helper-text`);
    }

    getSaveButton() {
        return cy.contains('button', this.selectors.saveButtonText);
    }

    clickResetChanges() {
        cy.contains('button', this.selectors.resetButtonText).click();
    }
}

export default new DeviceDetailsPage();