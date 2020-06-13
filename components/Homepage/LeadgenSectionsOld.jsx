import React from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Image from '../Image.jsx';
import CalcSection from '../CalcSection.jsx';
import SignUp from './SignUp.jsx';
import BrandName from '../BrandName.jsx';
import GroupIcon from './icons/Group.svg';
import {getRouteByComponent, articleContentToHTML} from '../../Util.js';
import '../../styles/Homepage/LeadgenSections.scss';


function LeadgenSections(props) {
  const [stepperIndex, setStepperIndex] = React.useState(0);
  const [showPsychologySectionContent, setShowPsychologySectionContent] = React.useState(false);

  function decrementStepperIndex() {
    setStepperIndex(stepperIndex - 1);
  }

  function incrementStepperIndex() {
    setStepperIndex(stepperIndex + 1);
  }

  function togglePsychologySectionContent() {
    setShowPsychologySectionContent(!showPsychologySectionContent);
  }

  const FAQPath = getRouteByComponent(props.routes, 'FAQ').fullPath;

  return(
    <div id="LeadgenSections">
      <section className="container">
        <h3>New AUM Program</h3>
        <p>New AUM ist eine Sequenz aus Schritten, aufbauend auf LinkedIn, mit dem Ziel dass Sie durch annehmbar kurze tägliche Online-Aktivität Gesprächstermine mit Interessenten erzielen können und Ihre Sichtbarkeit vergrößern. Es besteht aus Done-For-You und Done-With-You Komponenten sowie (demnächst) einem Kurs aus Video-Material.</p>

        <div>
          <div>
            <Image name="hplp-icon-0.png"/>
            <div>
              <h4>Prozesse, die Ihre Ziele erreichen</h4>
              <p>Es reicht nicht das Potential Ihrer Leadgenerierung zu erreichen — wir wollen den Prozess systemisieren, sodass jeder Kunde möglichst schnell, mit wenig Aufwand oder Nachfragen zum Ziel kommt.</p>
            </div>
          </div>

          <div>
            <Image name="hplp-icon-1.png"/>
            <div>
              <h4>Wie funktioniert es?</h4>
              <p>
                <u>Done-With-You</u>: Effektive LinkedIn Kommunikation, Positionierung, aktive & direkte Kampagnen
                <br/>
                <u>Done-For-You</u>: Nach Verkaufsprinzipien optimierte Berater-Website, effizientes Back-End Retargeting, ggf. zusätzliche Paid Ads, Video-Kurs ”Berater Selbstvermarktung online” (demnächst)
              </p>
            </div>
          </div>

          <div>
            <Image name="hplp-icon-2.png"/>
            <div>
              <h4>Pocket Coach</h4>
              <p>Nehmen Sie den Experten mit an Ihre Seite. Jeder stößt regelmäßig auf Dinge, bei dem er nicht weiterkommt. Wir lassen keine Frage unbeantwortet und helfen immer so lange aus, bis Sie erfolgreich waren.</p>
            </div>
          </div>

          <div>
            <Image name="hplp-icon-3.png"/>
            <div>
              <h4>Für wen ist es?</h4>
              <p>Sie sind bereits darin erfahren, Klienten gute Ergebnisse zu erbringen und eine gute Abschlussrate zu erreichen. Außerdem ist wichtig, dass Sie von bisheriger Arbeit mit Ihrer Zielgruppe gut vertraut sind. Je  höher Ihr Customer Lifetime Value, desto mehr wirtschaftlichen Sinn macht das Programm für Sie. Siehe: ROI Rechner.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="curved-edge">
        <Image name="about-slides1-0.jpg"/>
        <div>
          <div>
            <p className="super">The Bottom Line</p>
            <h3>Fokus auf ROI.</h3>
            <p className="sub">Ein positiver ROI macht den Wert von Werbeaufwand und unseres Leadgen Programs aus.</p>
          </div>
          <p>Als natürliche Konsequenz von stetig erhöhender Nachfrage (Werbende) und einem nicht gleich schnell expandierenden Angebot (Nutzer) sind die Preise für Online-Advertising in den Auktionssystemen von Facebook und Google in den letzten Jahren signifikant angestiegen, was das Erreichen guter Rentabilität erschwert und es immer wichtiger macht, Budgets wohlüberlegt anzusetzen.</p>
        </div>
      </section>

      <section className="curved-edge curved-edge-bottom">
        <div>
          {(props.useragent.browser.name || '').includes('Safari') || props.useragent.device.type === 'mobile' ?
            <Image name="video-17.jpg"/>
          :
          <video preload="auto" playsInline autoPlay muted loop onCanPlay={(event) => {
            const v = document.getElementsByTagName('video')[0];
            if(v.paused) {
              v.poster = '/static/images/compressed/video-17.jpg';
            }
          }}>
            <source src="/static/videos/background-cut-vp9.webm" type="video/webm; codecs=vp9"/>
            <source src="/static/videos/background-cut-x264.mp4" type="video/mp4"/>
          </video>}
        </div>

        <div>
          <div>
            <p className="super">Dateninterpretation</p>
            <h3>Höhere Reichweite,<br/>geringerer CPC</h3>
            <p className="sub">Unsere Hauptaufgabe bei Blanford ist es, die Leistung von Anzeigen zu messen, mögliche Verbesserungen zu identifizieren und Wege zu finden, um Ihre Kosten pro Lead zu senken.</p>
          </div>

          <Image name="figure6.png"/>

          <div className="tabs">{[
            {
                title: "Lexikalisches Sentiment",
                text: "Bei der Sentimentanalyse urteilt der Algorithmus darüber, wie positiv und angemessen der Text Ihrer Anzeige ist. Wörter, welche negative Assoziationen oder Unbehagen im Denken des Nutzers hervorrufen können, verursachen eine Begrenzung der Reichweite der Anzeige."
            },
            {
                title: "Graphisches Sentiment",
                text: "Die graphische Analyse ist eine auf Erfahrung gestützte Schätzung, wie positiv die Zielgruppe das Bild der Anzeige aufnimmt. Facebook versucht Dinge in Bildern zu erkennen, inkl. Emotionen von Personen. Diese Faktoren beeinflussen Reichweite, Cost per Click & Relevance Score."
            },
            {
                title: "Vertrauen durch Beständigkeit",
                text: "Facebook räumt beständig aktiven Werbetreibenden Vorteile hinsichtlich der Leistung der Anzeigen ein, nicht nur, weil deren Konten voraussichtlich mehr Einnahmen bringen, sondern auch weil Beständigkeit schwer vorzutäuschen ist. Anzeigen neuer Ad Accounts verstoßen häufiger gegen Richtlinien."
            },
            {
                title: "Feedback-Faktoren ",
                text: "Sobald Besucher auf Ihre Seite kommen, fokussiert sich Facebook auf Messungen, die am meisten zur automatischen Optimierung beitragen können. Darüber hinaus wird Feedback auch als Qualitätseinschätzung der Anzeige verwendet & beeinflusst Facebooks Präferenzierung Ihrer Anzeige."
            }].map((step, index) => (
              <div key={index} className={classNames({active: stepperIndex === index})}>
                <h4>{step.title}</h4>
                <p className="neue">{step.text}</p>
              </div>
            ))}</div>

          <div className="indicator">
            <IconButton disabled={!stepperIndex} aria-label="vorheriger Text" onClick={decrementStepperIndex} color="inherit"><ChevronLeft fontSize="inherit"/></IconButton>
            <span>{stepperIndex + 1} / 4</span>
            <IconButton disabled={stepperIndex === 3} aria-label="nächster Text" onClick={incrementStepperIndex} color="inherit"><ChevronRight fontSize="inherit"/></IconButton>
          </div>

        </div>
      </section>

      <section>
        <div>
          <div>
            <ul>
              <li>
                <h4>Kenntnis</h4>
                <p>Aufmerksamkeit von Zielgruppe in einer Weise gewinnen, welche Sie für potentiellen Kunden relevant macht</p>
              </li>
              <li>
                <h4>Erwägung</h4>
                <p>Sicherstellen, dass Interessenten Sie als kompetente Option in Betracht ziehen und Ihr Angebot erwägen</p>
              </li>
              <li>
                <h4>Follow-up & Conversion</h4>
                <p>Wahrscheinlichkeit erhöhen, dass potentieller Kunde Ihr Angebot wahrnimmt und ein Klient wird</p>
              </li>
            </ul>

            <ol>
              <li>
                <h4>Kalt</h4>
                <p>Potentieller Klient weiß nichts über Sie, die Vorteile, welche er erlangen könnte, oder die Details über seine Probleme.</p>
                <p>Ihr Ziel: Erlangen Sie Aufmerksamkeit, indem Sie relevant für diese Person werden.</p>
                <p>Mögliche Lead Magnets:</p>
                <ul>
                  <li>Checklisten<small>Die ultimative Renteneinkommen-Checkliste für Chirogen</small></li>
                  <li>Anleitungen<small>3 simple Strategien für Chirogen, Gewinne um 5-17% zu erhöhen</small></li>
                  <li>Quiz<small>Wird sich Ihr Erfolg als Chirog in erfolgreichem Investieren fortsetzen?</small></li>
                </ul>
              </li>

              <li>
                <h4>Warm</h4>
                <p>Interessent realisiert, dass er ein Problem hat und dass es Lösungen hierfür gäbe, aber vertraut Ihnen nicht genug, um Sie zu konsultieren</p>
                <p>Ziel: Demonstrieren Sie Ihren Wert und Ihre Kompetenz, zu helfen.</p>
                <p>Mögliche Lead Magnets:</p>
                <ul>
                  <li>E-book<small>Das Handbuch für das Maximieren jährlicher Absätze von Chirogen</small></li>
                  <li>3-5 tägige Anleitung<small>5 Tage Renteneinkommen-Anleitung für Chirogen</small></li>
                  <li>Erweiterte Wegweiser<small>Wie Sie Cashflow-Probleme Ihrer Chirogenpraxis lösen können</small></li>
                </ul>
              </li>

              <li>
                <h4>Interessent</h4>
                <p>Der Interessent versteht sein Problem und Ihren Ablauf. Er ist bereit sich Optionen anzuhören, Ihr Klient zu werden.</p>
                <p>Ziel: Den Auftrag abschließen</p>
                <p>Mögliche Lead Magnets</p>
                <ul>
                  <li>Webinar</li>
                  <li>Video Sales Letter</li>
                  <li>Verkaufs-spezifische Webseite mit Termin-Anfrage-Tool/-Formular</li>
                </ul>
              </li>

              <li>
                <h4>Ihre Verkaufs&shy;interaktionen</h4>
              </li>

              <li>
                <h4>Kunde</h4>
              </li>
            </ol>
          </div>
        </div>
        <div>
          <div>
            <p className="super">Customer Journey</p>
            <h3>Ganzheitlicher<br/>Marketing Funnel</h3>
          </div>
          <p>Marketing-Prozesse allgemein passieren meist in mehreren Schritten, bei denen die Gesundheit des Ablaufs insgesamt wichtiger ist als dessen Bestandteile. Jeder Werbeaufwand muss mit Ihren Zielen kongruieren, um gut zu funktionieren. Beinahe niemals geht es um einen Schritt allein. Sie selbst müssen relevant sein, Vertrauen aufbauen, um dann eine Handlung zu empfehlen, durch welche Sie einen Klienten gewinnen können. Nur bekannter zu werden ist nicht genügend; niemand vertraut sein Erspartes einem Berater an nur, weil dieser die cleversten Werbeanzeigen schaltet. Sie müssen durch Interaktion mit dem Interessenten sein Zutrauen gewinnen, bevor er gewillt ist, Ihr Angebot zu hören. Ohne einen gut entworfenen Ablauf ergibt sich Ihnen wahrscheinlich nicht die Rendite, die Sie sich erhoffen.</p>
        </div>
      </section>

      <section className={classNames('curved-edge', {showArticle: showPsychologySectionContent && props.psychologyArticle})}>
        <Image name="psychology.jpg" pictureClassName="bg" className="bg"/>
        <div className="contentContainer">
          <div className="content">
            <div>
              <p className="super">Zielführende Ad Creatives</p>
              <h3>Bewährte Psychologie</h3>
              <p className="sub">Beim Schreiben von Werbetexten ist es entscheidend zu verstehen, was die Zielgruppe möchte und was die Betrachter Ihrer Anzeige von Ihrem Angebot halten werden.</p>
              <h4>Kundenbedürfnisse verstehen</h4>
              <p className="neue">Ein systematisches Schreiben von Werbetexten, die mit den Wünschen, Zielen und Absichten der Menschen in Einklang stehen, ist entscheidend, wenn Sie Menschen für Ihr Angebot gewinnen wollen. Dies erfordert das Verständnis der impliziten Beweggründe von jemandem, wenn er bei Ihnen kauft.</p>
              <h4>Kontrastierung mit anderen Anzeigen</h4>
              <p className="neue">Als nächstes sollten Sie sicherstellen, dass Ihr Angebot interessant und unverfälscht erscheint. Um vorherzusagen, wie ein Benutzer Ihre Anzeige wahrnimmt, sollten gut recherchiert sein, wie viele ähnliche Anzeigen er bereits gesehen hat und wie hochwertig diese Anzeigen waren.</p>
              {props.psychologyArticle.length ? <Button onClick={togglePsychologySectionContent}>{showPsychologySectionContent ? "< Weniger anzeigen" : "Beispiele aus David Ogilvys “Financial Advertising That Sells” Anzeige >"}</Button> : null}
            </div>
            <div className="article">{props.psychologyArticle}</div>
          </div>
        </div>
      </section>

      <section>
        <Image name="stats-curved.png"/>
        <div>
          <div>
            <p className="super">Direkte Verwaltung online</p>
            <h3>Nicht all zu viel Zeit?<br/>Kein Problem</h3>
          </div>
          <p className="shorter">In Ihrem Dashboard erhalten Sie Zugriff auf all Ihre letztendlichen Metriken, sowie Einschätzungen und Hintergründe über aktuelle Angelegenheiten.</p>
        </div>
      </section>

      <section>
        {[
            [
          "Scientific Advertising",
          "Profitieren Sie von etablierten Methoden & bewährten Strategien",
          "Eine der wichtigsten Konzepte, welche ein Werbetreibender verstehen sollte, ist, dass sich Kundenverhalten wie eine fraktale Struktur selbst wiederholt; kennt man das Verhalten von wenigen Tausenden, kennt man oftmals das Verhalten von Millionen. Der primäre Erfolgsfaktor in Advertising, welcher auch für Sie gilt, ist, seinen Kunden zu kennen. Wenn man dies tut, lässt sich ein Lead signifikant kosteneffizienter generieren, als es für Ihre Wettbewerber der Fall ist. Durch unseren Fokus auf Finanzberaterkunden verbessern wir unser Verständnis von Kunden und dem idealen Ad mit jeder Version."
            ],
            [
          "LinkedIn",
          "Generieren Sie mehr Leads via LinkedIn",
          "LinkedIn Networking ist für Finanzberater ebenfalls eine lohnenswerte Zeitinvestition, bei der sich einige Fragen auftun. Wie und wem sollten Sie sich am besten präsentieren? Mit welchen Schritten genau sollten Sie täglich ein wenig Zeit auf LinkedIn verbringen? Wir einen zusätzlichen Fokus auf das Identifizieren der erfolgreichsten Praktiken und Ansätze gelegt, damit Sie mit LinkedIn erfolgreicher sein können."
            ],
            [
          "Welcome to the Machine",
          "Verständnis der algorithmischen Umgebung & weshalb  Praktiken funktionieren",
          "Der überraschendste Fakt über Facebook Advertising ist, dass meisten Werbetreibenden nach langer Erfahrung die Dynamiken der Plattform zwar nicht mehr zufällig vorkommen, sie aber trotzdem nicht grundlegend verstanden werden. Wer versteht, weshalb ein exaktes Duplikat einer rentablen Anzeige plötzlich unrentabel ist, kann nicht nur ein Empire aus rentablen Anzeigen aufbauen, sondern jede einzelne Anzeige auch länger schalten als andere Werbetreibende (in einzelnen Fällen jahrelang)."
            ],
            [
          "Fundament & Ausrichtung",
          "80% des Aufwands kommt vor dem Erstellen der ersten Kampagne",
          "Digitales Advertising und die Disziplin des Werbens allgemein sind nicht verschieden, lediglich die Form der Präsentation gebietet einige Unterschiede. Es ermöglicht jedoch, die Möglichkeit eines Verlusts zu minimieren und Anzeigen einfach zu testen. Die Übung ist jedoch immer noch eine psychologische Disziplin und der Erfolg darin zum größten Teil abhängig vom Wissen über Ihren Kunden und kongruenter Ausrichtung."
            ]
          ].map((item, index) => (
            <div key={index} id={index === 1 ? 'linkedin' : null}>
              <Image name={'ppc-group' + index + '.png'}/>
              <div className="text">
                <p className="super">{item[0]}</p>
                <h3>{item[1]}</h3>
                <p>{item[2]}</p>
              </div>
            </div>
          ))}
      </section>

      <CalcSection padding/>

      <section>
        <div className="container">
          <Image name="mobile-chat.png"/>
          <div>
            <h3>Wir sind persönlich für Sie da.</h3>

            <ButtonBase href="https://www.linkedin.com/in/blanford-finanzberater" target="_blank">
              <Image name="jakob.png"/>
              <div>
                <h4>Jakob Jaworski</h4>
                {/*<Image name="linkedin-premium.png"/>*/}
                <p>Project Management</p>
                <small>Oldenburg, NI</small>
              </div>
            </ButtonBase>

            <ButtonBase disabled>
              <Image name="moritz.jpg"/>
              <div>
                <h4>Moritz Scheele</h4>
                <p>Co-Admin, <small>(Spez.: "Web engineering")</small></p>
                <small>Uni Hamburg</small>
              </div>
            </ButtonBase>

            <ButtonBase disabled>
              <GroupIcon/>
              <div>
                <h4>Ggf. Blanford Team</h4>
                <p>Partner, verschiedene Spezialisierungen</p>
                <small>Remote;</small>
              </div>
            </ButtonBase>
          </div>
        </div>
      </section>

      <section className="container">
        <h3>Häufig gestellte Fragen</h3>
        <div>
          <ButtonBase href={FAQPath + '/about-1'}>Welche Dinge muss ich selbst tun?</ButtonBase>
          <ButtonBase href={FAQPath + '/about-1'}>Was genau ist in unseren Dienstleistungen enthalten?</ButtonBase>
          <ButtonBase href={FAQPath + '/coop-0'}>Wie läuft die Absprache & Evaluation vor der Zusammenarbeit ab?</ButtonBase>
          <ButtonBase href={FAQPath + '/begin-3'}>Weshalb zuerst einen Account erstellen?</ButtonBase>
        </div>
      </section>

      <section>
        <Image name="about-signup-bg.jpg" className="bg"/>
        <div className="container">
          <h3>Probieren Sie Blanford.de kostenlos</h3>
          <div>
            Bewerben auf das <BrandName inline/> Beta Program bietet die Chance einer unentgeltlichen Zusammenarbeit für 1-2 Monate.
          </div>
          <SignUp>
            <input type="email" autoComplete="email" placeholder="E-Mail" name="email" required/>
            <input type="password" autoComplete="new-password" placeholder="Passwort wählen" name="password" required/>
            <Button type="submit">Jetzt loslegen</Button>
          </SignUp>
          <small>Nutzerkonto unverbindlich und kostenlos. Leitet Sie direkt zu unserem Fragebogen weiter. Sie klären sich dazu bereit, E-Mails relevant für die Verwaltung Ihres Nutzerkontos zu erhalten.</small>
        </div>
      </section>
    </div>
  );
}

export default connect(({useragent, routes, blogArticles}) => ({
  useragent,
  routes: routes.homepage,
  psychologyArticle: articleContentToHTML(((blogArticles || []).find((article) => article.id === 'J2Uz8a2WNCjddbxAKg4w') || {content: []}).content)
}))(LeadgenSections);
