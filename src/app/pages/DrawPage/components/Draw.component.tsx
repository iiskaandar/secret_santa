import React, { useEffect, useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import { getUsers } from '@services/index';
import Context from '@store/context';

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

export default function Draw() {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const { user, setNotToDrawAction } = useContext(Context);
  const { nottodraw } = user;

  useEffect(() => {
    const fetchData = async () => {
      const response = await getUsers();
      if (response) {
        setUsers(response.data.data);
      }
    };

    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Losowanie
          </Typography>
        </Toolbar>
      </AppBar>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Mozesz wybrać osobę, której nie chcesz wylosować.
          </Typography>
          <List dense className={classes.root}>
            {users &&
              setNotToDrawAction &&
              users.map(({ id, name }) => {
                const labelId = `checkbox-list-secondary-label-${name}`;
                if (user.id !== id) {
                  return (
                    <ListItem key={id} button>
                      <ListItemAvatar>
                        <Avatar>{name[0]}</Avatar>
                      </ListItemAvatar>
                      <ListItemText id={labelId} primary={name} />
                      <ListItemSecondaryAction>
                        <Checkbox
                          edge="end"
                          onChange={() => {
                            if (nottodraw === id) {
                              setNotToDrawAction(50);
                            } else {
                              setNotToDrawAction(id);
                            }
                          }}
                          checked={nottodraw === id}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                  );
                }
                return null;
              })}
          </List>
        </Paper>
      </main>
    </React.Fragment>
  );
}
