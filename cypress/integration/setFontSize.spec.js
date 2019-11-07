
describe('Setting font-size', () => {

  before(() => {
    cy.visit('http://localhost:3000');
  });

  afterEach(() => {
    cy.get('[data-testid=FontSizeBox]').clear();
  });

  describe('Entering zero', () => {
    it('Shows an error message: "Please enter a number larger than 0"', () => {
      const fontSizeValue = 0;
      cy.get('[data-testid=FontSizeBox]').type(fontSizeValue);
      cy.contains("Please enter a number larger than 0");
    });
  });

  describe('after uploading Open Sans Regular', () => {
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
    describe('Displays the corresponding x-height value', () => {
      it('if it is set to be 16px', () => {
        const fontSizeValue = '16';
        const expectedXHeightValue = '8.5625';
        cy.get('[data-testid=FontSizeBox]').type(fontSizeValue);
        cy.get('[data-testid=XheightBox]').should('have.value', expectedXHeightValue);
      });
      it('if it is set to be 23px', () => {
        const fontSizeValue = '23';
        const expectedXHeightValue = '12.3086';
        cy.get('[data-testid=FontSizeBox]').type(fontSizeValue);
        cy.get('[data-testid=XheightBox]').should('have.value', expectedXHeightValue);
      });
    });
    describe('Renders the sample paragraph accordingly', () => {
      it('if it is set to be 16px', () => {
        const fontSizeValue = '16';
        const expectedFontSize = '16px';
        cy.get('[data-testid=FontSizeBox]').type(fontSizeValue);
        cy.get('[data-testid=SampleParagraph]').should('have.css', 'font-size', expectedFontSize);
      });
      it('if it is set to be 23px', () => {
        const fontSizeValue = '23';
        const expectedFontSize = '23px';
        cy.get('[data-testid=FontSizeBox]').type(fontSizeValue);
        cy.get('[data-testid=SampleParagraph]').should('have.css', 'font-size', expectedFontSize);
      });
    });
  });

  describe('after uploading Roboto Slab Light', () => {
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
    describe('Displays the corresponding x-height value', () => {
      it('if it is set to be 18px', () => {
        const fontSizeValue = '18';
        const expectedXHeightValue = '9.5098';
        cy.get('[data-testid=FontSizeBox]').type(fontSizeValue);
        cy.get('[data-testid=XheightBox]').should('have.value', expectedXHeightValue);
      });
      it('if it is set to be 21px', () => {
        const fontSizeValue = '21';
        const expectedXHeightValue = '11.0947';
        cy.get('[data-testid=FontSizeBox]').type(fontSizeValue);
        cy.get('[data-testid=XheightBox]').should('have.value', expectedXHeightValue);
      });
    });
    describe('Renders the sample paragraph accordingly', () => {
      it('if it is set to be 18px', () => {
        const fontSizeValue = '18';
        const expectedFontSize = '18px';
        cy.get('[data-testid=FontSizeBox]').type(fontSizeValue);
        cy.get('[data-testid=SampleParagraph]').should('have.css', 'font-size', expectedFontSize);
      });
      it('if it is set to be 21px', () => {
        const fontSizeValue = '21';
        const expectedFontSize = '21px';
        cy.get('[data-testid=FontSizeBox]').type(fontSizeValue);
        cy.get('[data-testid=SampleParagraph]').should('have.css', 'font-size', expectedFontSize);
      });
    });
  });
});
