import {makeStyles, Theme} from '@material-ui/core/styles';
import {User} from '@/interfaces/models/user';
import {List, ListItem, ListItemAvatar, Avatar, ListItemText, Divider} from '@material-ui/core';
import Link from 'next/link';

const useStyles = makeStyles((theme: Theme) => ({
  list: {
    padding: 0,
    width: '100%',
    maxWidth: 500,
    backgroundColor: theme.palette.background.paper,
    border: '1px solid rgba(0, 0, 0, 0.12)',
  },
  listItem: {
    padding: theme.spacing(2),
  },
  avatar: {
    margin: 0,
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
          <ListItem className={classes.listItem} alignItems="flex-start">
            <Link href={`/users/${user.id}`}>
              <a>
                <ListItemAvatar className={classes.avatar}>
                  <Avatar />
                </ListItemAvatar>
              </a>
            </Link>
            <ListItemText primary={user.name} secondary={user.description} className={classes.inline} />
          </ListItem>
          {usersList.length != index + 1 && <Divider />}
        </>
      ))}
    </List>
  );
};

export default UserList;
