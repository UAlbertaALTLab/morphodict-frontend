import urls from "../../support/urls";

describe("The Northern Haida site", function () {
  it("works", function () {
    cy.visit(`${urls.hdneng}`);
    cy.get(".branding__heading").contains("Gúusaaw");
  });

  // TODO: reimplement these when the hdneng backend is working
  it.skip("can search for a word", function () {
    cy.visitSearch(`gataa`, urls.hdneng).searchResultsContain("gatáa");
  });

  it.skip("can display a paradigm", function () {
    cy.visit(`${urls.hdneng}/word/háagaang_k̲áa`);
    cy.get(".paradigm-cell").contains("háagaang k̲áaʼangäsaang");
  });
});
