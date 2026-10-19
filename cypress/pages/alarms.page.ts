/**
 * This class represents the all Alarms list page
 */
class AlarmsPage {
    get selectors() {
        return {
            pageHeading: 'h1.MuiTypography-root',
            alarmRow: '[data-cy="alarm-row"]',
            ackButton: '[data-cy="ack-button"]',
            resolveButton: '[data-cy="resolve-button"]',
        };
    }

    visit() {
        cy.visit('/alarms');
    }

    /**
     * @param id - id of the alarm
     * @returns - selector of the alarm row with the given id
     */
    alarmRowById(id: string) {
        return `${this.selectors.alarmRow}[data-alarm-id="${id}"]`;
    }

    /**
     * @returns - id of the first alarm row which can be acknowledged
     */
    getFirstActiveAlarmId() {
        return cy.get(this.selectors.alarmRow)
            .filter(`:has(${this.selectors.ackButton}:not(:disabled))`)
            .first()
            .invoke('attr', 'data-alarm-id');
    }

    /**
     * @param id - id of the alarm to acknowledge
     */
    acknowledgeAlarm(id: string) {
        cy.get(`${this.alarmRowById(id)} ${this.selectors.ackButton}`).click();
    }

    /**
     * @param id - id of the alarm to resolve
     */
    resolveAlarm(id: string) {
        cy.get(`${this.alarmRowById(id)} ${this.selectors.resolveButton}`).click();
    }

    verifyPageLoad() {
        cy.url().should('include', '/alarms');
        cy.get(this.selectors.pageHeading).should('be.visible').and('have.text', 'Alarms');
    }
}

export default new AlarmsPage();