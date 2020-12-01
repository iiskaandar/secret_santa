import React, { useState, useContext } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Lock from '@material-ui/icons/Lock';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Context from '@store/context';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/900x900/?presents)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignInSide() {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const [errorPassword, setErrorPassword] = useState(false);
  const { signin, signup, errorMessage } = useContext(Context);
  const [errorName, setErrorName] = useState(false);
  const [registrationPage, setRegistrationPage] = useState(false);

  const checkValidationOfName = () => {
    if (name.length < 2 || name.length > 20) {
      setErrorName(true);
    } else {
      setErrorName(false);
    }
    if (
      password.length < 8 ||
      password.search(/[a-z]/i) < 0 ||
      password.search(/[0-9]/) < 0
    ) {
      setErrorPassword(true);
    } else {
      setErrorPassword(false);
    }
  };

  const submit = () => {
    checkValidationOfName();
    if (registrationPage) {
      if (!errorName && !errorPassword && signup) {
        signup(name, password);
      }
    } else if (!errorName && !errorPassword && signin) {
      signin(name, password);
    }
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <Lock />
          </Avatar>
          <Typography component="h1" variant="h5">
            {registrationPage ? 'Rejestracja' : 'Logowanie'}
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              error={!!errorMessage || errorName}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Nazwa"
              name="name"
              autoComplete="name"
              autoFocus
              onChange={e => setName(e.target.value)}
              helperText={
                errorMessage ||
                (errorName &&
                  'Niepoprawnie wypełnione pole. Długość podanej nazwy powinna zawierać od 2 do 20 znaków.')
              }
            />
            <TextField
              error={errorPassword}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Hasło"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={e => setPassword(e.target.value)}
              helperText={
                errorPassword &&
                'Hasło powinno składać się z małej, dużej litery i cyfry. Powinno mieć min 8 znaków.'
              }
            />
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={() => submit()}
            >
              {registrationPage ? 'Zarejestruj się' : 'Zaloguj się'}
            </Button>
            {!registrationPage && (
              <Grid container>
                <Grid item>
                  <Link
                    href="#"
                    variant="body2"
                    onClick={() => setRegistrationPage(true)}
                  >
                    Nie posiadasz konta? Zarejestruj się.
                  </Link>
                </Grid>
              </Grid>
            )}
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
