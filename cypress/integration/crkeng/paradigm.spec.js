import { visitSearch } from "../../support/commands.js"

describe("I want to search for a Cree word and see its inflectional paradigm", () => {
  // Test at least one word from each word class:
  const testCases = [
    {
      pos: "VTA",
      lemma: "mowêw",
      inflections: ["kimowin", "kimowitin", "ê-mowât"],
      waitTime: 8000
    },
    {
      pos: "VAI",
      lemma: "wâpiw",
      inflections: ["niwâpin", "kiwâpin", "ê-wâpiyit"],
      waitTime: 3000
    },
    {
      pos: "VTI",
      lemma: "mîcisow",
      inflections: ["nimîcison", "kimîcison", "ê-mîcisoyit"],
      waitTime: 5000
    },
    { pos: "VII", lemma: "nîpin", inflections: ["nîpin", "ê-nîpihk"], waitTime: 2000 },
    // NAD and NID don't work right now
    // { pos: "NAD", lemma: "nôhkom", inflections: ["kôhkom", "ohkoma"], waitTime: 8000 },
    // { pos: "NID", lemma: "mîpit", inflections: ["nîpit", "kîpit", "wîpit"], waitTime: 8000 },
    { pos: "NA", lemma: "minôs", inflections: ["minôsak", "minôsa"], waitTime: 3000 },
    {
      pos: "NI",
      lemma: "nipiy",
      inflections: ["nipîhk", "ninipiy", "kinipiy"],
      waitTime: 3000
    },
  ];

  // Create test cases for each word above
  for (let { pos, lemma, inflections, waitTime } of testCases) {
    it(`should display the paradigm for a word belonging to the ${pos} word class`, () => {
      cy.visitSearch(lemma);
      cy.wait(4000);

      cy.get('[data-cy=lemmaLink]').contains("a", lemma).click();
      cy.wait(waitTime);

      cy.get('[data-cy=paradigm]').as("paradigm");
      cy.get('[data-cy="paradigm"] > :nth-child(1) > :nth-child(1)').click();

      let ctx = cy.get("@paradigm").should("contain", lemma);
      for (let wordform of inflections) {
        ctx = ctx.and("contain", wordform);
      }
    });
  }

  it("should display the paradigm for personal pronouns", () => {
    const head = "niya";
    const inflections = ["kiya", "wiya"];

    cy.visitSearch(head);
    cy.wait(8000);
    cy.get('[data-cy=lemmaLink]').contains("a", head).click();

    cy.get("[data-cy=paradigm]").as("paradigm");
    cy.get('[data-cy="paradigm"] > :nth-child(1) > :nth-child(1)').click();

    let ctx = cy.get("@paradigm").should("contain", head);
    for (let wordform of inflections) {
      ctx = ctx.and("contain", wordform);
    }
  });

  it("should display titles within the paradigm", () => {
    cy.visitSearch("minôsis");
    cy.wait(3000);
    cy.get("[data-cy=lemmaLink]").contains("a", "minôsis").click();
    cy.wait(3000);

    cy.get("[data-cy=paradigm]").as("paradigm");

    // TODO: the layouts should be able to differentiate between titles and
    // labels; currently, the specificiation is ambigous, hence, it's seen
    // as a .paradigm-label, when it should be a .paradigm-title :/
    cy.get("@paradigm").contains("belongs to");
  });
});


describe("I want to see a clear indicator that a form does not exist", () => {
  it("shows cells that do not exist as an em dash", () => {
    const EM_DASH = "—";

    // minôs does NOT have a diminutive
    cy.visitLemma("minôs");
    cy.wait(1500);
    cy.get('[data-cy="paradigm"] > :nth-child(1) > :nth-child(3)').click();
    cy.wait(100);
    cy.get('[data-cy=paradigm]').contains(".row", EM_DASH);
  });
});



describe("Paradigm labels", () => {
  let lemma = "nipâw";
  let englishLabel = "they";
  let nehiyawewinLabel = "wiyawâw";
  let linguisticLabel = "3p";

  it("should appear in plain English by default", () => {
    cy.visitLemma(lemma);
    cy.wait(5000);

    cy.get('[data-cy="paradigm"] > :nth-child(1) > :nth-child(2)').click();

    cy.get(".MuiPaper-root.Mui-expanded").contains(englishLabel);
  });

  it("should appear in nêhiyawêwin (Plains Cree)", () => {
    cy.visitLemma(lemma);
    cy.wait(5000);

    cy.get('[data-cy=settings-menu]').click();
    cy.get(".menu-choice__label")
      .contains(/nêhiyawêwin/i)
      .click();

    cy.get('[data-cy="paradigm"] > :nth-child(1) > :nth-child(2)').click();

    cy.get(".MuiPaper-root.Mui-expanded").contains(nehiyawewinLabel);
  });

  it("should appear using lingustic terminology", () => {
    cy.visitLemma(lemma);
    cy.wait(5000);

    cy.get('[data-cy=settings-menu]').click();
    cy.get(".menu-choice__label")
      .contains(/linguistic labels \(short\)/i)
      .click();

    cy.get('[data-cy="paradigm"] > :nth-child(1) > :nth-child(2)').click();

    cy.get(".MuiPaper-root.Mui-expanded").contains(linguisticLabel);
  });
});

describe("I want to see multiple variants of the same inflection on multiple rows", () => {
  // See: https://github.com/UAlbertaALTLab/morphodict/issues/507
  it("should display two rows for nipâw+V+AI+Ind+12Pl", () => {
    const forms = ["kinipânaw", "kinipânânaw"];
    let rowA = null;
    let rowB = null;
    cy.visitLemma("nipâw");
    cy.wait(6000);

    cy.get('[data-cy="paradigm"] > :nth-child(1) > :nth-child(2)').click();

    cy.get('.MuiPaper-root.Mui-expanded').contains(forms[0]);
    cy.get('.MuiPaper-root.Mui-expanded').contains(forms[1]);
  });
});
