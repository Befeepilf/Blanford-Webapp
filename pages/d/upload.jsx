import React from 'react';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import classNames from 'classnames';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';
import AddAPhoto from '@material-ui/icons/AddAPhoto';
import AddPhotoAlternateOutlined from '@material-ui/icons/AddPhotoAlternateOutlined';
import Add from '@material-ui/icons/Add';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import RefreshIcon from '@material-ui/icons/Refresh';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import grey from '@material-ui/core/colors/grey';
import Layout from '../../components/Dashboard/Layout.jsx';
import StateButton from '../../components/StateButton.jsx';

const uuidv4 = require('uuid/v4');

@connect(state => ({
  firestore: state.firestore,
  firestorage: state.firestorage,
  images: state.images,
  userId: state.profile.user_id
}))
@withStyles(theme => ({
  fullHeight: {
    height: '100%'
  },
  empty: {
    fontSize: '1.5rem',
    opacity: 0.3,
    '& button': {
      marginBottom: 28
    },
    '& svg': {
      fontSize: '8rem',
      color: theme.palette.text.primary
    }
  },
  toolbar: {
    width: '100%',
    backgroundColor: (theme.palette.type === 'dark' ? theme.palette.background.secondary : theme.palette.background.default),
    boxShadow: theme.shadows[2],
    '& label': {
      margin: 0
    }
  },
  toolbarTitle: {
    flex: 1
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))',
    justifyContent: 'space-between',
    width: '100%',
    '& .img': {
      '&.add': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.palette.grey[400],
        cursor: 'pointer',
      },
      '&.selected': {
        '& img': {
          filter: 'brightness(30%)'
        },
        '& svg.selectIcon': {
          opacity: '1 !important'
        }
      },
      '&:not(.add) svg.selectIcon': {
        position: 'absolute',
        top: 14,
        right: 14,
        opacity: 0
      },
      '& img': {
        objectFit: 'cover',
        width: '100%',
        height: '100%',
        transition: 'all 0.15s ease-out'
      }
    }
  },
  image: {
    position: 'relative',
    height: 210,
    margin: 7,
    cursor: 'pointer',
    '&.fadeOut': {
      cursor: 'default',
      color: '#FFF',
      '& img': {
        opacity: 0.3
      }
    },
  },
  imagesSelectIcon: {
    fill: '#FFF'
  },
  centerIcon: {
    position: 'absolute',
    height: 48,
    top: 0,
    bottom: 0,
    left: 'calc(50% - 24px)',
    margin: 'auto'
  }
}))
class Upload extends React.Component {
  constructor(props) {
    super(props);

    this.beforeUpload = this.beforeUpload.bind(this);

    this.state = {
      loadingImages: [],
      selectedImages: [],
      consentDialogOpen: false
    };
  }

  deleteImages(cb) {
    const promises = [];
    for(let id of this.state.selectedImages) {
      promises.push(new Promise((resolve, reject) => {
        this.props.firestore.doc('users/' + this.props.userId + '/images/' + id).delete().then(resolve).catch(reject);
      }));
    }
    Promise.all(promises).then(() => {cb()}).catch((error) => {
      console.error(error);
      cb(error);
    });
  }

  beforeUpload(event) {
    const target = event.currentTarget;
    if(!this.props.images.length && !this.state.consentDialogAccepted) {
      event.preventDefault();
      this.setState({consentDialogOpen: true, consentDialogOnAccept: () => {
        this.setState({consentDialogOpen: false, consentDialogAccepted: true}, () => {
          target.dispatchEvent(new MouseEvent('click', {view: window, bubbles: true, cancelable: true}));
        });
      }});
    }
  }

  upload(files, retryId) {
    const now = new Date().getTime();
    const id = retryId || uuidv4();

    const addPreview = (file, src) => {
      const loadingImages = this.state.loadingImages;
      if(retryId) {
        loadingImages.find((img) => img.id === id).state = 'loading';
      }
      else {
        loadingImages.push({
          id: id + 'loading',
          timestamp: now,
          src,
          state: 'loading',
          file
        });
      }
      this.setState({loadingImages});
    };

    const uploadToFirestorage = (file) => {
      const fileRef = this.props.firestorage.ref('userdata/' + this.props.userId + '/images/' + id);
      fileRef.put(file).then((snapshot) => {
        snapshot.ref.getDownloadURL().then((url) => {
          this.props.firestore.doc('users/' + this.props.userId + '/images/' + id).set({
            timestamp: now,
            src: url,
            name: file.name
          }).catch((error) => {
            console.error(error);
            failed();
          });
        });
      }).catch((error) => {
        console.error(error);
        failed();
      });
    };

    const failed = () => {
      const loadingImages = this.state.loadingImages;
      loadingImages.find((img) => img.id === id).state = 'error';
      this.setState({loadingImages});
    };

    for(let file of files) {
      const fileReader = new FileReader();
      fileReader.addEventListener('load', () => {
        addPreview(file, fileReader.result);
        uploadToFirestorage(file);
      }, false);
      fileReader.readAsDataURL(file);
    }
  }

  fileChange(event) {
    this.setState({selectedImages: []});
    this.upload(event.target.files);
  }

  componentDidUpdate(prevProps) {
    if(this.state.loadingImages.length && prevProps.images.length !== this.props.images.length) {
      this.setState({loadingImages: this.state.loadingImages.filter((img1) => !this.props.images.find((img2) => img1.id === img2.id + 'loading'))});
    }
  }

  render() {
    const images = this.props.images ? this.state.loadingImages.concat(this.props.images) : [];
    return(
      <React.Fragment>
        {
          this.props.images ?
            images.length > 0 ?
              <div className={this.props.classes.images}>
                <Toolbar className={this.props.classes.toolbar}>
                  <Typography variant="h5" className={this.props.classes.toolbarTitle}>Bilder</Typography>
                  <Divider/>
                  <input type="file" accept="image/*" multiple style={{display: 'none'}} id="file-input2" onChange={this.fileChange.bind(this)}/>
                  <label htmlFor="file-input2">
                    <IconButton component="span" onClick={this.beforeUpload}>
                      <Add/>
                    </IconButton>
                  </label>
                  <StateButton
                    label="Löschen"
                    backgroundColor={red[500]}
                    disabled={this.state.selectedImages.length === 0}
                    onClick={this.deleteImages.bind(this)}
                    onSuccess={() => {
                      this.setState({selectedImages: []});
                    }}
                    errorMessage="Einige Bilder konnten nicht gelöscht werden!"
                  />
                </Toolbar>
                <div className={this.props.classes.grid}>
                  {images.map((img) => {
                    return(
                      <div key={img.id} className={classNames('img', this.props.classes.image, {
                        fadeOut: img.state === 'loading' || img.state === 'error',
                        selected: this.state.selectedImages.indexOf(img.id) !== -1})
                      } onClick={() => {
                        if(img.state !== 'loading' && img.state !== 'error') {
                          if(this.state.selectedImages.indexOf(img.id) === -1) {
                            this.setState({selectedImages: this.state.selectedImages.concat([img.id])});
                          }
                          else {
                            const {selectedImages} = this.state;
                            selectedImages.splice(selectedImages.indexOf(img.id), 1);
                            this.setState({selectedImages});
                          }
                        }
                      }}>
                        <img src={img.src}/>
                        <CheckCircleIcon className={classNames(this.props.classes.imagesSelectIcon, 'selectIcon')}/>

                        {img.state === 'loading' ?
                          <CircularProgress className={this.props.classes.centerIcon}/>
                        :
                        null}
                        {img.state === 'error' ?
                          <IconButton color="inherit" className={this.props.classes.centerIcon} onClick={() => {this.upload([img.file], img.id)}}>
                            <RefreshIcon/>
                          </IconButton>
                        :
                        null}
                      </div>
                    );
                  })}
                  <input type="file" accept="image/*" multiple style={{display: 'none'}}  id="file-input" onChange={this.fileChange.bind(this)}/>
                  <label htmlFor="file-input" className={classNames('img', 'add', this.props.classes.image)}>
                    <AddAPhoto/>
                  </label>
                </div>
              </div>
            :
            <Grid container direction="column" alignItems="center" justify="center" className={classNames(this.props.classes.empty, this.props.classes.fullHeight)}>
              <input type="file" accept="image/*" multiple style={{display: 'none'}} id="file-input" onChange={this.fileChange.bind(this)}/>
              <label htmlFor="file-input">
                <IconButton component="span" onClick={this.beforeUpload}>
                  <AddPhotoAlternateOutlined/>
                </IconButton>
              </label>
              Keine hochgeladenen Medien
            </Grid>
          :
            <Grid container alignItems="center" justify="center" className={this.props.classes.fullHeight}>
              <CircularProgress/>
            </Grid>
        }

        <Dialog disableBackdropClick disableEscapeKeyDown open={this.state.consentDialogOpen}>
          <DialogTitle>Zustimmung für Verwendung</DialogTitle>
          <DialogContent>
            <FormControlLabel
              style={{alignItems: 'flex-start'}}
              control={
                <Checkbox checked={Boolean(this.state.consentDialogAccepted)} onChange={(event, value) => {this.setState({consentDialogAccepted: value})}}/>
              }
              label="Ich nehme zur Kenntnis, dass das auf diesem Wege hochgeladene Material Blanford Digital zwecks Vollbringung abgestimmter Leistungen bereitgestellt wird und stimme zu, dass dieses für die vertraglich bestimmten Ziele vom Auftragnehmer, Blue Logan Unternehmergesellschaft (haftungsbeschränkt), öffentlich verwendet, bearbeitet und gespeichert werden darf."
            />
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={() => {this.setState({consentDialogOpen: false, consentDialogAccepted: false})}}>Abbrechen</Button>
            <Button color="primary" disabled={!Boolean(this.state.consentDialogAccepted)} onClick={this.state.consentDialogOnAccept}>Zustimmen & Weiter</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}


export default props => <Layout id="Upload"><Upload {...props}/></Layout>;
