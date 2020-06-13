import React from 'react';
import classNames from 'classnames';
import formatDistance from 'date-fns/formatDistance';
import format from 'date-fns/format';
import deLocale from 'date-fns/locale/de';
import {connect} from 'react-redux';
import {makeStyles} from '@material-ui/styles';
import Router from 'next/router';
import Link from 'next/link';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputBase from '@material-ui/core/InputBase';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import Popover from '@material-ui/core/Popover';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import {Calendar} from '@material-ui/pickers';
import CheckCircleIcon from '@material-ui/icons/CheckCircleOutline';
import SubjectIcon from '@material-ui/icons/Subject';
import EventIcon from '@material-ui/icons/Event';
import AddIcon from '@material-ui/icons/Add';
import ErrorIcon from '@material-ui/icons/Error';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ChatIcon from '@material-ui/icons/Chat';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import SendIcon from '@material-ui/icons/Send';
import grey from '@material-ui/core/colors/grey';

import Layout from '../../components/Dashboard/Layout.jsx';
import LoadingContainer from '../../components/Dashboard/LoadingContainer.jsx';
import Info from '../../components/Dashboard/Info.jsx';
import {convertFileSize} from '../../Util.js';

let dragCounter = 0;

const useTaskStyles = makeStyles(theme => ({
  root: {
    '&.expanded': {
      margin: 0
    }
  },
  summaryRoot: {
    minHeight: 0,
    paddingLeft: 0,
    '&.expanded': {
      minHeight: 0
    }
  },
  summaryContent: {
    alignItems: 'center',
    margin: 0,
    '&.expanded': {
      margin: 0
    }
  },
  summaryIconButton: {
    padding: 7
  },
  completeButton: {
    marginRight: 7,
    '& svg': {
      color: theme.palette.text.disabled,
    },
    '&:hover svg': {
      color: theme.palette.text.primary
    }
  },
  title: {
    flex: 1,
    maxWidth: '100%'
  },
  details: {
    display: 'block',
    position: 'relative',
    '& > $sectionTitle': {
      marginBottom: 14
    }
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '7fr 2fr',
    gridColumnGap: '56px',
    gridRowGap: '28px',
    '& > *': {
      position: 'relative'
    }
  },
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 14,
    '& svg': {
      marginRight: 7,
      fontSize: 24
    }
  },
  sectionTitle: {
    fontFamily: "'Open Sans', sans-serif"
  },
  descriptionInput: {
    padding: 7,
    transition: 'all 0.15s',
    '&:not(.focused)': {
      '&, & textarea': {
        cursor: 'pointer',
      },
      '&:hover': {
        backgroundColor: theme.palette.type === 'dark' ? grey[900] : grey[100]
      }
    },
    '&.focused': {
      border: '1px solid grey',
      borderRadius: 5,
      '& textarea': {
        minHeight: '8em'
      }
    },
    '& textarea': {
      minHeight: '1.6em',
      lineHeight: 1.6,
      overflow: 'hidden'
    }
  },
  submitButton: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    '&.disabled svg': {
      color: theme.palette.text.disabled
    }
  },
  dueDateButton: {
    padding: 7,
    cursor: 'pointer',
    transition: 'all 0.15s',
    '&:hover': {
      backgroundColor: theme.palette.type === 'dark' ? grey[900] : grey[100]
    }
  },
  attachmentSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  linearProgress: {
    width: '100%'
  },
  fileInput: {
    display: 'none'
  },
  fileInputLabel: {
    cursor: 'pointer'
  },
  attachment: {
    display: 'flex',
    marginBottom: 14,
    '&:hover $attachmentDeleteContainer, &.isDeleting $attachmentDeleteContainer': {
      zIndex: 1,
      opacity: 0.98
    },
    '& > :last-child': {
      marginLeft: 14
    }
  },
  attachmentPreview: {
    position: 'relative',
    width: 140,
    '& > :first-child': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      '& svg': {
        fontSize: 36
      }
    },
    '& > img, & > video': {
      objectFit: 'cover',
      height: 70
    }
  },
  attachmentDeleteContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    zIndex: -1,
    opacity: 0,
    transition: 'all 0.3s'
  },
  commentSection: {
    position: 'relative'
  },
  commentInput: {
    padding: [[0, 0, 0, 14]],
    '& textarea': {
      minHeight: '3.2em',
      padding: [[7, 14]],
      lineHeight: 1.6,
      border: '1px solid ' + theme.palette.text.disabled,
      borderRadius: 5,
      transition: 'all 0.3s',
      '&:focus': {
        borderColor: theme.palette.text.secondary
      }
    }
  },
  dragOverlay: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    zIndex: -1,
    opacity: 0,
    transition: 'all 0.3s',
    '&.active': {
      zIndex: 2,
      opacity: 0.98
    }
  }
}));
function Task(props) {
  const [showDragOverlay, setShowDragOverlay] = React.useState(false);
  const [descriptionInputFocused, setDescriptionInputFocused] = React.useState(false);
  const [description, setDescription] = React.useState(props.description || "");
  const [isSavingDescription, setIsSavingDescription] = React.useState(false);
  const [comment, setComment] = React.useState("");
  const [isAddingComment, setIsAddingComment] = React.useState(false);
  const [uploadProgress, setUploadProgress] = React.useState();
  const [isDeletingAttachmentId, setIsDeletingAttachmentId] = React.useState();

  function saveDueDate(date) {
    props.firestore.doc(`users/${props.userId}/todos/${props.categoryId}/tasks/${props.id}`).update({dueAt: date.getTime()}).then(() => {
      props.onAddedDueDate();
    }).catch((error) => {
      console.error("[Firestore]", error);
      props.dispatch({type: 'SET', data: {notification: error.message}});
      props.onAddedDueDate();
    });
  }

  function setDescriptionWrapper(event) {
    setDescription(event.target.value);
  }

  function onSaveDescriptionMouseDown(event) {
    event.preventDefault();
  }

  function saveDescription() {
    setIsSavingDescription(true);
    props.firestore.doc(`users/${props.userId}/todos/${props.categoryId}/tasks/${props.id}`).update({description}).then(() => {
      setIsSavingDescription(false);
      setDescriptionInputFocused(false);
    }).catch((error) => {
      console.error("[Firestore]", error);
      props.dispatch({type: 'SET', data: {notification: error.message}});
      setIsSavingDescription(false);
    });
  }

  function onComplete() {
    props.firestore.doc(`users/${props.userId}/todos/${props.categoryId}/tasks/${props.id}`).set({completed: true}).then(() => {});
  }

  function toggleDescriptionFocus() {
    setDescriptionInputFocused(!descriptionInputFocused);
  }

  function onDragEnter(event) {
    event.preventDefault();
    event.stopPropagation();

    if(!uploadProgress) {
      dragCounter++;
      if(event.dataTransfer && event.dataTransfer.items.length) {
        setShowDragOverlay(true);
      }
    }
  }

  function onDragLeave(event) {
    event.preventDefault();
    event.stopPropagation();

    dragCounter--;
    if(dragCounter > 0) return;
    setShowDragOverlay(false);
  }

  function onDragOver(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  function onAddFile(event) {
    event.preventDefault();
    event.stopPropagation();

    setShowDragOverlay(false);
    dragCounter = 0;

    const files = Array.from(event.dataTransfer ? event.dataTransfer.files : document.getElementById(props.id + 'in').files);
    if(files.length) {
      setUploadProgress(0);

      let totalBytes = 0;
      let totalBytesTransferred = 0;
      let totalProgress = 0;
      const uploadTasks = [];

      files.forEach((file) => {
        totalBytes += file.size;
        uploadTasks.push(new Promise((resolve, reject) => {
          const fileRef = props.firestorage.ref('userdata/' + props.userId + '/todos/' + props.id + '/' + file.name);
          const uploadTask = fileRef.put(file);

          let lastBytesTransferred = 0;
          uploadTask.on('state_changed', (snapshot) => {
            totalBytesTransferred += snapshot.bytesTransferred - lastBytesTransferred;
            lastBytesTransferred = snapshot.bytesTransferred;
            totalProgress = totalBytesTransferred / totalBytes * 100;
            console.log(totalProgress + "%");
            setUploadProgress(totalProgress);
          }, reject, () => {
            uploadTask.snapshot.ref.getDownloadURL().then((url) => {resolve({url, type: file.type, name: file.name, size: file.size})}).catch(reject);
          });
        }));
      });

      Promise.all(uploadTasks).then((attachments) => {
        const promises = attachments.map((attachment) => {
          return props.firestore.collection(`users/${props.userId}/todos/${props.categoryId}/tasks/${props.id}/attachments`).add(attachment);
        });
        Promise.all(promises).then(() => {
          setUploadProgress(null);
        });
      }).catch((error) => {
        console.error("[Firestorage]", error);
        setUploadProgress(null);
        switch (error.code) {
          case 'storage/unauthorized':
            props.dispatch({type: 'SET', data: {notification: "Sie sind nicht berechtigt Dateien hochzuladen."}});
            break;
          case 'storage/canceled':
            props.dispatch({type: 'SET', data: {notification: "Das Hochladen der Dateien wurde unterbrochen."}});
            break;
          case 'storage/unknown':
            props.dispatch({type: 'SET', data: {notification: "Beim Hochladen der Dateien ist ein unbekannter Fehler aufgetreten"}});
            break;
          default:
            props.dispatch({type: 'SET', data: {notification: error.message || "Beim Hochladen der Dateien ist ein unbekannter Fehler aufgetreten"}});
            break;
        }
      });
    }
  }

  function deleteAttachment(attachmentId, filename, event) {
    event.preventDefault();

    setIsDeletingAttachmentId(attachmentId);
    const promises = [
      props.firestore.doc(`users/${props.userId}/todos/${props.categoryId}/tasks/${props.id}/attachments/${attachmentId}`).delete(),
      props.firestorage.ref('userdata/' + props.userId + '/todos/' + props.id + '/' + filename).delete()
    ];
    Promise.all(promises).then(() => {
      setIsDeletingAttachmentId(null);
    }).catch((error) => {
      console.error(error);
      props.dispatch({type: 'SET', data: {notification: error.message || error}});
      setIsDeletingAttachmentId(null);
    });
  }

  function setCommentWrapper(event) {
    setComment(event.target.value);
  }

  function saveComment() {
    setIsAddingComment(true);

    props.firestore.doc(`users/${props.userId}/channels/tasks`).get().then(doc => {
      if(doc.exists) {
        createNewThread(doc.ref);
      }
      else {
        doc.ref.set({title: "Aufgaben", hasThreads: true}).then(() => {createNewThread(doc.ref)}).catch(onSaveCommentError);
      }
    }).catch(onSaveCommentError);
  }

  function createNewThread(tasksDoc) {
    tasksDoc.collection('threads').add({title: props.title, updatedAt: new Date().getTime()}).then((doc) => {
      doc.collection('messages').add({attachments: [], sender: props.userId, text: comment, timestamp: new Date().getTime()}).then(() => {
        props.firestore.doc(`users/${props.userId}/todos/${props.categoryId}/tasks/${props.id}`).update({threadId: doc.id}).then(() => {
          setIsAddingComment(false);
          setComment("");
          Router.push('/d/threads?channel=tasks&thread=' + doc.id);
        }).catch(onSaveCommentError);
      }).catch(onSaveCommentError);
    }).catch(onSaveCommentError);
  }

  function onSaveCommentError(error) {
    props.dispatch({type: 'SET', data: {notification: error.message}});
    setIsAddingComment(false);
  }

  const classes = useTaskStyles();
  return(
    <ExpansionPanel
      classes={{root: classes.root, expanded: 'expanded'}}
      expanded={props.expanded}
      elevation={0}
      onChange={props.onChange}
    >
      <ExpansionPanelSummary classes={{root: classes.summaryRoot, content: classes.summaryContent, expanded: 'expanded'}}>
        <IconButton className={classes.summaryIconButton, classes.completeButton} onClick={onComplete}><CheckCircleIcon/></IconButton>
        <Typography className={classes.title}>{props.title}</Typography>
        <Typography color="textSecondary">{formatDistance(new Date(props.createdAt), new Date(), {locale: deLocale, addSuffix: true})}{typeof props.priority === 'number' ? [" - Priorität ", <strong key={1}>{props.priority}/10</strong>] : null}</Typography>
      </ExpansionPanelSummary>

      <ExpansionPanelDetails
        className={classes.details}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDragOver={onDragOver}
        onDrop={onAddFile}
      >
        <Typography className={classes.sectionTitle}>Erstellt {props.creator === props.userId ? "von Ihnen" : "vom Blanford-Team"}, {format(new Date(props.createdAt), 'EEE MMM dd yyyy', {locale: deLocale})}</Typography>
        <div className={classes.grid}>
          <div>
            <div className={classes.sectionHeader}>
              <SubjectIcon/>
              <Typography className={classes.sectionTitle}>Beschreibung</Typography>
            </div>
            <InputBase
              value={description}
              onChange={setDescriptionWrapper}
              disabled={isSavingDescription}
              placeholder={(descriptionInputFocused ? "" : "Klicken, um ") + "Beschreibung hinzuzufügen"}
              multiline fullWidth
              inputProps={{onFocus: toggleDescriptionFocus, onBlur: toggleDescriptionFocus}}
              className={classNames(classes.descriptionInput, {focused: descriptionInputFocused})}
            />
            {descriptionInputFocused ?
              isSavingDescription ?
                <CircularProgress size={28} className={classes.submitButton}/>
              :
              <IconButton
                disabled={(props.description || "") === description}
                classes={{root: classes.submitButton, disabled: 'disabled'}}
                onClick={saveDescription}
                onMouseDown={onSaveDescriptionMouseDown}
              ><SaveIcon/></IconButton>
            : null}
          </div>

          <div>
            <div className={classes.sectionHeader}>
              <EventIcon/>
              <Typography className={classes.sectionTitle}>Due Date</Typography>
            </div>
            <Typography color={props.dueAt ? 'textPrimary' : 'textSecondary'} className={classes.dueDateButton} onClick={(event) => {props.onOpenDueDateSelector(props.dueAt, saveDueDate, event)}}>
              {props.dueAt ? format(new Date(props.dueAt), 'EEE MMM dd yyyy', {locale: deLocale}) : "Klicken, um Datum zu wählen"}
            </Typography>
          </div>

          <div className={classes.attachmentSection}>
            <div className={classes.sectionHeader}>
              <AttachFileIcon/>
              <Typography className={classes.sectionTitle}>Anhänge</Typography>
            </div>

            <input id={props.id + 'in'} type="file" onChange={onAddFile} className={classes.fileInput}/>
            {uploadProgress || props.attachments.length ?
              null
            :
            <label htmlFor={props.id + 'in'}>
              <Typography color="textSecondary" className={classes.fileInputLabel}>Klicken, um Datei hinzuzufügen oder Datei via Drag & Drop hinzufügen</Typography>
            </label>}

            {props.attachments && props.attachments.length ?
              props.attachments.map((attachment) => (
                <a key={attachment.id} className={classNames(classes.attachment, {isDeleting: isDeletingAttachmentId === attachment.id})} href={attachment.url} target="_blank">
                  <div className={classes.attachmentPreview}>
                    {attachment.type.startsWith('image') ?
                      <img src={attachment.url}/>
                    : attachment.type.startsWith('video') ?
                      <video src={attachment.url} controls/>
                    : <div><InsertDriveFileIcon/></div>}
                    <Paper square className={classes.attachmentDeleteContainer}>
                      {isDeletingAttachmentId === attachment.id ? <CircularProgress/> : <IconButton onClick={(event) => {deleteAttachment(attachment.id, attachment.name, event)}}><DeleteIcon/></IconButton>}
                    </Paper>
                  </div>
                  <div>
                    <Typography variant="subtitle2">{attachment.name}</Typography>
                    <Typography variant="caption">{convertFileSize(attachment.size)}</Typography>
                  </div>
                </a>
              ))
            : null}

            {uploadProgress ?
              <LinearProgress variant="determinate" value={uploadProgress} className={classes.linearProgress}/>
            : null}
          </div>

          <div>
            {/* <div className={classes.sectionHeader}>
              <NotificationsIcon/>
              <Typography className={classes.sectionTitle}>Email Reminder</Typography>
            </div> */}
          </div>

          <div className={classes.commentSection}>
            <div className={classes.sectionHeader}>
              <ChatIcon/>
              <Typography className={classes.sectionTitle}>Kommentare</Typography>
            </div>
            {props.threadId ?
              <Typography><Link href={'/d/threads?channel=tasks&thread=' + props.threadId}><a>Zum Thread ></a></Link></Typography>
            :
            <React.Fragment>
              <InputBase value={comment} onChange={setCommentWrapper} disabled={isAddingComment} multiline fullWidth placeholder="Stellen Sie eine Frage (wird in einem neuen Thread geöffnet)" className={classes.commentInput}/>
              {isAddingComment ?
                <CircularProgress size={28} className={classes.submitButton}/>
              :
              <IconButton
                disabled={!comment.length}
                classes={{root: classes.submitButton, disabled: 'disabled'}}
                onClick={saveComment}
              ><SendIcon/></IconButton>}
            </React.Fragment>}
          </div>
        </div>

        <Paper className={classNames(classes.dragOverlay, {active: showDragOverlay})}>
          <Info title="Drop, um Datei dieser Aufgabe hinzuzufügen" icon={<CloudUploadIcon/>} compact/>
        </Paper>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}

Task = connect(({firestore, firestorage, profile}) => ({firestore, firestorage, userId: profile.user_id}))(Task);


const useToDoBoardStyles = makeStyles(theme => {
  const dark = theme.palette.type === 'dark';
  return {
    loadingContainer: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      '&.absolute': {
        flex: 1,
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
    category: {
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      padding: [[14, 0, 21, 21]],
      marginTop: 14,
      borderRadius: 14,
      overflow: 'hidden'
    },
    categoryTitle: {
      marginBottom: 21,
      fontFamily: "'Gotham A', 'Gotham B', sans-serif",
      fontWeight: 500,
      letterSpacing: 0
    },
    dueDateSelectorContainer: {
      position: 'relative'
    },
    fab: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
      [theme.breakpoints.down('xs')]: {
        '& svg': {
          fontSize: 20
        }
      },
      [theme.breakpoints.up('sm')]: {
        bottom: theme.spacing(4),
        right: theme.spacing(4)
      },
      [theme.breakpoints.up('lg')]: {
        right: theme.spacing(8)
      }
    },
    addTaskDialogPaper: {
      width: 420,
      maxWidth: '100%'
    },
    addTaskDialogContent: {
      display: 'flex',
      flexDirection: 'column',
      '& > :not($loadingContainer)': {
        marginBottom: 14
      }
    }
  };
});
function ToDoBoard(props) {
  const [activeExpansionPanels, setActiveExpansionPanels] = React.useState({});
  const [dueDate, setDueDate] = React.useState({isSaving: false})
  const [addTaskDialogOpen, setAddTaskDialogOpen] = React.useState(false);
  const [isAddingTask, setIsAddingTask] = React.useState(false);
  const [newTask, setNewTask] = React.useState({category: "", newCategory: "", title: ""});

  function toggleExpansionPanel(categoryId, taskId, event, expanded) {
    setActiveExpansionPanels(Object.assign({}, activeExpansionPanels, {[categoryId]: expanded ? taskId : null}));
  }

  function closeDueDateSelector() {
    setDueDate(Object.assign({}, dueDate, {selectorAnchor: null, isSaving: false}));
  }

  function onOpenDueDateSelector(currentDueDate, cb, event) {
    setDueDate(Object.assign({}, dueDate, {date: currentDueDate ? new Date(currentDueDate) : new Date(), selectorAnchor: event.currentTarget, onSelectCb: cb}));
  }

  function onDueDateSelect(date, finished) {
    const newDueDate = {date};
    if(finished) {
      dueDate.onSelectCb(date);
      newDueDate.isSaving = true;
    }
    setDueDate(Object.assign({}, dueDate, newDueDate));
  }

  function renderCalendarDay(day, selectedDate, isDayInCurrentMonth, dayComponent) {
    if(day.getTime() === selectedDate.getTime() && dueDate.isSaving) return <CircularProgress/>
    return dayComponent;
  }

  function toggleAddTaskDialog() {
    setAddTaskDialogOpen(!addTaskDialogOpen);
  }

  function onNewTaskChange(event) {
    setNewTask(Object.assign({}, newTask, {[event.target.name]: event.target.value}));
  };

  function addTask() {
    setIsAddingTask(true);

    const onError = (error) => {
      setIsAddingTask(false);
      props.dispatch({type: 'SET', data: {notification: error.message || error}});
    }

    const saveTask = (categoryId) => {
      props.firestore.collection(`users/${props.userId}/todos/${categoryId}/tasks`).add({
        createdAt: new Date().getTime(),
        title: newTask.title,
        attachments: [],
        creator: props.userId
      }).then(() => {
        setIsAddingTask(false);
        setAddTaskDialogOpen(false);
        setNewTask({category: "", newCategory: "", title: ""});
      }).catch(onError);
    }

    if(newTask.category === 'new') {
      props.firestore.collection(`users/${props.userId}/todos`).add({
        title: newTask.newCategory,
        updatedAt: new Date().getTime()
      }).then((doc) => saveTask(doc.id)).catch(onError);
    }
    else {
      saveTask(newTask.category);
    }
  }

  function getCategoryContent(category) {
    return category.tasks.map((task) => (
      task.completed ? null
      :
      <Task
        key={task.id}
        {...task}
        categoryId={category.id}
        expanded={activeExpansionPanels[category.id] === task.id}
        onChange={(event, expanded) => {toggleExpansionPanel(category.id, task.id, event, expanded)}}
        onOpenDueDateSelector={onOpenDueDateSelector}
        onAddedDueDate={closeDueDateSelector}
      />
    ));
  }

  function getContent() {
    return props.categories.map(category => (
      <Paper key={category.id} className={classes.category}>
        <Typography className={classes.categoryTitle}>{category.title}</Typography>
        <LoadingContainer
          loadingOverlay
          noDataIcon={<PlaylistAddCheckIcon/>}
          noDataTitle="Keine zu erledigenden Aufgaben"
          isLoading={!category.tasks}
          hasData={Boolean(category.tasks && category.tasks.length)}
          getContent={() => getCategoryContent(category)}
        />
      </Paper>
    ));
  }


  const classes = useToDoBoardStyles();
  return(
    <React.Fragment>
      <LoadingContainer
        noDataIcon={<PlaylistAddCheckIcon/>}
        noDataTitle="Keine zu erledigenden Aufgaben"
        errorTitle="To-Dos konnten nicht geladen werden"
        isLoading={!props.categories && props.firestore !== null}
        hasData={Boolean(props.categories && props.categories.length)}
        getContent={getContent}
      />

      <Popover open={Boolean(dueDate.selectorAnchor)} anchorEl={dueDate.selectorAnchor} className={classes.dueDateSelectorContainer} onClose={closeDueDateSelector}>
        <Calendar date={dueDate.date || new Date()} onChange={onDueDateSelect} disablePast disableFuture={dueDate.isSaving}/>
        <Paper className={classNames(classes.loadingContainer, 'absolute', {loading: dueDate.isSaving})}>
          <CircularProgress/>
        </Paper>
      </Popover>

      <Fab className={classes.fab} color="primary" onClick={toggleAddTaskDialog} disabled={!props.firestore}><AddIcon/></Fab>

      <Dialog open={addTaskDialogOpen} onClose={toggleAddTaskDialog} classes={{paper: classes.addTaskDialogPaper}}>
        <DialogTitle>Aufgabe hinzufügen</DialogTitle>
        <DialogContent classes={{root: classes.addTaskDialogContent}}>
          <FormControl variant="filled">
            <InputLabel htmlFor="select-category">Kategorie</InputLabel>
            <Select
              value={newTask.category}
              onChange={onNewTaskChange}
              input={<FilledInput name="category" id="select-category"/>}
            >
              <MenuItem value="new"><em>Neue Kategorie erstellen</em></MenuItem>
              {(props.categories || []).map((category) => (
                <MenuItem key={category.id} value={category.id}>{category.title}</MenuItem>
              ))}
            </Select>
          </FormControl>
          {newTask.category === 'new' ? <TextField required variant="filled" label="Name der Kategorie" value={newTask.newCategory} name="newCategory" onChange={onNewTaskChange} style={{marginBottom: 28}}/> : null}

          <TextField required variant="filled" label="Titel" value={newTask.title} name="title" onChange={onNewTaskChange}/>

          <Paper className={classNames(classes.loadingContainer, 'absolute', {loading: isAddingTask})}><CircularProgress/></Paper>
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleAddTaskDialog}>Abbrechen</Button>
          <Button color="primary" disabled={isAddingTask || !newTask.title.length || !newTask.category.length || (newTask.category === 'new' && !newTask.newCategory.length)} onClick={addTask}>Hinzufügen</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default connect(({todos, firestore, firestorage, profile}) => ({
  categories: todos,
  firestore,
  firestorage,
  userId: profile.user_id
}))(props => <Layout id="ToDoBoard"><ToDoBoard {...props}/></Layout>);
