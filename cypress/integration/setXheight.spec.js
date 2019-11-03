
describe('Setting x-height', () => {

  before(() => {
    cy.visit('http://localhost:3000');
  });

  describe('Displays the corresponding font-size property value for the uploaded font', () => {

    it('If Open Sans Regular was uploaded', () => {
      const fontFileName = 'OpenSans-Regular.ttf';
      const expectedFontName = 'Open Sans Regular';
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

      cy.get('[data-testid=XheightBox]').type('16');

      cy.get('[data-testid=FontSizeBox]').should('have.value', '29.8978');  

    })
  })


});
