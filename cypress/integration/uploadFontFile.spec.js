before(() => {
  cy.visit('http://localhost:3000');
});

describe('Uploading a file in the wrong format', () => {

  it('Asks the user to upload an OTF, TTF, or WOFF file', () => {

    const wrongFile = 'wrongfile.txt';
    const expectedMessage = 'Please upload an OpenType Font (.otf), TrueType Font (.ttf), or Web Open Font Format (.woff) file.';
    cy.fixture(wrongFile).then(fileContent => {
      cy.get('[data-testid=FontFileUploader]').upload({
        fileContent: fileContent,
        fileName: wrongFile,
        mimeType: 'text/plain'
      });
    });

    cy.contains(expectedMessage);
  });

});

describe('Uploading a font file', () => {

  describe('Displays the font name', () => {

    it('When it is Open Sans Regular', () => {
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

      cy.contains(expectedFontName);
    });

    it('When it is Roboto Slab Light', () => {
      const fontFileName = 'RobotoSlab-Light.ttf';
      const expectedFontName = 'Roboto Slab Light';

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

      cy.contains(expectedFontName);
    });

  });
});
