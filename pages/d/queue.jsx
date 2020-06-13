import React from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';
import {makeStyles} from '@material-ui/core/styles';
import Router from 'next/router';
import EventAvailableIcon from '@material-ui/icons/EventAvailableOutlined';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import AddCommentIcon from '@material-ui/icons/AddComment';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import deLocale from 'date-fns/locale/de';
import formatDistance from 'date-fns/formatDistance';
import format from 'date-fns/format';
import Layout from '../../components/Dashboard/Layout.jsx';
import LoadingContainer from '../../components/Dashboard/LoadingContainer.jsx';


const useStyles = makeStyles({
  ad: {
    '&:hovered $ openThreadButtonContainer': {
      opacity: 1
    }
  },
  openThreadButtonContainer: {
    opacity: 0
  }
});
function Queue(props) {
  const [isOpeningThread, setIsOpeningThread] = React.useState(false);

  function onThreadButtonClick(ad) {
    if(ad.threadId) {
      Router.push('/threads#' + ad.threadId);
    }
    else {
      const onError = (error) => {
        props.dispatch({type: 'SET', data: {notification: error.message}});
        setIsOpeningThread(false);
      }

      props.firestore.collection(`users/${props.userId}/threads`).add({title: props.title, updatedAt: new Date().getTime()}).then((doc) => {
        props.firestore.doc(`users/${props.userId}/ads/${add.id}`).update({threadId: doc.id}).then(() => {
          setIsOpeningThread(false);
          Route.push('/threads#' + doc.id);
        }).catch(onError);
      }).catch(onError);
    }
  }

  function getContent() {
    return(
      <div className="main table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th scope="col"><Typography variat="body2"><strong>Kampagne, Werbeset, Werbeanzeige</strong></Typography></th>
              <th scope="col"><Typography variat="body2"><strong>Laufzeit (Start - Ende)</strong></Typography></th>
              <th scope="col"><Typography variat="body2"><strong>Vorschau</strong></Typography></th>
              <th scope="col"><Typography variat="body2"><strong>Status</strong></Typography></th>
              <th scope="col"><Typography variat="body2"><strong>Notizen</strong></Typography></th>
            </tr>
          </thead>
          <tbody>
            {props.ads.map((ad, index) => {
                const start = new Date(ad.start);
                const end = new Date(ad.end);
                return(
                  <tr className={classes.ad}>
                    <td style={{width: '22%', cursor: 'pointer'}}><Typography variant="body2">{ad.name}</Typography></td>
                    <td style={{width: '20%'}}>
                      <Typography variant="body2" align="center" className={classes.tdText}>
                        {format(start, 'MMM dd, y', {locale: deLocale})} - {format(end, 'MMM dd, y', {locale: deLocale})}
                        <br/>
                        (noch {formatDistance(start, end, {locale: deLocale})})
                      </Typography>
                    </td>
                    <td style={{width: '8.67%'}}><img src={ad.previewImage}/></td>
                    <td style={{width: '8.67%'}}>{ad.experimental ? <Typography variant="body2" align="center" className="experimental">Experimentell</Typography> : null}</td>
                    <td style={{width: '33%', textAlign: 'justify'}}><Typography variant="body2" className={classes.tdText} color={ad.hovered ? "textPrimary" : "textSecondary"}>{ad.note}</Typography></td>
                    <td>
                      <Tooltip title={add.threadId ? "Zum zugehörigen Thread wechseln" : "Neuen Thread eröffnen"} className={classes.openThreadButtonContainer}>
                        <IconButton disabled={isOpeningThread} onClick={() => {onThreadButtonClick(ad)}}>{add.threadId ? <QuestionAnswerIcon fontSize="inherit"/> : <AddCommentIcon fontSize="inherit"/>}</IconButton>
                      </Tooltip>
                    </td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </div>
    );
  }

  const classes = useStyles();
  return(
    <LoadingContainer
      noDataIcon={<EventAvailableIcon/>}
      noDataTitle="Keine Anzeigen in Planung"
      isLoading={!props.ads && props.firestore !== null}
      hasData={Boolean(props.ads && props.ads.length)}
      getContent={getContent}
    />
  );
}

export default connect(({firestore, ads, profile}) => ({firestore, ads, userId: profile.user_id}))(props => <Layout id="Queue"><Queue {...props}/></Layout>);
