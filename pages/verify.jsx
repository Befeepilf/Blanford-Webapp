import React from 'react';
import {useRouter} from 'next/router';
import VerifyLoginMessageScreen from '../components/VerifyLoginMessageScreen.jsx';


export default function EmailVerification(props) {
  function translateMessage(msg) {
    switch(decodeURIComponent(msg)) {
      case 'Your email was verified. You can continue using the application.':
        return "Ihre E-Mail-Adresse wurde bestätigt.";
      case 'This URL can be used only once':
        return "Dieser Link kann nur einmal verwendet werden.";
      case 'Access expired.':
        return "Dieser Link ist abgelaufen.";
      case 'This account is already verified.':
        return "Dieser Account wurde bereits verifiziert.";
      default:
        return "Dieser Verifizierungslink ist ungültig.";
    }
  }

  const router = useRouter();
  return(
    <VerifyLoginMessageScreen
      countdown
      actionLabel="Zum Dashboard"
      action={() => {router.replace('/d')}}
      state={router.query.success === 'true' ? 'success' : 'error'}
      message={translateMessage(router.query.message)}
    />);
}
