import urls from "../../support/urls.js"
import { visitSearch } from "../../support/commands.js"

describe("The Arapaho site", function () {
  it("works", function () {
    cy.visit(`${urls.arpeng}`);
    cy.get(".branding__heading").contains("Arapaho Dictionary");
  });

  // the remainder of the tests are being skipped until the API is working
  it.skip("can search for a word", function () {
    cy.visitSearch(`nihooyoo`, urls.arpeng);
    cy.wait(5000);
    cy.searchResultsContain("níhooyóó-");
  });

  it.skip("can display a paradigm", function () {
    cy.visit(`${urls.arpeng}/word/níhooyóó-`);
    cy.get(".paradigm-cell").contains("hoownihooyoono");
  });
});
