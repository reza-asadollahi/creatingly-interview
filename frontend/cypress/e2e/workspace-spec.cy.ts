import { environment } from "../../src/environments/environment";

describe('WorkspaceComponent E2E Test', () => {
  let projectId: string;

  before(() => {
    cy.request('POST', `${environment.BASE_URL_API}/users/sign-in`, {
      name: 'cyUser',
    }).then((response) => {
      const token = response.body.id;
      localStorage.setItem('token', token);

      cy.request({
        method: 'POST',
        url: `${environment.BASE_URL_API}/projects`,
        body: {
           name: 'Test Project',
           styles: { width: '500px' }
          },
        headers: {
          "userId": localStorage.getItem('token'),
        },
      }).then((response) => {
        projectId = response.body.id;

        cy.intercept('GET', `${environment.BASE_URL_API}/projects/${projectId}`).as('getProjectData');;
        cy.visit(`${Cypress.config().baseUrl}/page-builder/${projectId}`)
        cy.wait('@getProjectData')
    });
    });
  });


  it('should load project elements and handle drag and drop of a new element', () => {
    const dataTransfer = new DataTransfer();
    dataTransfer.setData('elementType', 'div');

    cy.get('.main-workspace-area')
      .trigger('dragstart', {
        dataTransfer,
      })
      .trigger('drop', {
        dataTransfer,
      });

    cy.get('app-dynamic-element widget-div').should('exist');
  });


  it('should handle editing an element on double-click', () => {
    cy.get('app-dynamic-element').first().dblclick();
    cy.get('app-config-form').should('exist');
  });
});
