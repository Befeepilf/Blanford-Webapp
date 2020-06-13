import {request} from './API.js';

export default class Stripe {
  constructor(Store) {
    this.apiKey = 'pk_live_YcY1qQo74vM0aV1lvlXjIGhI';
    this.Store = Store;
    this.Store.dispatch({type: 'SET', data: {stripe: this}});
  }

  getCustomer() {
    request('/stripe/customer', 'GET', {json: true}, (error, result) => {
      this.Store.dispatch({type: 'SET', data: {stripeCustomer: error || !result ? null : result}});
    });
  }

  getInvoices(args, cb) {
    request('/stripe/invoices', 'GET', {json: true, body: args}, (error, invoices) => {
      this.Store.dispatch({type: 'SET', data: {invoices: error || !invoices ? null : invoices}});
      if(typeof cb === 'function') {
        cb(error, invoices);
      }
    });
  }

  getProducts() {
    request('/stripe/products', 'GET', {json: true}, (error, products) => {
      if(!error) {
        this.Store.dispatch({type: 'SET', data: {products: products.data}});
      }
    });
  }

  createSubscription(productId, cb) {
    request('/stripe/subscription', 'POST', {json: true, body: {productId}}, (error, subscription) => {
      if(!error) {
        this.Store.dispatch({type: 'ADD_SUBSCRIPTION', subscription});
        if(subscription.plan.id === 'plan_F4WWyow8u0KJdi') {
          this.Store.dispatch({type: 'SET', data: {profile: {app_metadata: {isBetaTester: true}}}});
        }
      }
      else {
        this.replaceErrorMessage(error);
      }
      cb(error, subscription);
    });
  }

  replaceErrorMessage(error) {
    if(error.code === 'invalid_expiry_year' || error.code === 'invalid_expiry_month' || (error.code === 'card_declined' && error.raw.decline_code === 'invalid_expiry_year')) {
      error.message = "Das Ablaufdatum ist nicht korrekt. Überprüfen Sie die eingegebenen Karteninformationen und versuchen Sie es erneut.";
    }
    else if(error.code === 'expired_card' || (error.code === 'card_declined' && error.raw.decline_code === 'expired_card')) {
      error.message = "Dies Kreditkarte ist nicht mehr gültig. Verwenden Sie eine andere Karte.";
    }
    else if(error.code === 'card_declined' && error.raw.decline_code === 'insufficient_funds') {
      error.message = "Ihr Konto hat nicht genügend Guthaben.";
    }
    else if (error.code === 'invalid_cvc' || error.code === 'incorrect_cvc' || (error.code === 'card_declined' && (error.raw.decline_code === 'invalid_cvc' || error.raw.decline_code === 'incorrect_cvc'))) {
      error.message = "Der CVC ist nicht korrekt. Überprüfen Sie die eingegebenen Karteninformationen und versuchen Sie es erneut.";
    }
    else if(error.code === 'card_declined') {
      const c = error.raw ? error.raw.decline_code : null;

      if(c === 'try_again_later' || c === 'processing_error') {
        error.message = "Die Karteninformationen konnten nicht verarbeitet werden. Versuchen Sie es erneut.";
      }
      else if(c === 'testmode_declinde') {
        error.message = "Sie haben eine Stripe-Testkarte verwendet. Nutzen Sie eine echte Kreditkarte.";
      }
      else if(c === 'issuer_not_available') {
        error.message = "Der Kartenaussteller konnte nicht erreicht werden. Versuchen Sie es erneut oder kontaktieren Sie Ihren Kartenaussteller.";
      }
      else if(c === 'invalid_number' || c === 'incorrect_number') {
        error.message = "Die Kartennummer ist nicht korrekt. Überprüfen Sie die eingegebenen Karteninformationen und versuchen Sie es erneut.";
      }
      // customer should contact card issuer; affected codes:
      // do_not_honor, call_issuer, do_not_try_again, generic_decline, no_action_taken, revocation_of_all_authorization, revocation_of_authorization, security_violation, service_not_allowed, stop_payment_order, transaction_not_allowed
      else {
        error.message = "Die Kreditkarte wurde aus einem unbekannten Grund abgelehnt. Überprüfen Sie die eingegebenen Karteninformationen oder kontaktieren Sie Ihren Kartenaussteller.";
      }
    }
  }

  addSource(sourceId, cb) {
    request('/stripe/source', 'POST', {json: true, body: {sourceId}}, (error, source) => {
      if(error) {
        this.replaceErrorMessage(error);
      }
      else {
        this.Store.dispatch({type: 'ADD_PAYMENT_METHOD', paymentMethod: source});
      }
      if(typeof cb === 'function') {
        cb(error, source);
      }
    });
  }

  updateCard(cardId, data, cb) {
    request('/stripe/card', 'PATCH', {json: true, body: {cardId, ...data}}, (error, result) => {
      if(!error) {
        if(result.object === 'customer') {
          this.Store.dispatch({type: 'SET', data: {stripeCustomer: result}});
        }
        else if(result.object === 'card') {
          this.Store.dispatch({type: 'UPDATE_PAYMENT_CARD', method: result});
        }
      }
      else {
        this.replaceErrorMessage(error);
      }
      if(typeof cb === 'function') {
        cb(error, result);
      }
    });
  }

  removeCard(cardId, cb) {
    request('/stripe/card', 'DELETE', {json: true, body: {cardId}}, (error, result) => {
      if(!error && result.deleted) {
        this.Store.dispatch({type: 'REMOVE_PAYMENT_METHOD', id: result.id});
      }
      if(typeof cb === 'function') {
        cb(error, result);
      }
    });
  }
}
