import "./style.css";

function About(props) {
  return (
    <div className="about-page">
      <section id="source-materials" className="prose box box--spaced">
        <h2 className="prose__section-title">Source Materials</h2>

        <h3 className="prose__heading"> Plains Cree / <i>nêhiyawêwin</i></h3>
        <p>
          The computational model for analyzing Plains Cree / <i>nêhiyawêwin'</i> words
          and generating the various inflectional paradigms is based on the
          lexical materials and scientific research in{" "}
          <a
            href="https://uofrpress.ca/Books/C/Cree-Words"
            className="source-title"
          >
            <i>nêhiyawêwin : itwêwina / Cree: Words</i>
          </a>{" "}
          (Compiled by Arok Wolvengrey. Regina: Canadian Plains Research Center,
          2001), and described in{" "}
          <a
            href="http://altlab.artsrn.ualberta.ca/wp-content/uploads/2019/01/Snoek_et_al_CEL1_2014.pdf"
            className="source-title"
          >
            <i>Modeling the Noun Morphology of Plains Cree</i>
          </a>{" "}
          (Conor Snoek, Dorothy Thunder, Kaidi Lõo, Antti Arppe, Jordan Lachler,
          Sjur Moshagen &amp; Trond Trosterud, 2014) and{" "}
          <a
            href="http://altlab.artsrn.ualberta.ca/wp-content/uploads/2019/01/Harrigan_Schmirler_Arppe_Antonsen_Trosterud_Wolvengrey_2017fc.pdf"
            className="source-title"
          >
            <i>Learning from the Computational Modeling of Plains Cree Verbs</i>
          </a>{" "}
          (Atticus G. Harrigan, Katherine Schmirler, Antti Arppe, Lene Antonsen,
          Trond Trosterud &amp; Arok Wolvengrey. Morphology, 2018).
        </p>

        <h3 className="prose__heading">
          {" "}
          Plains Cree / <i>nêhiyawêwin</i> ↔ English / <i>âkayâsîmowin</i>{" "}
        </h3>
        <p>
          The bilingual Dictionary for Plains Cree / <i>nêhiyawêwin</i> and English /
          <i> âkayâsîmowin</i> is based on the lexical materials in{" "}
          <a
            href="https://uofrpress.ca/Books/C/Cree-Words"
            className="source-title"
          >
            <i>nêhiyawêwin : itwêwina / Cree: Words</i>
          </a>
          . (Compiled by Arok Wolvengrey. Regina: Canadian Plains Research
          Center, 2001), in the{" "}
          <a
            href="https://www.altlab.dev/maskwacis/dictionary.html"
            className="source-title"
          >
            <i>Maskwacîs Dictionary of Cree Words / Nêhiyaw Pîkiskwêwinisa</i>
          </a>{" "}
          (Maskwachees Cultural College, Maskwacîs, 2009) ,and in the {" "}
          <a href="https://www.uap.ualberta.ca/titles/122-9780888642844-alberta-elders-cree-dictionary-alperta-ohci-kehtehayak-nehiyaw-otwestamakewasinahikan">Alberta Elders' Cree Dictionary</a> / 
          <a href="https://www.uap.ualberta.ca/titles/122-9780888642844-alberta-elders-cree-dictionary-alperta-ohci-kehtehayak-nehiyaw-otwestamakewasinahikan">
            alperta ohci kehtehayak nehiyaw otwestamâkewasinahikan</a> (compiled by Nancy LeClaire and George Cardinal, 
           edited by Earle H. Waugh. Edmonton: University of Alberta Press, 2022).
        </p>

        <h3 className="prose__heading"> Spoken Cree — nêhiyaw-pîkiskwêwina</h3>
        <p>
          The careful pronunciations of the Cree words by first-language
          speakers in Maskwacîs, Alberta, have been recorded in the joint
          project{" "}
          <a href="https://www.altlab.dev/maskwacis/" className="source-title">
            <i>Spoken Dictionary of Maskwacîs Cree – nêhiyaw-pîkiskwêwina
            maskwacîsihk</i>
          </a>{" "}
          between then Miyo Wahkohtowin Education, now{" "}
          <a href="https://www.maskwacised.ca/">
            Maskwacîs Education Schools Commission
          </a>{" "}
          and the{" "}
          <a href="http://altlab.artsrn.ualberta.ca/">
            Alberta Language Technology Lab
          </a>{" "}
          (2014–on-going). The pronunciations of the Cree words have been
          graciously provided by the individuals at{" "}
          <a href="https://www.altlab.dev/maskwacis/Speakers/speakers.html">
            this page
          </a>
          .
        </p>
        <p>Additional Cree recordings are provided by <a href="https://speech-db.altlab.app/moswacihk/speakers/OKI">Dr. Jean Okimâsis</a>, a Cree speaker
        and scholar from Moswacîhk, Saskatchewan. The core of these recordings was collected for the
        <a href="https://uofrpress.ca/Books/N/nehiyawewin-paskwawi-pikiskwewin-Cree-Language-of-the-Plains-Language-Lab-Workbook">Workbook</a> for her seminal Cree textbook,
        <a href="https://uofrpress.ca/Books/C/Cree-Language-of-the-Plains2">Cree: language of the plains / nêhiyawêwin: paskwâw-pîkiskwêwin</a>. </p>
        <p>More recordings of Dr. Okimâsis for paradigms have been collected by Dr. Arok Wolvengrey.</p>
        <p>Synthesized Cree word-forms and phrases are generated with a <a href="https://aclanthology.org/W19-6009/">speech synthesizer</a> developed 
        by Atticus Harrigan, Antti Arppe, and Timothy Mills, based on recordings of <a href="https://speech-db.altlab.app/synth/speakers/">Dolores Greyeyes Sand</a>, a Cree speaker from Maskêko-sâkahikanihk, Saskatchewan. 
        </p>
      </section>

      <section id="credits" className="prose box box--spaced">
        <h2 className="prose__section-title">Credits</h2>

        <p>
          <i>itwêwina</i> is{" "}
          <a href="https://github.com/UAlbertaALTLab/morphodict">
            an open-source project
          </a>
          . You can view{" "}
          <a href="https://github.com/UAlbertaALTLab/morphodict/blob/main/AUTHORS.md">
            the list of the contributors here.
          </a>
        </p>

        <p> The <i>mîkiwâhp</i> (teepee) logo was created by Tasha Powers. </p>

        <p>
          This project has been supported by the Social Sciences and Humanities
          Research Council (SSHRC) of Canada, through grants 895-2019-1012,
          611-2016-0207, and 890-2013-0047, and it contains contributions from
          the{" "}
          <a href="https://nrc.canada.ca/en/research-development/research-collaboration/programs/canadian-indigenous-languages-technology-project">
            Canadian Indigenous languages technology project
          </a>
          , a part of the{" "}
          <a href="https://nrc.canada.ca/en">
            National Research Council Canada
          </a>
          .
        </p>

        <div className="partner-logos">
          <a
            className="partner-logos__logo partner-logos__logo--full-width"
            href="https://www.sshrc-crsh.gc.ca/home-accueil-eng.aspx"
          >
            <img
              className="sshrc-crsh-logo"
              alt="Social Sciences and Humanities Research Council"
            ></img>
          </a>
          <a className="partner-logos__logo" href="https://www.maskwacised.ca/">
            <img className="mesc-logo" alt="MESC"></img>
          </a>
          <a className="partner-logos__logo" href="http://fnuniv.ca/">
            <img className="fnu-logo" alt="First Nations University"></img>
          </a>
          <a
            className="partner-logos__logo"
            href="https://altlab.artsrn.ualberta.ca/"
          >
            <img className="uofa-logo" alt="University of Alberta"></img>
          </a>
          <a
            className="partner-logos__logo partner-logos__logo--full-width"
            href="https://nrc.canada.ca/en/research-development/research-collaboration/programs/canadian-indigenous-languages-technology-project"
          >
            <img
              className="nrc-cnrc-logo"
              alt="National Research Council Canada"
            ></img>
          </a>
        </div>
      </section>

      <section id="contact-us" className="prose box box--spaced">
        <h2 className="prose__section-title">Contact us</h2>
        <p>
          Find a problem? Email us at{" "}
          <a href="mailto:altlab@ualberta.ca" className="about__link">
            altlab@ualberta.ca
          </a>
          .
        </p>
      </section>
    </div>
  );
}

export default About;
