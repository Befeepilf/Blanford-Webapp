import React from 'react';
import {connect} from 'react-redux';
import {makeStyles} from '@material-ui/styles';
import classNames from 'classnames';
import format from 'date-fns/format';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import InputAdornment from '@material-ui/core/InputAdornment';
import ButtonBase from '@material-ui/core/ButtonBase';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import ErrorIcon from '@material-ui/icons/Error';
import SpeakerNotesOffIcon from '@material-ui/icons/SpeakerNotesOff';
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';
import UnfoldLessIcon from '@material-ui/icons/UnfoldLess';
import Emoji from 'react-emoji-render';
import LoadingContainer from './Dashboard/LoadingContainer.jsx';
import NoData from './Dashboard/NoData.jsx';
import ThreadInput from './ThreadInput.jsx';
import {convertFileSize} from '../Util.js';


const useStyles = makeStyles(theme => {
  const dark = theme.palette.type === 'dark';
  return {
    root: {
      display: 'flex',
      flexDirection: 'column',
      paddingTop: 14,
      [theme.breakpoints.up('md')]: {
        paddingTop: 21
      }
    },
    loadingContainer: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      '&.absolute': {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        zIndex: -1,
        opacity: 0,
        transition: 'all 0.3s',
        '&.loading': {
          zIndex: 1,
          opacity: 0.8
        }
      }
    },
    errorIcon: {
      marginBottom: 14,
      fontSize: 40,
      color: 'red'
    },
    addChannelButton: {
      alignSelf: 'center',
      '& svg': {
        marginRight: 14
      }
    },
    customNavBarAddButton: {
      color: theme.palette.text.secondary
    },
    section: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      marginBottom: 56,
      transition: 'all 0.3s',
      '&.fullscreen': {
        flex: 1,
        padding: 0,
        margin: 0
      },
      '&.fullscreen $threadTitle, &.fullscreen $fullscreenButton': {
        display: 'none'
      },
      '&.fullscreen $paper': {
        maxHeight: '100%',
        margin: 0
      },
      '&.active': {
        flex: 1,
        margin: 0
      },
      '&.active $threadTitle': {
        marginBottom: -21,
        transform: 'translate(21px, 7px)'
      },
      '&.active $paper': {
        maxHeight: '100%',
        marginTop: 0
      },
      '&.hide': {
        maxHeight: 0,
        padding: 0,
        margin: 0,
        opacity: 0,
        overflow: 'hidden'
      },
      '&:first-child $paper': {
        paddingTop: 21
      },
      '&.loading $loadingContainer': {
        zIndex: 1,
        opacity: 0.8
      },
      '& $loadingContainer': {
        flex: 1,
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        zIndex: -1,
        opacity: 0,
        transition: 'all 0.3s'
      },
      [theme.breakpoints.down('sm')]: {
        '&.active $paper': {
          paddingLeft: 0,
          paddingRight: 0,
          paddingBottom: 0,
          background: 'none',
          boxShadow: 'none',
          '& > :nth-child(2)': {
            paddingRight: 0
          }
        }
      }
    },
    paper: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'flex-end',
      position: 'relative',
      minHeight: 140,
      maxHeight: 700,
      padding: [[42, 21, 21, 21]],
      marginTop: 14,
      borderRadius: 14,
      // overflow: 'hidden',
      transition: 'all 0.3s'
    },
    titleInput: {
      padding: [[4, 14, 3, 14]],
      marginBottom: 56,
      border: '1px solid ' + theme.palette.text.disabled,
      borderRadius: 5,
      transition: 'all 0.3s',
      '&.error': {
        borderColor: 'red'
      }
    },
    threadTitle: {
      zIndex: 1,
      fontFamily: "'Gotham A', 'Gotham B', sans-serif",
      fontWeight: 500,
      letterSpacing: 0,
      transition: 'all 0.3s'
    },
    messages: {
      width: '100%',
      overflowY: 'auto',
      [theme.breakpoints.down('sm')]: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start'
      }
    },
    message: {
      display: 'flex',
      width: '100%',
      paddingRight: 21,
      marginBottom: 10,
      overflow: 'hidden',
      '&.hasAttachments':  {
        marginBottom: 28,
        marginTop: 7
      },
      [theme.breakpoints.down('sm')]: {
        position: 'relative',
        width: 'auto',
        padding: [[7, 10]],
        backgroundColor: '#303030',
        borderRadius: 14,
        '&.withPointer': {
          '&:not(.me)': {
            borderTopLeftRadius: 0
          },
          '&.me': {
            borderTopRightRadius: 0
          }
        },
        '&.me': {
          alignSelf: 'flex-end',
          backgroundColor: 'royalblue'
        }
      }
    },
    messageMetadata: {
      display: 'flex',
      marginRight: 7,
      marginTop: 5,
      '& > *': {
        marginRight: 7,
        color: theme.palette.text.disabled,
        '&:first-child': {
        }
      },
      [theme.breakpoints.down('sm')]: {
        display: 'none'
      }
    },
    messageContent: {
      flex: 1,
      overflow: 'hidden',
      '& p': {
        fontSize: 14
      },
      [theme.breakpoints.up('md')]: {
        '& p': {
          fontSize: '0.9375rem'
        }
      }
    },
    attachments: {
      width: '100%',
      columnCount: 1,
      marginBottom: 14,
      '& img, & video': {
        maxWidth: 420,
        maxHeight: 560
      },
      '& img':{
        objectFit: 'contain'
      },
      '@media (min-width: 1200px)': {
        columnCount: 2
      }
    },
    attachmentNonMedia: {
      display: 'inline-flex',
      alignItems: 'center',
      width: 'auto',
      padding: 14,
      border: '1px solid ' + theme.palette.text.disabled,
      borderRadius: 5,
      '& svg': {
        marginRight: 7,
        fontSize: 30
      }
    },
    fullscreenButton: {
      position: 'absolute',
      top: 0,
      right: 0,
      zIndex: 1
    }
  }
});

function ThreadsOverview(props) {
  const [isAddingThread, setIsAddingThread] = React.useState(false);
  const [addingChannelDialogOpen, setAddingChannelDialogOpen] = React.useState(false);
  const [isAddingChannel, setIsAddingChannel] = React.useState(false);
  const [newChannelTitle, setNewChannelTitle] = React.useState("");
  const [addingThreadError, setAddingThreadError] = React.useState();
  const [newThreadTitle, setNewThreadTitle] = React.useState({value: "", error: false});
  const [newThreadMessage, setNewThreadMessage] = React.useState(null);
  const [activeChannelId, setActiveChannelId] = React.useState();
  const [activeThreadId, setActiveThreadId] = React.useState();


  React.useEffect(() => {
    if(addingThreadError) {
      const timeout = setTimeout(() => {
        setIsAddingThread(false);
        setAddingThreadError(null);
      }, 2000);

      return () => {
        clearTimeout(timeout);
      }
    }
  }, [addingThreadError])

  React.useEffect(() => {
    if(props.channels && props.channels.length) {
      let newActiveChannel;
      if(!activeChannelId || (activeChannelId && !props.channels.find(channel => channel.id === activeChannelId))) {
        newActiveChannel = 'overview';
        setActiveChannelIdWrapper(newActiveChannel);
      }
      setCustomNavBar(newActiveChannel);
    }
    else if(!props.channels || (props.channels && !props.channels.length)) {
      setCustomNavBar();
    }
  }, [props.channels]);

  React.useEffect(() => {
    setCustomNavBar();
    // props.dispatch({type: 'SET', data: {ui: {customNavBar: {activeTab: activeChannelId}}}});
  }, [activeChannelId]);

  React.useEffect(() => {
    const query = {};
    (window.location.search || '').slice(1).split('&').forEach(param => {
      param = param.split('=');
      query[param[0]] = param[1];
    });

    if(query.channel) {
      setActiveChannelIdWrapper(query.channel);
    }
    if(query.thread) {
      setActiveThreadId(query.thread);
    }

    return () => {
      props.dispatch({type: 'SET', data: {ui: {customNavBar: null}}});
    };
  }, []);

  function setActiveChannelIdWrapper(channelId) {
    setActiveChannelId(channelId);
    setActiveThreadId(null);
  }

  function setActiveThreadIdWrapper(threadId) {
    setActiveThreadId(activeThreadId === threadId ? null : threadId);
  }

  function setCustomNavBar(activeTab) {
    const tabs = (props.channels && props.channels.length ? [{label: "Überblick", value: 'overview'}] : []).concat((props.channels || []).map(channel => ({
      label: channel.title,
      value: channel.id
    })).concat([{label: "Channel", icon: <AddIcon/>, value: 'add', className: classes.customNavBarAddButton}]));

    activeTab = activeTab === undefined ? activeChannelId : activeTab;

    props.dispatch({type: 'SET', data: {ui: {customNavBar: {
      activeTab: tabs.find(tab => tab.value === activeTab) ? activeTab : tabs[0].value,
      onChange: (event, value) => {
        if(value === 'add') {
          setAddingChannelDialogOpen(true);
        }
        else {
          setActiveChannelIdWrapper(value);
        }
      },
      tabs
    }}}});
  }

  function setNewThreadTitleWrapper(event) {
    setNewThreadTitle({value: event.target.value, error: event.target.value.length ? false : newThreadTitle.error});
  }

  function createNewChannel() {
    setIsAddingChannel(true);
    props.firestore.collection('users/' + props.userId + '/channels').add({title: newChannelTitle, hasThreads: false}).then(doc => {
      setIsAddingChannel(false);
      setAddingChannelDialogOpen(false);
      setNewChannelTitle("");
      setActiveChannelIdWrapper(doc.id);
    }).catch(error => {
      setIsAddingChannel(false);
      props.dispatch({type: 'SET', data: {notification: error.message}});
    });
  }

  function createNewThread(msg, attachments) {
    if(!newThreadTitle.value.length) {
      setNewThreadTitle(Object.assign({}, newThreadTitle, {error: true}));
    }
    else {
      setIsAddingThread(true);
      props.firestore.collection('users/' + props.userId + '/channels/' + activeChannelId + '/threads').add({title: newThreadTitle.value, updatedAt: new Date().getTime()}).then((doc) => {
        if(msg) {
          doc.collection('messages').add({
            sender: props.sender,
            timestamp: new Date().getTime(),
            text: msg,
            attachments
          }).then((doc2) => {
            setNewThreadTitle({value: "", error: false});
            setIsAddingThread(false);
            setAddingThreadError(null);
          }).catch((error) => {
            setNewThreadTitle({value: "", error: false});
            setIsAddingThread(false);
            setAddingThreadError(null);
            props.dispatch({type: 'SET', data: {notification: error.message}});
          });
        }
        else {
          setNewThreadTitle({value: "", error: false});
          setIsAddingThread(false);
          setAddingThreadError(null);
        }
      }).catch((error) => {
        setAddingThreadError(error.message);
      });
    }
  }

  function sendMessage(channelId, threadId, msg, attachments) {
    props.firestore.collection(`users/${props.userId}/channels/${channelId}${threadId ? '/threads/' + threadId : ''}/messages`).add({
      sender: props.sender,
      timestamp: new Date().getTime(),
      text: msg,
      attachments
    }).then((doc) => {});
  }

  function Thread(thread) {
    return(
      <section
        key={thread.id}
        className={classNames(classes.section, {loading: !thread.messages, active: activeThreadId === thread.id, hide: activeThreadId && activeThreadId !== thread.id, fullscreen: typeof thread.hasThreads === 'boolean' && !thread.hasThreads})}
        style={activeThreadId === thread.id ? {} : {height: 'auto'}}
      >
        <Typography component="h3" className={classes.threadTitle}>{thread.title}</Typography>
        <Paper className={classes.paper}>
          {thread.messages ?
            <div className={classes.messages}>
              {thread.messages.map((msg, index) => (
                <div key={msg.id} className={classNames(classes.message, {
                    hasAttachments: msg.attachments.length,
                    me: msg.sender === props.sender,
                    withPointer: !(index > 0 && thread.messages[index - 1].sender === msg.sender)
                  })}>
                  <div className={classes.messageMetadata}>
                    <Typography variant="caption" color="textSecondary">{format(new Date(msg.timestamp), 'MMM dd')}</Typography>
                    <Typography variant="caption" color="textSecondary"><strong>{msg.sender === props.sender ? "Me" : props.admin ? "Klient" : "Team"}</strong></Typography>
                  </div>
                  <div className={classes.messageContent}>
                    {msg.attachments.length ?
                      <div className={classes.attachments}>
                        {msg.attachments.map((attachment) => {
                          const mime = attachment.type;
                          if(mime.startsWith('image')) {
                            return <img key={attachment.name} title={attachment.name} alt={attachment.name} src={attachment.url}/>
                          }
                          else if(mime.startsWith('video')) {
                            return <video key={attachment.name} title={attachment.name} src={attachment.url} controls/>
                          }
                          else {
                            return(
                              <a key={attachment.name} className={classes.attachmentNonMedia} href={attachment.url} target="_blank">
                                <AttachFileIcon/>
                                <div>
                                  <Typography variant="subtitle2">{attachment.name}</Typography>
                                  <Typography variant="caption">{convertFileSize(attachment.size)}</Typography>
                                </div>
                              </a>
                            );
                          }
                        })}
                      </div>
                      : null}
                      <Typography><Emoji options={{baseUrl: '//cdn.jsdelivr.net/emojione/assets/svg/', ext: 'svg?v=2.2.7', protocol: 'http', size: ''}} text={msg.text}/></Typography>
                    </div>
                  </div>
                ))}
              </div>
              :
              <Paper className={classes.loadingContainer}>
                <CircularProgress/>
              </Paper>}
              <ThreadInput
                placeholder="Antworten..."
                userId={props.userId}
                onSubmit={(msg, attachments) => {sendMessage(thread.channel ? thread.channel.id : thread.id, typeof thread.hasThreads === 'boolean' && !thread.hasThreads ? null : thread.id, msg, attachments)}}
                />
              <IconButton className={classes.fullscreenButton} onClick={() => {setActiveThreadIdWrapper(thread.id)}}>{activeThreadId === thread.id ? <UnfoldLessIcon/> : <UnfoldMoreIcon/>}</IconButton>
            </Paper>
          </section>
    );
  }

  function getContent() {
    if(activeChannel) {
      if(activeChannel.hasThreads && activeChannel.threads) {
        return(
          <React.Fragment>
            <section className={classNames(classes.section, {loading: isAddingThread, hide: activeThreadId})}>
              <Typography component="h3" className={classes.threadTitle}>Neuen Thread erstellen</Typography>
              <Paper className={classes.paper}>
                <InputBase
                  classes={{root: classes.titleInput, error: 'error'}}
                  placeholder="Wählen Sie eine Überschrift..."
                  required
                  error={newThreadTitle.error}
                  value={newThreadTitle.value}
                  onChange={setNewThreadTitleWrapper}
                  />
                <ThreadInput
                  placeholder="Wie können wir Ihnen helfen?"
                  userId={props.userId}
                  onSubmit={createNewThread}
                  />

                <Paper className={classes.loadingContainer}>
                  {addingThreadError ?
                    <React.Fragment>
                      <ErrorIcon className={classes.errorIcon}/>
                      <Typography>{addingThreadError}</Typography>
                    </React.Fragment>
                    : <CircularProgress/>}
                </Paper>
              </Paper>
            </section>

            {activeChannel.threads.length ?
              activeChannel.threads.map((thread) => <Thread key={thread.id} {...thread} channel={activeChannel}/>)
              : <NoData title="Keine offenen Threads" flexItem icon={<SpeakerNotesOffIcon/>}/>}
          </React.Fragment>
        );
      }

      return(
        <Thread {...activeChannel} fullscreen/>
      );
    }

    if(activeChannelId === 'overview') {
      return(
        <React.Fragment>
          {props.channels.map(channel => channel.hasThreads && channel.threads ?
            channel.threads.map(thread => (<Thread key={thread.id} channel={channel} {...thread} title={channel.title + ' > ' + thread.title}/>))
            :
            <Thread key={channel.id} {...channel} hasThreads={true}/>
          )}
        </React.Fragment>
      );
    }
  }

  const classes = useStyles();
  const activeChannel = activeChannelId && props.channels ? props.channels.find(channel => channel.id === activeChannelId) : null;
  return(
    <div className={classes.root}>
      <LoadingContainer
        noDataIcon={<SpeakerNotesOffIcon/>}
        noDataTitle="Keine offenen Channels"
        isLoading={Boolean(!props.channels || (props.channels && props.channels.length && !activeChannel && activeChannelId !== 'overview') || (props.channels && activeChannel && activeChannel.hasThreads && !activeChannel.threads))}
        hasData={Boolean(props.channels && props.channels.length)}
        getContent={getContent}
      />

        {/*<React.Fragment>
          <NoData title="Keine offenen Channels" icon={<SpeakerNotesOffIcon/>} flexItem/>
          <Button disabled={addingChannelDialogOpen} variant="contained" color="primary" className={classes.addChannelButton} onClick={() => {setAddingChannelDialogOpen(true)}}>
            <AddIcon/>
            Channel erstellen
          </Button>
        </React.Fragment>*/}

      <Dialog fullWidth maxWidth="xs" open={addingChannelDialogOpen} onClose={() => {if(!isAddingChannel) setAddingChannelDialogOpen(false)}}>
        <DialogTitle>Channel erstellen</DialogTitle>
        <DialogContent>
          <TextField disabled={isAddingChannel} autoFocus fullWidth variant="filled" label="Name des Channels" value={newChannelTitle} onChange={event => {setNewChannelTitle(event.target.value)}}/>
          <Paper className={classNames(classes.loadingContainer, 'absolute', {loading: isAddingChannel})}><CircularProgress/></Paper>
        </DialogContent>
        <DialogActions>
          <Button color="primary" disabled={isAddingChannel} onClick={() => {setAddingChannelDialogOpen(false)}}>Abbrechen</Button>
          <Button color="primary" disabled={isAddingChannel || !newChannelTitle.length} onClick={createNewChannel}>Erstellen</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default connect(({firestore}) => ({firestore}))(ThreadsOverview);
