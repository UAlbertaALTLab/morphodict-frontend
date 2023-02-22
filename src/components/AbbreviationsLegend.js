import "./style.css";
function AbbreviationsLegend(props) {
  return (
    <section id="legend" className="prose box box--spaced legend">
      <h2 className="abbr__section-title">
        Legend of abbreviations and terms
      </h2>

      <dl>
        <dt className="abbr__section-subtitle">s/he, she, he</dt>
        <dd className="abbr__section-subsection">
          <strong>s</strong>he, <strong>h</strong>e, or (singular) th
          <strong>e</strong>y. Used in definitions to stand for the
          <strong> animate actor</strong>, which is mostly human but can
          sometimes refer to other animate entities as well. The approximate
          equivalent to the Cree pronoun <a href="/word/wiya">wiya</a>. (e.g.{" "}
          <q>
            <dfn><strong>s/he</strong></dfn> sees;
            <dfn><strong>s/he</strong></dfn> sees something; <dfn><strong>s/he</strong></dfn> sees someone
          </q>
          )
        </dd>

        <dt className="abbr__section-subtitle">s.t., it</dt>
        <dd className="abbr__section-subsection">
          <strong>s</strong>ome<strong>t</strong>hing. Used in definitions to
          stand for the <strong>inanimate goal</strong>. (e.g.{" "}
          <q>
            s/he sees
            <dfn><strong> s.t.</strong></dfn>, i.e. something; s/he sees <dfn><strong>it</strong></dfn>
          </q>
          )
        </dd>

        <dt className="abbr__section-subtitle">s.o., her, him</dt>
        <dd className="abbr__section-subsection">
          <strong>s</strong>ome<strong>o</strong>ne, but can also mean
          “something animate” like <a href="/word/pahkwêsikan">pahkwêsikan</a>{" "}
          or <a href="/word/asikan">asikan</a>. Used in definitions to stand for
          the
          <strong> animate goal</strong>. (e.g.{" "}
          <q>
            s/he sees <dfn><strong>s.o.</strong></dfn>, i.e. someone; s/he sees <dfn><strong>him</strong></dfn>;
            s/he sees <dfn><strong>her</strong></dfn>
          </q>
          )
        </dd>

        <dt className="abbr__section-subtitle">it</dt>
        <dd className="abbr__section-subsection" style={{paddingBottom: "1rem"}}>
          Used in definitions to stand for the <strong>inanimate actor</strong>{" "}
          (e.g.{" "}
          <q>
            <dfn><strong>it</strong></dfn> is blue
          </q>
          ) or
          <strong> existential subject</strong> for impersonal verbs (the “it” in{" "}
          <q>
            <dfn><strong>it</strong></dfn> is raining
          </q>
          ).
        </dd>
      </dl>
    </section>
  );
}
export default AbbreviationsLegend;
