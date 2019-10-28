describe('Smoke Test', () => {
  it('Makes sure the welcome message comes up', () => {
    cy.visit('http://localhost:3000')
      .contains('Hello, world!');
  });
});
