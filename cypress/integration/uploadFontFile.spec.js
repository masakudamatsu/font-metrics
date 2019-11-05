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

  describe('When it is Open Sans Regular', () => {

    it('Displays the font name', () => {
      // Setup
      const fontFileName = 'OpenSans-Regular.ttf';
      const expectedFontName = 'Open Sans Regular';
      // Execute
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
      // Verify
      cy.contains(expectedFontName);
    });

    it('Renders sample paragraphs in the uploaded font', () => {
      const expectedFontFamily = '"Open Sans"';
      const expectedFontWeight = '400';
      cy.get('[data-testid=SampleParagraph]').should('have.css', 'font-family', expectedFontFamily);
      cy.get('[data-testid=SampleParagraph]').should('have.css', 'font-weight', expectedFontWeight);
    });

  });
  describe('When it is Roboto Slab Light', () => {
    it('Displays the font name', () => {
      // Setup
      const fontFileName = 'RobotoSlab-Light.ttf';
      const expectedFontName = 'Roboto Slab Light';
      // Execute
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
      // Verify
      cy.contains(expectedFontName);
    });
    it('Renders sample paragraphs in the uploaded font', () => {
      const expectedFontFamily = '"Roboto Slab"';
      const expectedFontWeight = '300';
      cy.get('[data-testid=SampleParagraph]').should('have.css', 'font-family', expectedFontFamily);
      cy.get('[data-testid=SampleParagraph]').should('have.css', 'font-weight', expectedFontWeight);
    });
  });
  // describe('When the uploaded font fails to be loaded', () => {
  //   it('The error message is shown in place of the sample paragraph', () => {
  //
  //   });
  // });

});
