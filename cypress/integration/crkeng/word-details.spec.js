import { visitSearch } from "../../support/commands.js"
import urls from "../../support/urls.js"

context("Word details", () => {
  describe("I want to see the word class and inflectional category for a Cree word", () => {
    // Test at least one word from each word class:
    //
    const testCases = [
      { wc: "VTA", ic: "VTA-1", word: "mowêw", wt:10000 },
      { wc: "VAI", ic: "VAI-1", word: "wâpiw@1", wt:1000 },
      { wc: "VTI", ic: "VTI-3", word: "mîciw", wt:1000 },
      { wc: "VII", ic: "VII-1n", word: "nîpin", wt:1000 },
      // NDA and NDI don't work right now
      // TODO: pretty sure this should be NAD, but the labels say otherwise:
      // { wc: "NDA", ic: "NDA-1", word: "nôhkom", wt:1000 },
      // TODO: pretty sure this should be NID, but the labels say otherwise:
      // { wc: "NDI", ic: "NDI-1", word: "mîpit", wt:1000 },
      { wc: "NA", ic: "NA-1", word: "minôs", wt:1000 },
      { wc: "NI", ic: "NI-2", word: "nipiy", wt:1000 },
      { wc: "IPC", ic: null, word: "ispîhk", wt:1000 },
    ];

    // Create test cases for each word above
    for (let { wc, word, ic, wt } of testCases) {
      it(`should display the word class and inflection class for ${word} (${wc})`, () => {
        cy.visitLemma(word);
        cy.wait(wt);

        cy.url().should("contain", "word/");

        cy.get("#definition").contains(wc);

        if (!ic) return;

        cy.get("#definition").contains(ic);
      });
    }
  });
});
