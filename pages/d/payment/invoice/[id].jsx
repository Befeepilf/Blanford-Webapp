import React from 'react';
import {connect} from 'react-redux';
import {useRouter} from 'next/router';
import deLocale from 'date-fns/locale/de';
import format from 'date-fns/format';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

import Layout from '../../../../components/Dashboard/Layout.jsx';
import '../../../../styles/Dashboard/PaymentInvoice.scss';


function Invoice(props) {
  const router = useRouter();
  const invoice = props.invoices ? props.invoices.find(({id}) => id === router.query.id) : undefined;

  return(
    <Layout id={'PaymentInvoice' + (invoice ? invoice.id : 0)}>
      <div id="PaymentInvoice">
        {props.invoices ?
          invoice ?
            <div>
              <div className="grid">
                <div className="dataField" style={{borderTop: '1px solid #ccc', borderBottom: '1px solid #ccc'}}>
                  <Typography className="title" variant="caption">Auftragsabwicklung über</Typography>
                  <Typography className="value">blanford.de</Typography>
                </div>
                <div className="dataField" style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderTop: '2px solid #666', borderBottom: '2px solid #666'}}>
                  <div>
                    <Typography className="title" variant="caption">Order number</Typography>
                    <Typography className="value"><strong>{invoice.number}</strong></Typography>
                  </div>
                  <div>
                    <Typography className="title" variant="caption">Abrechnungsdatum</Typography>
                    <Typography className="value"><strong>{format(new Date(1000 * invoice.created), 'LLLL dd, yyyy', {locale: deLocale})}</strong></Typography>
                  </div>
                </div>

                <div className="side">
                  {invoice.invoice_pdf ?
                    [
                      <Typography key={0} variant="h6" component="h3">Aufbewahrung</Typography>,
                      <Typography key={1} color="textSecondary">
                        <a target="_blank" href={invoice.invoice_pdf}><u>Rechnung als PDF ansehen</u></a>
                      </Typography>
                    ]
                  :
                    null
                  }

                  <Typography variant="h6" component="h3">Support</Typography>
                  <Typography color="textSecondary">Sehen Sie einen Fehler oder gibt es ein Problem?</Typography>
                  <Typography color="textSecondary">
                    <a href="mailto:support@blanford.de"><u>Support kontaktieren</u></a>
                  </Typography>

                  <Typography variant="h6" component="h3">Orientierung</Typography>
                  <Typography color="textSecondary">Wenn Sie Hilfe benötigen weiter zu verfahren, prüfen Sie die Hinweise im "Home" Tab oder kontaktieren Sie uns unter "Kontakt".</Typography>
                </div>

                <div className="dataField" style={{borderBottom: '1px solid #ccc'}}>
                  <Typography className="title" variant="caption">Zahlungsmethode</Typography>
                  {invoice.charge ?
                    <Typography className="value">{invoice.charge.source.brand} <small>endet mit {invoice.charge.source.last4}</small></Typography>
                  :
                  <Typography className="value">-</Typography>
                  }
                </div>
                <div className="dataField" style={{borderBottom: '1px solid #ccc'}}>
                  <Typography className="title" variant="caption">Status</Typography>
                  <Typography className="value"><strong>{invoice.status}</strong></Typography>
                </div>

                <div className="titleField">
                  <Typography variant="h5" component="h4">Aussteller</Typography>
                </div>
                <div className="titleField">
                  <Typography variant="h5" component="h4">Leistungsempfänger</Typography>
                </div>

                <address>
                  <Typography>
                    <strong>
                      Jakob Jaworski
                      <br/>
                      jaworskijakob@aol.de
                      <br/>
                      Blue Logan UG (haftungsbeschränkt)
                    </strong>
                  </Typography>
                  <Typography>
                    Otterweg 56
                    <br/>
                    Oldenburg, Niedersachsen 26123 Germany
                    <br/>
                    64/214/02341
                  </Typography>
                </address>
                <address>
                  <Typography>
                    <strong>
                      Jakob Jaworski
                      <br/>
                      jaworskijakob@aol.de
                      <br/>
                      Blue Logan UG (haftungsbeschränkt)
                    </strong>
                  </Typography>
                  <Typography>
                    Otterweg 56
                    <br/>
                    Oldenburg, Niedersachsen 26123 Germany
                    <br/>
                    +491578923465
                  </Typography>
                </address>

                <div className="titleField" style={{gridColumn: '1 / 3'}}>
                  <Typography variant="h5" component="h4">Your order</Typography>
                </div>
                <div className="lines">
                  {invoice.lines.data.map((line, index) => (
                    <div key={index} className="dataField">
                      <div>
                        <Typography><strong>{line.plan ? line.plan.product.name : line.description}</strong></Typography>
                        <Typography><small>{line.subscription ? `Dienstvertrag Monat-zu-Monat Pauschale von ${format(new Date(1000 * line.subscription.current_period_start), 'LLL. yyyy', {locale: deLocale})} bis ${format(new Date(1000 * line.subscription.current_period_end), 'LLL. yyyy', {locale: deLocale})}` : "einmalig"}</small></Typography>
                      </div>
                      <Typography>€ {(line.amount / 100).toFixed(2)}</Typography>
                    </div>
                  ))}
                </div>

                <div className="total">
                  {invoice.discount ?
                    [
                      <div key={0}>
                        <Typography>Subtotal</Typography>
                        <Typography>€ {(invoice.subtotal / 100).toFixed(2)}</Typography>
                      </div>,
                    <div key={1}>
                      <Typography>Rabatt</Typography>
                      <Typography>{invoice.discount.coupon.amount_off ? `- € ${(invoice.discount.coupon.amount_off / 100).toFixed(2)}` : invoice.discount.coupon.percent_off + '%'}</Typography>
                    </div>
                    ]
                  : null}
                  <div>
                    <Typography><strong>Total</strong></Typography>
                    <Typography><small className="currency">{invoice.currency}</small> <strong>€ {(invoice.amount_due / 100).toFixed(2)}</strong></Typography>
                  </div>
                </div>
              </div>
            </div>
          :
          <div className="center">
            <Typography variant="h5" component="p">Diese Rechnung existiert nicht.</Typography>
          </div>
        :
        <div className="center">
          <CircularProgress/>
        </div>
        }
      </div>
    </Layout>
  );
}


export default connect(({invoices}) => ({
  invoices: invoices ? invoices.data : undefined
}))(Invoice);
