/**
 * This class represents the Dashboard page of application
 */
class DashboardPage {
    get selectors() {
        return {
            whatsNewModal: '[data-cy="whats-new-dialog"]',
            alarmPanelItem: '.MuiListItem-root',
            alarmItemStatus: '.MuiListItem-root .MuiChip-label',
            viewAllLink: 'a',
            viewAllLinkText: 'View all',
            kpiCardLabel: 'h3',
        };
    }

    /**
     * @param label - label of the KPI card, e.g. 'Total devices'
     * @returns - value element of the KPI card
     */
    getKpiValue(label: string) {
        return cy.contains(this.selectors.kpiCardLabel, label).siblings('div').find('p');
    }

    handleWhatsNewModal() {
        cy.get('body').then(($body) => {
            const $modal = $body.find(this.selectors.whatsNewModal);
            if ($modal.is(':visible')) {
                cy.wrap($modal).find('button').click();
            }
        });
    }

    /**
     * @param index - index of the alarm item in the side panel, default is 0
     * @returns - text of the alarm item status at the given index
     */
    getPanelItemStatus(index: number = 0) {
        return cy.get(this.selectors.alarmItemStatus).eq(index).invoke('text');
    }

    /**
     * @param index - index of the alarm item in the side panel to click, default is 0
     */
    clickAlarmPanelItem(index: number = 0) {
        cy.get(this.selectors.alarmPanelItem).eq(index).find('a').click();
    }

    /**
     * clicks the 'View all' link in the side panel to open the Alarms page
     */
    clickViewAllLink() {
        cy.contains(this.selectors.viewAllLink, this.selectors.viewAllLinkText).click();
    }
}

export default new DashboardPage();