import {makeStyles, Theme} from '@material-ui/core/styles';
import {User} from '@/interfaces/models/user';
import {useState} from 'react';
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  Button,
  Divider,
} from '@material-ui/core';
import Link from 'next/link';
import {createRelationshipParams, destroyRelationshipParams} from '@/interfaces';
import {createRelationship, destroyRelationship} from '@/apis/relationships';

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

  const RelationshipButton = (props: {user_id: number; following: boolean}) => {
    const [followFlag, setFollowFlag] = useState(props.following);

    const handleFollow = async () => {
      try {
        const params: createRelationshipParams = {
          followed_id: props.user_id,
        };
        await createRelationship(params);
        setFollowFlag(true);
      } catch (err) {
        console.log(err);
      }
    };
    const handleUnfollow = async () => {
      try {
        const params: destroyRelationshipParams = {
          followed_id: props.user_id,
        };
        await destroyRelationship(params);
        setFollowFlag(false);
      } catch (err) {
        console.log(err);
      }
    };

    return (
      <>
        {followFlag ? (
          <Button variant="contained" color="primary" onClick={handleUnfollow}>
            フォロー解除
          </Button>
        ) : (
          <Button variant="contained" color="primary" onClick={handleFollow}>
            フォロー
          </Button>
        )}
      </>
    );
  };

  return (
    <List className={classes.list}>
      {usersList.map((user: User, index: number) => (
        <>
          <ListItem className={classes.listItem} alignItems="flex-start">
            <Link href={`/users/${user.id}`}>
              <a>
                <ListItemAvatar className={classes.avatar}>
                  <Avatar src={user.image.url} />
                </ListItemAvatar>
              </a>
            </Link>
            <ListItemText primary={user.name} secondary={user.description} className={classes.inline} />
            <RelationshipButton user_id={user.id} following={user.following} />
          </ListItem>
          {usersList.length != index + 1 && <Divider />}
        </>
      ))}
    </List>
  );
};

export default UserList;
