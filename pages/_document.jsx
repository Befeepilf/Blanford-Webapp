import Document, {Html, Head, Main, NextScript} from 'next/document';

export default class BlanfordDocument extends Document {
  render() {
    return(
      <Html lang="de">
        <Head>
          <meta name="Description" content="Digitale Prozesse & Systeme für Finanzberater, Finanzplaner, Versicherungsmakler & Vermögensverwalter"/>
          <meta charSet="UTF-8"/>
          <meta httpEquiv="X-UA-Compatible" content="ie=edge"/>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no"/>
          <meta name="apple-mobile-web-app-status-bar-style" content="black"/>

          <link rel="manifest" href="/static/manifest.json"/>
          <link rel="shortcut icon" type="image/png" href="/static/favicon-192.png"/>

          <script id="stripe-js" src="https://js.stripe.com/v3/" async></script>
          <script async src="https://www.googletagmanager.com/gtag/js?id=UA-134055495-1"></script>
          <script dangerouslySetInnerHTML={{__html: `
            if(document.cookie.match(/disableAnalytics=1/)) {
              window['ga-disable-UA-134055495-1'] = true;
            }
            else {
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'UA-134055495-1', {'anonymize_ip': true, 'custom_map': {'dimension1': 'networkStatus'}});
              gtag('event', 'set-network-status', {'networkStatus': 'online'});
            }
          `}}/>
        </Head>

        <body>
          <Main/>
          <NextScript/>
        </body>
      </Html>
    );
  }
}
