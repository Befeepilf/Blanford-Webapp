import React from 'react';
import {connect} from 'react-redux';
import {makeStyles} from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import LinearProgress from '@material-ui/core/LinearProgress';
import Popover from '@material-ui/core/Popover';
import AddIcon from '@material-ui/icons/Add';
import AttachmentIcon from '@material-ui/icons/Attachment';
import EmoticonIcon from '@material-ui/icons/InsertEmoticon';
import Editor from 'draft-js-plugins-editor';
import {EditorState} from 'draft-js';
import createMarkdownShortcutsPlugin from 'draft-js-markdown-shortcuts-plugin';
import createEmojiPlugin from 'draft-js-emoji-plugin';
import addEmoji from 'draft-js-emoji-plugin/lib/modifiers/addEmoji.js';
import defaultEmojiGroups from 'draft-js-emoji-plugin/lib/constants/defaultEmojiGroups';
import createEmojisFromStrategy from 'draft-js-emoji-plugin/lib/utils/createEmojisFromStrategy';
import strategy from 'emojione/emoji.json';
import EmojiPopover from 'draft-js-emoji-plugin/lib/components/EmojiSelect/Popover';
import 'draft-js/dist/Draft.css';
import 'draft-js-emoji-plugin/lib/plugin.css';

const emojis = createEmojisFromStrategy(strategy);
const emojiPlugin = createEmojiPlugin(); // modify /node_modules/draft-js-emoji-plugin/lib/index.js to return theme
const defaultEmojiPickerTheme = emojiPlugin.theme;


const useStyles = makeStyles(theme => {
  const dark = theme.palette.type === 'dark';
  return {
    root: {
      width: '100%',
      paddingRight: 21,
      marginTop: 14,
      '& .DraftEditor-root + div': {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.background.paper,
        borderColor: theme.palette.background.default,
        boxShadow: theme.shadows[14],
        '& .draftJsEmojiPlugin__emojiSuggestionsEntryFocused__XDntY': {
          backgroundColor: dark ? theme.palette.background.default : theme.palette.grey[200]
        }
      }
    },
    attachments: {
      display: 'flex',
      flexWrap: 'wrap',
      '& > *': {
        display: 'flex',
        marginRight: 14,
        fontSize: '0.75rem',
        '& svg': {
          marginRight: 7,
          fontSize: '1.125rem'
        }
      }
    },
    form: {
      display: 'flex',
      position: 'relative',
      width: '100%',
      marginTop: 7,
      border: '1px solid ' + theme.palette.text.disabled,
      borderRadius: 5,
      '& svg': {
        color: theme.palette.text.disabled
      }
    },
    input: {
      flex: 1,
      alignSelf: 'center',
      padding: [[10, 14]],
      fontSize: 16,
      borderLeft: '1px solid ' + theme.palette.text.disabled
    },
    iconButton: {
      alignSelf: 'flex-end',
      padding: [[10, 7]],
      '& svg': {
        fontSize: 24
      }
    },
    progressContainer: {
      display: 'flex',
      alignItems: 'flex-end',
      position: 'absolute',
      width: '100%',
      height: '100%',
      top: 0,
      left: 0,
      borderRadius: 5,
      overflow: 'hidden'
    },
    progress: {
      width: '100%',
      height: 2
    },
    emojiPickerContainer: {
      '& > *': {
        position: 'unset !important',
        marginTop: '0px !important',
        backgroundColor: theme.palette.background.paper + ' !important',
        border: '1px solid ' + theme.palette.text.disabled + ' !important',
        borderRadius: 5,
        boxShadow: 'none !important'
      },
      '& h3': {
        fontFamily: "'Open Sans', sans-serif",
        fontSize: '0.875rem',
        color: theme.palette.text.secondary
      }
    }
  };
});

function ThreadInput(props) {
  const [inputId, setInputId] = React.useState(require('uuid/v4')());
  const [editorState, setEditorState] = React.useState(EditorState.createEmpty());
  const [attachments, setAttachments] = React.useState([]);
  const [progress, setProgress] = React.useState(null);
  const [emojiPickerAnchor, setEmojiPickerAnchor] = React.useState(null);

  const emojiButton = React.createRef();

  const plugins = React.useMemo(() => [emojiPlugin, createMarkdownShortcutsPlugin()], []);
  const {EmojiSuggestions} = plugins[0];

  function onEditorStateChange(editorState) {
    setEditorState(editorState);
  }

  function onReturn(event, editorState) {
    if(event.ctrlKey) {
      return 'not-handled';
    }
    else {
      if(attachments.length) {
        let totalBytes = 0;
        let totalBytesTransferred = 0;
        let totalProgress = 0;
        const uploadTasks = [];

        attachments.forEach((file) => {
          totalBytes += file.size;
          uploadTasks.push(new Promise((resolve, reject) => {
            const fileRef = props.firestorage.ref('userdata/' + props.userId + '/threads/' + file.name);
            const uploadTask = fileRef.put(file);

            let lastBytesTransferred = 0;
            uploadTask.on('state_changed', (snapshot) => {
              totalBytesTransferred += snapshot.bytesTransferred - lastBytesTransferred;
              lastBytesTransferred = snapshot.bytesTransferred;
              totalProgress = totalBytesTransferred / totalBytes * 100;
              setProgress(totalProgress);
            }, reject, () => {
              uploadTask.snapshot.ref.getDownloadURL().then((url) => {resolve({url, type: file.type, name: file.name, size: file.size})}).catch(reject);
            });
          }));
        });

        Promise.all(uploadTasks).then((attachments) => {
          setProgress(null);
          setEditorState(EditorState.createEmpty());
          setAttachments([]);
          props.onSubmit(editorState.getCurrentContent().getPlainText(), attachments);
        }).catch((error) => {
          console.error("[Firestorage]", error);
          setProgress(null);
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
      else {
        props.onSubmit(editorState.getCurrentContent().getPlainText(), []);
        setEditorState(EditorState.createEmpty());
      }
      return 'handled';
    }
  }

  function addEmoji(emoji) {
    setEditorState(addEmoji(editorState, emoji.colons));
  }

  function toggleEmojiPicker(event) {
    setEmojiPickerAnchor(emojiPickerAnchor ? null : event.currentTarget);
  }

  function onAttachmentChange(event) {
    const files = event.target.files;
    setAttachments(attachments.concat(Array.from(files)));
  }

  const classes = useStyles();
  return(
    <div className={classes.root}>
      <div className={classes.attachments}>{attachments.map((file) => (
        <Typography key={file.name}>
          <AttachmentIcon/>
          {file.name}
        </Typography>
      ))}</div>
      <div className={classes.form}>
        <input id={inputId} type="file" multiple style={{display: 'none'}} onChange={onAttachmentChange}/>
        <label htmlFor={inputId}>
          <IconButton component="span" className={classes.iconButton}><AddIcon/></IconButton>
        </label>
        <div className={classes.input}>
          <Editor
            editorState={editorState}
            plugins={plugins}
            placeholder={props.placeholder}
            onChange={onEditorStateChange}
            handleReturn={onReturn}
          />
          <EmojiSuggestions/>
        </div>
        <IconButton ref={emojiButton} className={classes.iconButton} onClick={toggleEmojiPicker}><EmoticonIcon/></IconButton>
        {typeof progress === 'number' ?
          <div className={classes.progressContainer}>
            <LinearProgress variant="determinate" value={progress} className={classes.progress}/>
          </div>
        : null}
      </div>

      <Popover
        open={Boolean(emojiPickerAnchor)}
        anchorEl={emojiPickerAnchor}
        onClose={toggleEmojiPicker}
        TransitionProps={{timeout: 300}}
        keepMounted
      >
        <div className={classes.emojiPickerContainer}>
          <EmojiPopover
            store={{getEditorState: () => editorState, setEditorState}}
            imagePath="//cdn.jsdelivr.net/emojione/assets/svg/"
            imageType="svg"
            cacheBustParam="?v=2.2.7"
            theme={defaultEmojiPickerTheme}
            groups={defaultEmojiGroups}
            toneSelectOpenDelay={500}
            emojis={emojis}
            isOpen
          />
        </div>
      </Popover>
    </div>
  );
}

export default connect(({firestorage}) => ({firestorage}))(ThreadInput);
