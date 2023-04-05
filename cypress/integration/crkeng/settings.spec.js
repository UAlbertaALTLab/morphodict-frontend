import { visitSearch } from "../../support/commands.js"
import urls from "../../support/urls.js"

context("The settings page", () => {

  it("should be accessible from the home page", () => {
    cy.visit("/");
    cy.get("[data-cy=settings-menu]")
      .click()
      .get("[data-cy=settings-link")
      .click();

    cy.url().should("match", /\bsettings\b/);
  });

  describe("setting a preference", () => {

    it("should set the preference without a submit button", () => {
      let checkedValue;

      cy.visit(`${urls.settings}`);

      cy.get('#NÊHIYAWÊWIN')
        .check();

      cy.visitLemma("mistikomin");
      cy.wait(3000);

      cy.get("[data-cy=paradigm]").contains("pêyak");
    });

    // This test is good to have, but currently the settings always save and do so quietly
    // there's no success or error toast, so this test is unnecessary.
    it.skip("should show an error message if the save did not succeed", () => {
      cy.visit(`${urls.settings}`);

      cy.get(`input[name=label_type]`)
        .parents("form")
        .then((jqueryForm) => {
          hijackFormSubmissionToAlwaysFail(jqueryForm).as("form-submission");

          cy.get(`input[name=label_type]`).last().check();
          cy.wait("@form-submission");

          cy.get("[data-cy=toast]")
            .should("be.visible")
            .and("have.class", "toast--failure");
        });

      function hijackFormSubmissionToAlwaysFail(jqueryForm) {
        return cy.intercept(
          {
            method: jqueryForm.attr("method"),
            url: jqueryForm.attr("action"),
          },
          {
            statusCode: 400,
          }
        );
      }
    });
  });

  describe("Choosing an animate emoji", () => {
    const PREFERENCE_COOKIE = "animate_emoji";
    const NON_DEFAULT_EMOJI = "🐺";

    const VTA_WORD = "mowêw";
    const NA_WORD = "minôs";
    const VAI_WORD = "nipâw";

    it("should be accessible from the settings page", () => {
      cy.visit(`${urls.settings}`);

      cy.get("[data-cy=animate-emoji-choice]")
        .contains("label", NON_DEFAULT_EMOJI)
        .click();

      cy.visitSearch("mistikomin");
      cy.wait(7000);

      cy.get("[data-cy=wordclassEmoji]").first().should("contain", NON_DEFAULT_EMOJI);
    });

    it("should change the emoji on the search page", () => {
      cy.visit(`${urls.settings}`);

      cy.get("[data-cy=animate-emoji-choice]")
        .contains("label", NON_DEFAULT_EMOJI)
        .click();

      // Visit the search page directly
      cy.visitSearch(VTA_WORD);
      cy.wait(3000);
      cy.get("[data-cy=searchResults]:first").contains(
        "[data-cy=wordclassEmoji]",
        `${NON_DEFAULT_EMOJI}➡️${NON_DEFAULT_EMOJI}`
      );

      // On the same page, search for something else entirely
      cy.clearSearchBar().search(NA_WORD);
      cy.wait(3000);
      cy.get("[data-cy=searchResults]:first").contains(
        "[data-cy=wordclassEmoji]",
        NON_DEFAULT_EMOJI
      );
    });

    it("should changes the emoji on the details page", () => {
      cy.visit(`${urls.settings}`);

      cy.get("[data-cy=animate-emoji-choice]")
        .contains("label", NON_DEFAULT_EMOJI)
        .click();

      cy.visitLemma(VAI_WORD);
      cy.wait(7000);
      cy.contains("#definition", `${NON_DEFAULT_EMOJI}➡️`);
    });
  });
});
