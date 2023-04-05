function MainPageCrk() {
  const long_word = "ê-kî-nitawi-kâh-kîmôci-kotiskâwêyâhk";
    return (
        <div className="main-page">
            <p>
                Type any Cree word to find its English translation. You can search for
                short Cree words (e.g., <a href={
                `/word/atim`
            }

            > <i>atim</i></a>) or very long
                Cree words (e.g.,
                {
                    " "
                }
                <a data-cy="long-word-example" href={`/search/?q=${long_word}`}>
                    <i>{long_word}</i>
                </a>
                ). Or you can type an English word and find its possible Cree
                translations. You can write words in Cree using standard Roman
                orthography (SRO) (e.g.,
                {
                    " "
                }
                <a href="/word/acimosis">
                    <span lang="cr"><i>acimosis</i></span>
                </a>
                ) or using syllabics (e.g.,
                {
                    " "
                }
                <a href="/word/ᐊᒋᒧᓯᐢ">
                    <span lang="cr"><i>ᐊᒋᒧᓯᐢ</i></span>
                </a>
                ).
            </p>

            <p>
                <a href="/words/itwêwina"><i>itwêwina</i></a> was made by the{" "}
                <a href="https://altlab.artsrn.ualberta.ca/">
                    Alberta Language Technology Lab (ALTLab)
                </a>
                , in collaboration with the{" "}
                <a href="https://www.fnuniv.ca/">First Nations University</a> and{" "}
                <a href="https://www.maskwacised.ca/">
                    Maskwacîs Education Schools Commission (MESC)
                </a>
                . The dictionary entries are courtesy of{" "}
                <a href="https://www.fnuniv.ca/academic/faculty/dr-arok-wolvengrey/">
                    Prof. Arok Wolvengrey
                </a>
                , MESC and Prof. emeritus Earle Waugh.
            </p>

            <p>
                The spoken Cree word recordings are courtesy of {" "}
                <a href="https://speech-db.altlab.app/maskwacis/speakers/">
                    speakers in Maskwacîs</a> and {" "}
                <a href="https://speech-db.altlab.app/moswacihk/speakers/OKI">Moswacîhk</a>
                . The {" "}
                <a href="https://aclanthology.org/W19-6009/">synthesized word-forms </a>
                are based on recording of a {" "}
                <a href="https://speech-db.altlab.app/synth/speakers/">speaker from Maskêko-sâkahikanihk</a>
                .
            </p>
        </div>
    );
}

export default MainPageCrk;
