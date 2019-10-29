describe('Uploading a font file', () => {

  before(() => {
    cy.visit('http://localhost:3000');
  });

  it('Displays the font name', () => {

    const fontFileName = 'OpenSans-Regular.ttf';

    cy.fixture(fontFileName, 'binary')
      .then(Cypress.Blob.binaryStringToBlob)
      .then((fontFile) => {
        cy.get('[data-test=fontFileUploader]').upload({
          fileContent: fontFile,
          fileName: fontFileName,
          mimeType: 'font/ttf',
          encoding: 'utf8'
        });
      });

    cy.contains('Open Sans Regular');
  });
});
