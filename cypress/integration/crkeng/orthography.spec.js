import { visitSearch } from "../../support/commands.js"

describe("Orthography selection", function () {
  describe("switching orthography", function () {
    it("should switch to syllabics when I click on the menu", function () {
      cy.visit("/");

      // Get the introduction: it should be in SRO
      cy.contains("h2", "tânisi").as("greeting");

      // Switch to syllabics
      cy.get("[data-cy=settings-menu]").click().parent("details").as("menu");
      cy.get("@menu")
        .contains("Syllabics")
        .as("option")
        .should("be.visible")
        .click();

      // Now it should be in syllabics!
      cy.get("@greeting").contains("ᑖᓂᓯ");

      // It should say so on the button
      cy.get("[data-cy=settings-menu]").click();

      // Opening the menu, we should find that syllabics is highligted, and
      // SRO is not:
      cy.get("@menu")
        .contains("li", "SRO (êîôâ)")
        .should("not.have.class", "menu-choice--selected");
      cy.get("@menu")
        .contains("li", "Syllabics");
    });

    it("should display in syllabics given the correct cookies", function () {
      let settings = {
        "plainEngl":true,"lingLabel":false,"niyaLabel":false,"label":"ENGLISH","emojis":{"man":"🧑🏽","gamma":"👵🏽","gapa":"👴🏽","wolf":"🐺","bear":"🐻","bread":"🍞","star":"🌟"},"active_emoji":"🧑🏽","cw_source":false,"md_source":false,"aecd_source":false,"all_sources":true,"latn":false,"latn_x_macron":false,"syllabics":true,"currentType":"Cans","showAudio":false,"synthAudio":false,"synthAudioParadigm":false,"espt":false,"autoTranslate":false,"showEmoji":true,"showIC":true,"morphemes_everywhere":false,"morphemes_headers":false,"morphemes_paradigms":false,"morphemes_nowhere":true,"md_audio":false,"mos_audio":false,"both_audio":true,"cmro":false}

      window.localStorage.setItem('settings', JSON.stringify(settings));
      window.dispatchEvent(new Event("settings"));

      // Visiting a page should be in syllabics
      cy.visit("/about");
      cy.contains("h1", "ᐃᑘᐏᓇ");
    });

    it("should persist my preference after a page load", function () {
      cy.visit("/");

      // Get the introduction: it should be in SRO
      cy.contains("h2", "tânisi").as("greeting");

      // Switch to syllabics
      cy.get("[data-cy=settings-menu]").click().parent("details").as("menu");
      cy.get("@menu").contains("Syllabics").click();

      // It changed on the current page:
      cy.get("@greeting").contains("ᑖᓂᓯ");

      // Now try a different page.
      cy.visit("/about");

      // It should be in syllabics.
      cy.contains("h1", "ᐃᑘᐏᓇ");
    });

  });
});
