describe('The modular scale', () => {

  before(() => {
    cy.visit('http://localhost:3000');
  });

  afterEach(() => {
  });

  describe('with Open Sans Regular at 16px', () => {
    before(() => {
      const fontFileName = 'OpenSans-Regular.ttf';
      const fontSizeValue = '16';

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
      cy.get('[data-testid=FontSizeBox]').type(fontSizeValue);
    });
    beforeEach(() => {
      cy.get('[data-testid=ScaleBoxX]').clear();
      cy.get('[data-testid=ScaleBoxLine]').clear();
    });
    describe('Choosing the x-height to line-height ratio to be 1:3', () => {
      beforeEach(() => {
        const xHeightScale = 1;
        const lineHeightScale = 3;
        cy.get('[data-testid=ScaleBoxX]').type(xHeightScale);
        cy.get('[data-testid=ScaleBoxLine]').type(lineHeightScale);
      });
      it('Sets the line-height property value to be 1.6055', () => {
        const expectedLineHeightValue = '1.6055';
        cy.get('[data-testid=LineHeightBox]').should('have.value', expectedLineHeightValue);
      });
    })
    describe('Choosing the x-height to line-height ratio to be 2:5', () => {
      beforeEach(() => {
        const xHeightScale = 2;
        const lineHeightScale = 5;
        cy.get('[data-testid=ScaleBoxX]').type(xHeightScale);
        cy.get('[data-testid=ScaleBoxLine]').type(lineHeightScale);
      });
      it('Sets the line-height property value to be 1.3379', () => {
        const expectedLineHeightValue = '1.3379';
        cy.get('[data-testid=LineHeightBox]').should('have.value', expectedLineHeightValue);
      });
    });

  });

});
