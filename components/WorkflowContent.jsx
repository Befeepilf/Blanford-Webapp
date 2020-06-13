import React from 'react';
import Link from 'next/link';
import MathJax from 'react-mathjax2';
import Image from './Image.jsx';
import ProcessList from './ProcessList.jsx';
import Collapsable from './Collapsable.jsx';
import '../styles/WorkflowContent.scss';

export default function WorkflowContent(props) {
  return(
    <div className="WorkflowContent">
      <section>
        <div className="container">
          <h3>Was wir tun</h3>
          <p>
            Leadgenerierung und Advertising online ist nicht unähnlich mit einem Verbrennungsmotor. Das eigene Marketing Budget in Online Advertising zu investieren ist eine immense Möglichkeit und eine Gefahr zugleich. Mit absoluter Leichtigkeit lassen sich mithin 10 Tagen €1500 verbrennen, ohne das man sich von der Stelle gerührt hätte. Es benötigt die richtige Mechanik, um in einem rentablen Verhältnis von Ausgaben zu Resultaten Traktion zu fassen und diese Dynamik aufrechterhalten zu können.
            <br/>
            <br/>
            Blanford bietet Finanzberatern und Firmen in Finanzberatung die Möglichkeit, ihre Werbeplanung und -verwaltung auszulagern, damit diese profitabel für Sie funktioniert und Ihnen die Rendite und Resultate bietet, die Sie benötigen. Wir versuchen, Ihnen ein müheloses, frustrationsfreies Erlebnis zu bieten, sodass Sie komplette Einsicht und Verständnis über die Performance Ihres Marketings haben, ohne sich um Ihre Anzeigen kümmern zu müssen. Loggen Sie sich einfach ein, wann immer Sie Zeit haben.
            <br/>
            <br/>
            Das Erreichen unserer Lösung für Sie erfordert nicht so viel ein gekonntes technisches Umgehen mit Facebook Anzeigen oder Sales Funnels, obgleich die algorithmischen Kräfte, die auf die Anzeigen auswirken unbedingt komplett verstanden werden müssen und einige fortschrittliche Praktiken unverzichtbar sind. Eher ist der komplexe Aspekt, den Kunden besser zu kennen, um ihn effektiv ansprechen zu können. Dies ist, woran wir mithilfe unserer Fragebögen und verschiedenen Methoden mit Ihnen arbeiten. Wer seinen Kunden nicht gut genug kennt, um ihn bereits erfolgreich auf konventionelle Weise Kunden zu gewinnen, kann dies in 98 aus 100 Fällen auch online nicht.
          </p>

          <div className="services">
            <div>
              <h4>AUM Acqusition Program</h4>
              <p>
                Ganzheitliches Facebook Ad Management zur Optimierung des Verhältnisses von Ausgaben zu Kundenakquisitionen unter Berücksichtigung Ihrer Profitabilitäts-Schwellenwerte, inkl. Facebook Offers und Funnel Integration.
                <br/>
                Das AUM Acqusition Program hilft Ihnen, die notwendige monatliche Anzahl an Terminen mit qualifizierten Kunden zu erzielen, ineffiziente Methoden des Marketings abzulösen und den Wert der Leads durch teil-automatisierte organische LinkedIn Strategien, tiefere Kundenkenntnis und kosteneffizienterem Advertising zu erhöhen — online, Schritt für Schritt und 85% Done-For-You.
              </p>
              <Link href="/"><a>Mehr erfahren</a></Link>
            </div>
          </div>
        </div>
      </section>

      <section id="process">
        <div className="container">
          <h3>Workflow mit Online Advertising</h3>
          <ProcessList steps={[
            "Wenn Sie an unserer Einschätzung interessiert sind, erstellen Sie ein Nutzerkonto und bestätigen Sie Ihre E-Mail-Adresse.",
            `Nehmen Sie sich ein paar Minuten Zeit, unseren Fragebogen in Ruhe zu beantworten.`,
            "Klicken Sie auf “Weiter” und wählen Sie im nächsten Fenster einen Zeitpunkt für eine Besprechung aus. Wir werden uns beraten und Ihnen auf Grundlage der Informationen zur gewünschten Zeit auf Ihre gewünschte Weise unsere Optionen mitteilen.",
            "Sie können uns auf Wunsch auch im Chat kontaktieren"
          ]}/>
        </div>
      </section>

      <section>
        <div className="container">
          <h3>Wie stehen wir Ihnen zur Verfügung?</h3>
          <p>
            Die effizientere Verwaltung von Nachrichten und Zuordnung zum richtigen Kunden ist der hauptsächliche Grund für die Existenz unserer Web-Oberfläche. Nachdem Sie sich eingeloggt haben, stehen wir Ihnen im Chat jederzeit zur Verfügung. Navigieren Sie hierzu zum Tab “Threads”.
            <br/>
            Für allgemein geschäftliche Fragen und Angelegenheiten stehen wir Ihnen unter <a className="link" href="mailto:contact@blanford.de">contact@blanford.de</a> zur Verfügung.
            <br/>
            Sollten Sie Schwierigkeiten bspw. beim Einloggen haben, kontaktieren Sie uns bitte unter <a className="link" href="mailto:support@blanford.de">support@blanford.de</a>.
            <br/>
            Möchten Sie allgemeines oder spezifisches Feedback geben, loggen Sie sich ein, navigieren Sie zu Ihrem Account-Menü oben rechts und wählen Sie “Feedback”.
          </p>
        </div>
      </section>

      <section>
        <div className="container">
          <h3>Performance messen & verstehen</h3>
          <Image name="stats2.png"/>
          <p>Ihr Performance Dashboard macht es leicht, gemessene Performance zu interpretieren. Auf einen Blick sehen Sie die Ergebnisse aller Schlüsselrechnungen und sind imstande, unsere Sicht der Lage zu verstehen. Außerdem machen wir die Standards offensichtlich, an welchen wir durch Erfahrungswerte die Leistung des Sales Funnels bewerten.</p>
        </div>
      </section>

      <section>
        <div className="container">
          <h3>Q: Gibt es eine Garantie für bestimmte Resultate?</h3>
          <p>
            Selbst bei gutem Verständnis der relevanten Algorithmen liegen jederzeit zu viele Variablen außerhalb unserer Kontrolle oder unseres Wissens, als dass wir bestimmte positive Resultate garantieren könnten.
            <br/>
            Was wir allerdings tun, ist Anzeigen, Anzeigensets oder Kampagnen sofort zu deaktivieren, sobald CPA-Werte außerhalb Ihres profitablen oder kostendeckenden Bereichs fallen.
          </p>
        </div>
      </section>

      <section>
        <div className="container">
          <h3>Zahlung</h3>
          <p>
            Die Überlegung der Rentabilität ist allgemein, ob der Wert eines Leads — d. h., welche Anzahl an Kunden Ihnen 10 Leads einbringen und wie viel Umsatz Ihnen ein Kunde einbringen wird — die Kosten pro Lead übersteigt. Auch ist Vergleich mit momentanem Aufwand wichtig: was bisherige Ausgaben für eine Kundenakquise sind, welches Potential für Verbesserung es schätzungsweise für die Unterbietung dieser Ausgaben gäbe und ob jene Verbesserung erheblich genug ist.
            <br/>
            <br/>
            Einsicht in relevante Metriken (“Back-end ROI metrics”) bietet die Statistik-Seite in Ihrem Nutzerkonto. Sollte sich herausstellen, dass sich kein ROI realisieren lässt, wäre dies dort schnell und eindeutig zu bestimmen.
            <br/>
            <br/>
            Beachten Sie, dass es eine Entwicklungsphase von bis zu 60 Tagen gibt, in welcher die Verwendung unserer Testreihen stattfindet und Ad Performance noch nicht optimal ist.
          </p>

          <h4>ROI-Rechner Inputs</h4>
          <dl>
            <dt>Konversionsrate</dt>
            <dd>Anteil der Leads, welche voraussichtlich zu Ihrem Kunden werden. Als Lead betrachten wir bspw. das Einlösen eines Discounts in einem Facebook Offer, das Weiterleiten eines Anrufs an Sie oder das auf andere Weise ausdrückliche Bekunden der Intention, ein Angebot von Ihnen wahrzunehmen, von einer Person, welche jeder Indikation nach nicht bereits Ihr Kunde ist.</dd>

            <dt>Customer Lifetime Value</dt>
            <dd>
              Der “Lifetime Value of a Customer” (auch: “Customer Lifetime Value”) beschreibt den durchschnittlichen Betrag, den ein Kunde bei Ihnen während des gesamten Zeitraums ausgibt, der er Ihr Kunde ist. Zum Beispiel: Durchschnittlich kauft ein Kunde für fünf Jahre bei Ihnen und gibt während dieses Zeitraums 1250 Euro aus.
              <br/>
              Der LTV ist also der Wert, den ein Kunde im Laufe der Jahre für ein Gewerbe hat bzw. in der Zukunft haben wird. Für seine Berechnung werden daher neben den historischen Erlösen auch die zukünftig erwarteten Umsätze berücksichtigt (Kundenpotenzial).
            </dd>

            <dt>Werbebudget</dt>
            <dd>Maximaler monatlicher Betrag, welcher als Budget für Facebook Anzeigen verwendet werden kann. Empfehlung: €900+.</dd>
          </dl>
          <br/>
          <br/>
          <p><strong>Hinweis: Es handelt sich um Schätzungen</strong></p>
          <p>Dies sind offengelegte Schätzungen für die Evaluation von Potential in Ihrer Situation; es stellt keine Garantie oder Marketing-Botschaft dar. Genaue Inputs nötig. Die Bezeichnung "Gebühr" beschreibt lediglich das Management von BLANFORD, nicht das Werbebudget, wogegen "Ausgaben" im ROI-Rechner auch Werbebudget einbezieht.</p>

          <h4>ROI-Rechner Rechnung</h4>
          <MathJax.Context options={{
            'HTML-CSS': {
                preferredFont: 'TeX'
            }
          }}>
            <p style={{columnCount: 2}}>
              <MathJax.Node inline>S:</MathJax.Node> angegebenes Werbebudget + Servicegebühr
              <br/>
              <MathJax.Node inline>S = 3470€</MathJax.Node>
              <br/>
              <br/>
              <MathJax.Node inline>L:</MathJax.Node> Anzahl an Leads abgeleitet aus Werbebudget und Erfahrung
              <br/>
              <MathJax.Node inline>L = 26</MathJax.Node>
              <br/>
              <br/>
              <MathJax.Node inline>c:</MathJax.Node> Input Closing Rate (Slider unten links)
              <br/>
              <MathJax.Node inline>c = 20\%</MathJax.Node>
              <br/>
              <br/>
              <MathJax.Node inline>k:</MathJax.Node> Neukunden pro Monat
              <br/>
              <MathJax.Node inline>k = c * L = 20\% * 26 \approx 5</MathJax.Node>
              <br/>
              <br/>
              <MathJax.Node inline>v:</MathJax.Node> Input Customer Lifetime Value (Slider unten mittig)
              <br/>
              <MathJax.Node inline>v = 1500€</MathJax.Node>
              <br/>
              <br/>
              <br/>
              <MathJax.Node inline>w:</MathJax.Node> jährlicher Mehrwert
              <MathJax.Node inline>a:</MathJax.Node> jährliche Ausgaben
              <br/>
              <MathJax.Node inline>w = k * v * 12 = 5 * 1500€ * 12 = 90000€</MathJax.Node>
              <br/>
              <MathJax.Node inline>a = s * 12 = 3470€ * 12 = 41640€</MathJax.Node>
              <br/>
              <br/>
              <MathJax.Node inline>R:</MathJax.Node> monatliche Rendite
              <br/>
              <MathJax.Node inline>R = {'\\frac{w}{12} - S = \\frac{90000€}{12} - 3470€ = 4030€'}</MathJax.Node>
              <br/>
              <MathJax.Node inline>ROI = {'\\frac{R}{S} = \\frac{4030€}{3470€} \\approx 116\\%'}</MathJax.Node>
            </p>
          </MathJax.Context>
        </div>
      </section>

      <section>
        <div className="container">
          <h3>Haben Sie Fragen?</h3>
          <Collapsable id="faqs-fo-0" group="faqs-fo" title="Warum Blanford?">Wir möchten uns auf das konzentrieren, was Sie wirklich interessiert: Rentable Anzeigen und ein frustrationsfreies Erlebnis. Auf dieses Ziel hin betrachten wir Advertising daten-basiert und versuchen stetig, Ihre Metriken auf neuen Wegen zu verbessern. Um Anmeldung, Kommunikation und alles weitere so unkompliziert wie irgend möglich zu halten, haben wir ein Account-System entwickelt, von welchem aus Sie alles überblicken können, wann immer Sie Zeit dazu haben. Hierdurch können Sie ebenfalls Hilfe erhalten, ungeachtet wie viel Unterstützung Sie benötigen.</Collapsable>
          <Collapsable id="faqs-fo-1" group="faqs-fo" title="Verpflichte ich mich für mehrere Monate?">Nein, unsere Vereinbarungen bestehen Monat zu Monat. Cancel anytime.</Collapsable>
          <Collapsable id="faqs-fo-2" group="faqs-fo" title="Behalte ich volle Kontrolle?">Ja. Wir lassen alle Anzeigen von Ihnen genehmigen und es existieren im Ad-Account selbst Einstellungen gemacht für Drittparteien wie uns, welche in Kombination alle Kontrolle bei Ihnen lassen.</Collapsable>
          <p>Weitere Fragen? Besuchen Sie unsere <Link href="/faq"><a><u>FAQ-Seite</u> <span className="arrow">&#10132;</span></a></Link></p>
        </div>
      </section>
    </div>
  );
}
