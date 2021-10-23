import {makeStyles, Theme} from '@material-ui/core/styles';
import {User} from '@/interfaces/models/user';
import {List, ListItem, ListItemAvatar, Avatar, ListItemText, Divider} from '@material-ui/core';
import Link from 'next/link';

const useStyles = makeStyles((theme: Theme) => ({
  list: {
    marginTop: theme.spacing(1),
    width: '100%',
    maxWidth: 500,
    backgroundColor: theme.palette.background.paper,
    border: '1px solid rgba(0, 0, 0, 0.12)',
  },
  inline: {
    display: 'inline',
  },
}));

type ListPropsType = {
  usersList: User[] | [];
};

const UserList = ({usersList}: ListPropsType) => {
  const classes = useStyles();

  return (
    <List className={classes.list}>
      {usersList.map((user: User, index: number) => (
        <>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Link href={`/users/${user.id}`}>
                <a>
                  <Avatar />
                </a>
              </Link>
            </ListItemAvatar>
            <ListItemText primary={user.name} className={classes.inline} />
          </ListItem>
          {usersList.length != index + 1 && <Divider />}
        </>
      ))}
    </List>
  );
};

export default UserList;
