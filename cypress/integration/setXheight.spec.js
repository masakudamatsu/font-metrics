
describe('Setting x-height', () => {

  before(() => {
    cy.visit('http://localhost:3000');
  });

  afterEach(() => {
    cy.get('[data-testid=XheightBox]').clear();
  });

  describe('for Open Sans Regular', () => {
    beforeEach(() => {
      const fontFileName = 'OpenSans-Regular.ttf';
      cy.fixture(fontFileName, 'binary')
        .then(Cypress.Blob.binaryStringToBlob)
        .then((fontFile) => {
          cy.get('[data-testid=FontFileUploader]').upload({
            fileContent: fontFile,
            fileName: fontFileName,
            mimeType: 'font/ttf',
            encoding: 'utf8'
          });
        });
    });
    describe('Displays the corresponding font-size property value', () => {
      it('if it is set to be 16px', () => {
        cy.get('[data-testid=XheightBox]').type('16');
        cy.get('[data-testid=FontSizeBox]').should('have.value', '29.8978');
      });
      it('if it is set to be 23px', () => {
        cy.get('[data-testid=XheightBox]').type('23');
        cy.get('[data-testid=FontSizeBox]').should('have.value', '42.9781');
      });
    });
  });

  describe('for Roboto Slab Light', () => {
    beforeEach(() => {
      const fontFileName = 'RobotoSlab-Light.ttf';
      cy.fixture(fontFileName, 'binary')
        .then(Cypress.Blob.binaryStringToBlob)
        .then((fontFile) => {
          cy.get('[data-testid=FontFileUploader]').upload({
            fileContent: fontFile,
            fileName: fontFileName,
            mimeType: 'font/ttf',
            encoding: 'utf8'
          });
        });
    });
    describe('Displays the corresponding font-size property value', () => {
      it('if it is set to be 18px', () => {
        cy.get('[data-testid=XheightBox]').type('18');
        cy.get('[data-testid=FontSizeBox]').should('have.value', '34.0702');
      });
      it('if it is set to be 21px', () => {
        cy.get('[data-testid=XheightBox]').type('21');
        cy.get('[data-testid=FontSizeBox]').should('have.value', '39.7486');
      });
    });
  });
});
