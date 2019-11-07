describe('The modular scale', () => {

  before(() => {
    cy.visit('http://localhost:3000');
  });

  afterEach(() => {
  });

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
    beforeEach(() => {
      cy.get('[data-testid=ScaleBoxX]').clear();
      cy.get('[data-testid=ScaleBoxLine]').clear();
    });
    describe('Setting the x-height scale to be 0', () => {
      it('Shows an error message: "Please enter a number larger than 0"', () => {
        const xHeightScale = 0;
        cy.get('[data-testid=ScaleBoxX]').type(xHeightScale);
        cy.contains("Please enter a number larger than 0");
      });
    });
    describe('Choosing the x-height to line-height ratio to be 1:3', () => {
      const xHeightScale = 1;
      const lineHeightScale = 3;
      const expectedLineHeightValue = '1.6055';
      beforeEach(() => {
        cy.get('[data-testid=ScaleBoxX]').type(xHeightScale);
        cy.get('[data-testid=ScaleBoxLine]').type(lineHeightScale);
      });
      it('Sets the line-height property value to be 1.6055', () => {
        cy.get('[data-testid=LineHeightBox]').should('have.value', expectedLineHeightValue);
      });
      it('Renders the sample paragraphs accordingly', () => {
        const expectedLineHeight = `${Number(fontSizeValue) * Number(expectedLineHeightValue)}px`;
        cy.get('[data-testid=SampleParagraph]').should('have.css', 'line-height', expectedLineHeight);
      });
    })
    describe('Choosing the x-height to line-height ratio to be 2:5', () => {
      const xHeightScale = 2;
      const lineHeightScale = 5;
      const expectedLineHeightValue = '1.3379';
      beforeEach(() => {
        cy.get('[data-testid=ScaleBoxX]').type(xHeightScale);
        cy.get('[data-testid=ScaleBoxLine]').type(lineHeightScale);
      });
      it('Sets the line-height property value to be 1.3379', () => {
        cy.get('[data-testid=LineHeightBox]').should('have.value', expectedLineHeightValue);
      });
      it('Renders the sample paragraphs accordingly', () => {
        const expectedLineHeight = `${Number(fontSizeValue) * Number(expectedLineHeightValue)}px`;
        cy.get('[data-testid=SampleParagraph]').should('have.css', 'line-height', expectedLineHeight);
      });
    });

  });

});
