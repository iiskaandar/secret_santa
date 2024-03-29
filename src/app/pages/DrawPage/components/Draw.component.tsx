import React, { useEffect, useState, useContext } from 'react';
import socketIOClient from 'socket.io-client';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { getUsers, startDraw } from '@services/index';
import Context from '@store/context';
import { userType } from '@namespace/index';

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/LUPXhXj2ip0)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 500,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(3),
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
  text: {
    marginBottom: '10px',
  },
  green: {
    backgroundColor: '#165B33',
  },
}));

const getDrawnPerson = (users: userType[], drawnperson: number) => {
  let returnName;
  users.forEach(({ id, name }) => {
    if (drawnperson === id) {
      returnName = name;
    }
  });
  return returnName;
};

export default function Draw() {
  const classes = useStyles();
  const [users, setUsers] = useState<userType[]>([]);
  const { user, setNotToDrawAction } = useContext(Context);
  const { nottodraw, drawnperson } = user;
  const [drawnPersonStatic, setDrawnPerson] = useState<string | undefined>();

  useEffect(() => {
    const fetchData = async () => {
      const usersResponse = await getUsers();
      if (usersResponse) {
        setUsers(usersResponse.data.data);
      }
      if (drawnperson) {
        setDrawnPerson(getDrawnPerson(usersResponse.data.data, drawnperson));
      }
    };

    fetchData();
    if (process.env.BACKEND_WS) {
      const socket = socketIOClient(process.env.BACKEND_WS, {
        query: { id: user.id },
      });
      socket.on('connect', () => {});
      socket.on('NewUser', (listOfUsers: userType[]) => {
        setUsers(listOfUsers);
      });
      socket.on('NewDrawnPerson', (newDrawnPerson: string) => {
        setDrawnPerson(newDrawnPerson);
      });
      return () => {
        socket.disconnect();
      };
    }

    return () => {};
  }, []);

  return (
    <Grid container component="main" className={classes.image}>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          {drawnPersonStatic ? (
            <div>
              <Typography
                component="h3"
                variant="h5"
                align="center"
                className={classes.text}
              >
                Robisz prezent dla:
              </Typography>
              <Typography component="h1" variant="h4" align="center">
                {drawnPersonStatic}
              </Typography>
            </div>
          ) : (
            <div>
              <Typography
                component="h1"
                variant="h4"
                align="center"
                className={classes.text}
              >
                Losowanie - start 22:00
              </Typography>
              <Typography
                component="h1"
                variant="subtitle1"
                align="justify"
                className={classes.text}
              >
                Po zakończeniu losowania zobaczysz nazwę osoby, dla której
                będziesz Świętym Mikołajem. Poniżej znajduje się lista osób
                biorących udział w losowaniu. Jeśli nie chcesz komuś dawać
                prezentu, możesz go oznaczyć. Pamiętaj, że osoba oznaczona nie
                będzie mogła wylosować Ciebie :(
              </Typography>
              <List dense className={classes.root}>
                {users &&
                  setNotToDrawAction &&
                  users.map(({ id, name }) => {
                    const labelId = `checkbox-list-secondary-label-${name}`;
                    if (user.id !== id) {
                      return (
                        <ListItem
                          key={id}
                          button
                          selected={nottodraw === id}
                          onClick={() => {
                            if (nottodraw === id) {
                              setNotToDrawAction(50);
                            } else {
                              setNotToDrawAction(id);
                            }
                          }}
                        >
                          <ListItemAvatar>
                            <Avatar className={classes.green}>{name[0]}</Avatar>
                          </ListItemAvatar>
                          <ListItemText id={labelId} primary={name} />
                        </ListItem>
                      );
                    }
                    return null;
                  })}
              </List>
            </div>
          )}

          {user.isadmin && (
            <Button
              variant="contained"
              fullWidth
              size="large"
              color="primary"
              onClick={() => startDraw()}
            >
              Losuj
            </Button>
          )}
        </Paper>
      </main>
    </Grid>
  );
}
