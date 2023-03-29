import urls from "../../support/urls";

describe("The Woods Cree site", function () {
  it("works", function () {
    cy.visit(`${urls.cwdeng}`);
    cy.get(".branding__heading").contains("itwīwina");
  });

  // TODO: revisit these when the cwdeng backend is working
  it.skip("can search for a word", function () {
    cy.visitSearch(`makes pottery`, urls.cwdeng).searchResultsContain(
      "asiskīwithākanihkīw"
    );
  });

  it.skip("can display a paradigm", function () {
    cy.visit(`${urls.cwdeng}/word/asiskīwithākanihkīw`);
    cy.get(".paradigm-cell").contains("kitasiskīwithākanihkānaw");
  });
});
