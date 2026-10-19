import DashboardPage from '../pages/dashboard.page';
import AlarmsPage from '../pages/alarms.page';

describe('Alarms acknowledgement & resolution', () => {
    beforeEach(() => {
        cy.login();
        AlarmsPage.visit();

        // handle the default 'whats new' modal
        DashboardPage.handleWhatsNewModal();
        AlarmsPage.verifyPageLoad();
    });

    it('should acknowledge and then resolve an active alarm', () => {
        cy.intercept('PATCH', '/api/events/*').as('updateAlarm');
        const { ackButton, resolveButton } = AlarmsPage.selectors;

        AlarmsPage.getFirstActiveAlarmId().then((id) => {
            const row = AlarmsPage.alarmRowById(String(id));

            // acknowledge the alarm & verify the api call and row status
            AlarmsPage.acknowledgeAlarm(String(id));
            cy.wait('@updateAlarm').then(({ request, response }) => {
                expect(request.body).to.deep.equal({ status: 'Acknowledged' });
                expect(response?.statusCode).to.eq(200);
            });
            cy.get(row).should('contain', 'Acknowledged');
            cy.get(`${row} ${ackButton}`).should('be.disabled');
            cy.get(`${row} ${resolveButton}`).should('be.enabled');

            // resolve the acknowledged alarm & verify the api call and row status
            AlarmsPage.resolveAlarm(String(id));
            cy.wait('@updateAlarm').then(({ request, response }) => {
                expect(request.body).to.deep.equal({ status: 'Resolved' });
                expect(response?.statusCode).to.eq(200);
            });
            cy.get(row).should('contain', 'Resolved');
            cy.get(`${row} ${resolveButton}`).should('be.disabled');
        });
    });
});
