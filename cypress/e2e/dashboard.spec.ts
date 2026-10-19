import DashboardPage from '../pages/dashboard.page';
import DeviceDetailsPage from '../pages/deviceDetails.page';
import AlarmsPage from '../pages/alarms.page';

describe('Dashboard', () => {
    beforeEach(() => {
        cy.login();
        // stub summary api, so the KPI values don't change between polls
        cy.intercept('GET', '/api/dashboard/summary', { fixture: 'dashboardSummary.json' }).as('summary');
        cy.visit('/');

        // handle the default 'whats new' modal
        DashboardPage.handleWhatsNewModal();
    });

    it('should display the side panel with 5 alarm items', () => {
        // verify 5 alarm items are displayed in the side panel
        cy.get(DashboardPage.selectors.alarmPanelItem).should('have.length', 5);
    });

    // This test fails due to an application defect - see Bug 2 in docs/bug_report.md.
    it('should display the device detail page on clicking in side alarm panel', () => {
        let alarmItemStatus: string;

        // get status of first item in the side panel and click on it
        DashboardPage.getPanelItemStatus().then((status) => {
            alarmItemStatus = status.trim();
        });
        DashboardPage.clickAlarmPanelItem();
        // verify the device detail page is displayed & alarm status is same as dashboard side panel
        DeviceDetailsPage.verifyPageLoad();
        cy.get(DeviceDetailsPage.selectors.deviceStatus).then(($status) => {
            expect($status.text()).to.eq(alarmItemStatus);
        });
    });

    it('should display all alarms list page on clicking "View All" link in side panel', () => {
        // click on 'View All' and verify the all alarm list page is displayed
        DashboardPage.clickViewAllLink();
        AlarmsPage.verifyPageLoad();
    });

    it('should display KPI card values from summary api', () => {
        cy.wait('@summary');
        cy.fixture('dashboardSummary.json').then((summary) => {
            DashboardPage.getKpiValue('Total devices').should('have.text', String(summary.totalDevices));
            DashboardPage.getKpiValue('Active alarms').should('have.text', String(summary.activeAlarms));
            DashboardPage.getKpiValue('Devices out of spec').should('have.text', String(summary.devicesOutOfSpec));
            DashboardPage.getKpiValue('Offline devices').should('have.text', String(summary.offlineDevices));

            // active alarms card shows the critical & warning split
            cy.contains(`${summary.activeBySeverity.Critical} critical, ${summary.activeBySeverity.Warning} warning`)
                .should('be.visible');
        });
    });
});
