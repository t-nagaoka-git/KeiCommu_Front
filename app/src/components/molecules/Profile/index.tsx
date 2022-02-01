import {makeStyles, Theme} from '@material-ui/core/styles';
import {User, Profile as IProfile} from '@/interfaces/models/user';
import {Dispatch, SetStateAction, useState} from 'react';
import {createRelationshipParams, destroyRelationshipParams} from '@/interfaces';
import {createRelationship, destroyRelationship} from '@/apis/relationships';
import {Card, CardHeader, Avatar, Button, CardContent, Box} from '@material-ui/core';
import UserEditDialog from '@/components/molecules/Dialog/UserEditDialog';
import Link from 'next/link';

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    borderRadius: 0,
    padding: theme.spacing(2),
    maxWidth: 500,
  },
  avatar: {
    width: 60,
    height: 60,
  },
  btn: {
    marginTop: theme.spacing(4),
    marginRight: theme.spacing(1),
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: '0.5px',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  subheader: {
    fontSize: 14,
    marginBottom: '0.875em',
  },
  relation: {
    marginTop: theme.spacing(1),
  },
  following: {
    marginRight: 20,
  },
  statValue: {
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: '1px',
  },
  statLabel: {
    fontSize: 14,
    color: 'gray',
    fontWeight: 500,
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  },
}));

type ProfilePropsType = {
  currentUser: User;
  setCurrentUser: Dispatch<SetStateAction<User>>;
  user: IProfile | null;
  setUser: Dispatch<SetStateAction<IProfile>>;
};

const Profile = ({currentUser, setCurrentUser, user, setUser}: ProfilePropsType) => {
  const classes = useStyles();
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [following, setFollowing] = useState(user.following);
  const [followersCount, setFollowersCount] = useState(user.followersCount);

  const handleEditDialog = () => {
    setOpenEditDialog(true);
  };
  const handleFollow = async () => {
    try {
      const params: createRelationshipParams = {
        followed_id: user.id,
      };
      await createRelationship(params);
      setFollowing(true);
      setFollowersCount(followersCount + 1);
    } catch (err) {
      console.log(err);
    }
  };
  const handleUnfollow = async () => {
    try {
      const params: destroyRelationshipParams = {
        followed_id: user.id,
      };
      await destroyRelationship(params);
      setFollowing(false);
      setFollowersCount(followersCount - 1);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card className={classes.card} variant="outlined">
      <CardHeader
        avatar={<Avatar src={user.image} className={classes.avatar} />}
        action={
          user.id == currentUser.id ? (
            <>
              <Button className={classes.btn} variant="contained" color="primary" onClick={handleEditDialog}>
                プロフィールを編集
              </Button>
              <UserEditDialog
                open={openEditDialog}
                setOpen={setOpenEditDialog}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                user={user}
                setUser={setUser}
              />
            </>
          ) : (
            <>
              {following ? (
                <Button className={classes.btn} variant="contained" color="primary" onClick={handleUnfollow}>
                  フォロー解除
                </Button>
              ) : (
                <Button className={classes.btn} variant="contained" color="primary" onClick={handleFollow}>
                  フォロー
                </Button>
              )}
            </>
          )
        }
      />
      <CardContent>
        <h3 className={classes.heading}>{user.name}</h3>
        <span className={classes.subheader}>{user.description}</span>
        <Box display={'flex'} className={classes.relation}>
          <Box className={classes.following}>
            <Link href={`/users/${user.id}/following`}>
              <a>
                <span className={classes.statValue}>{user.friendsCount}</span>
                <span className={classes.statLabel}>フォロー中</span>
              </a>
            </Link>
          </Box>
          <Box>
            <Link href={`/users/${user.id}/followers`}>
              <a>
                <span className={classes.statValue}>{followersCount}</span>
                <span className={classes.statLabel}>フォロワー</span>
              </a>
            </Link>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Profile;
