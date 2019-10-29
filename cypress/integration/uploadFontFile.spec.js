describe('Uploading a font file', () => {

  before(() => {
    cy.visit('http://localhost:3000');
  });

  describe('Displays the font name', () => {

    it('When it is Open Sans Regular', () => {
      const fontFileName = 'OpenSans-Regular.ttf';
      const expectedFontName = 'Open Sans Regular';

      cy.fixture(fontFileName, 'binary')
        .then(Cypress.Blob.binaryStringToBlob)
        .then((fontFile) => {
          cy.get('[data-test=FontFileUploader]').upload({
            fileContent: fontFile,
            fileName: fontFileName,
            mimeType: 'font/ttf',
            encoding: 'utf8'
          });
        });

      cy.contains(expectedFontName);
    });

    it('When it is Roboto Slab Light', () => {
      const fontFileName = 'RobotoSlab-Light.ttf';
      const expectedFontName = 'Roboto Slab Light';

      cy.fixture(fontFileName, 'binary')
        .then(Cypress.Blob.binaryStringToBlob)
        .then((fontFile) => {
          cy.get('[data-test=FontFileUploader]').upload({
            fileContent: fontFile,
            fileName: fontFileName,
            mimeType: 'font/ttf',
            encoding: 'utf8'
          });
        });

      cy.contains(expectedFontName);
    });

  });
});
