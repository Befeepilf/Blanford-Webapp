import {createMuiTheme} from '@material-ui/core/styles';
import yellow from '@material-ui/core/colors/yellow';
import green from '@material-ui/core/colors/green';
import grey from '@material-ui/core/colors/grey';

export default function(type, dark, screenWidth) {
  let theme;
  let defaultTheme = {
    breakpoints: {
      values: {
        xs: 0,
        sm: 576,
        md: 960,
        lg: 1280,
        xl: 1920
      }
    }
  };
  if(type === 'dashboard') {
    theme = createMuiTheme(Object.assign({}, defaultTheme, {
      typography: {
        fontSize: 13,
        body1: {fontSize: '0.87rem'},
        body2: {fontSize: '0.99rem', fontWeight: 400},
      },
      palette: {
        type: dark ? 'dark' : 'light',
        primary: {main: '#4a8af5'},
        secondary: {main: '#4a8af5'},
        warning: {
          main: yellow[800],
        },
        success: {
          main: green[500]
        }
      },
      overrides: {
        MuiAppBar: {
          root: {
            boxShadow: 'none',
          },
          colorDefault: {
            backgroundColor: '#fff'
          }
        },
        MuiCheckbox: {
          root: {
            color: 'rgba(0, 0, 0, 0.34)'
          }
        }
      }
    }));

    if(dark) {
      theme = createMuiTheme(Object.assign(theme, {
        palette: Object.assign(theme.palette, {
          background: {
            primary: '#121212',
            secondary: '#212121',
            tertiary: '#4C4C4C',
            paper: '#171717',
          },
          text: {
            primary: theme.palette.grey[300],
            secondary: theme.palette.grey[400]
          },
          warning: {
            main: yellow[500]
          }
        }),
        overrides: Object.assign(theme.overrides, {
          MuiTypography: {
            root: {color: theme.palette.grey[300]},
            body1: {color: theme.palette.grey[300]},
            body2: {color: theme.palette.grey[300]},
            h5: {color: theme.palette.grey[300]}
          },
          MuiAppBar: {
            colorDefault: {
              backgroundColor: '#1c1c1c'
            }
          },
          MuiSvgIcon: {
            root: {
              color: theme.palette.grey[300]
            }
          }
        })
      }));
    }
  }
  else if(type === 'homepage') {
    theme = createMuiTheme(Object.assign({}, defaultTheme, {
      palette: {
        type: dark ? 'dark' : 'light',
        primary: {main: '#1784fb'},
        background: {primary: '#fff'}
      }
    }));

    if(dark) {
      theme = createMuiTheme(Object.assign(theme, {
        palette: Object.assign(theme.palette, {
          background: {
            primary: '#131313',
            secondary: '#212121',
            tertiary: '#4C4C4C',
            paper: '#1C1C1C',
          },
          text: {
            primary: theme.palette.grey[300],
            secondary: theme.palette.grey[400]
          }
        })
      }));
    }
  }
  else {
    theme = createMuiTheme();
  }

  return theme;
}
