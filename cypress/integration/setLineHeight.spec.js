
describe('Setting line-height', () => {

  before(() => {
    cy.visit('http://localhost:3000');
  });

  afterEach(() => {
    cy.get('[data-testid=LineHeightBox]').clear();
  });

  // describe('Entering zero', () => {
  //   it('Shows an error message: "Please enter a number larger than 0"', () => {
  //     const lineHeightValue = 0;
  //     cy.get('[data-testid=LineHeightBox]').type(lineHeightValue);
  //     cy.contains("Please enter a number larger than 0");
  //   });
  // });

  describe('with Open Sans Regular at 16px', () => {
    const fontFileName = 'OpenSans-Regular.ttf';
    const fontSizeValue = '16';
    before(() => {
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
    describe('When the user enters 1.2', () => {
      const lineHeightValue = '1.2';
      const expectedXHeightScale = '1';
      const expectedLineHeightScale = '2.2423';

      beforeEach(() => {
        cy.get('[data-testid=LineHeightBox]').type(lineHeightValue);
      })

      it('Displays the corresponding x-height to line-height ratio', () => {
        cy.get('[data-testid=ScaleBoxX]').should('have.value', expectedXHeightScale);
        cy.get('[data-testid=ScaleBoxLine]').should('have.value', expectedLineHeightScale);
      });

      it('Renders the sample paragraphs accordingly', () => {
        const expectedLineHeight = `${Number(fontSizeValue) * Number(lineHeightValue)}px`;
        cy.get('[data-testid=SampleParagraph]').should('have.css', 'line-height', expectedLineHeight);
      });
    });
    describe('When the user enters 1.5', () => {
      const lineHeightValue = '1.5';
      const expectedXHeightScale = '1';
      const expectedLineHeightScale = '2.8029';

      beforeEach(() => {
        cy.get('[data-testid=LineHeightBox]').type(lineHeightValue);
      })

      it('Displays the corresponding x-height to line-height ratio', () => {
        cy.get('[data-testid=ScaleBoxX]').should('have.value', expectedXHeightScale);
        cy.get('[data-testid=ScaleBoxLine]').should('have.value', expectedLineHeightScale);
      });
      it('Renders the sample paragraphs accordingly', () => {
        const expectedLineHeight = `${Number(fontSizeValue) * Number(lineHeightValue)}px`;
        cy.get('[data-testid=SampleParagraph]').should('have.css', 'line-height', expectedLineHeight);
      });
    });
  });
});
