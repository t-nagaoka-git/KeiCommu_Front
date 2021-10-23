import {User} from '@/interfaces/models/user';
import {makeStyles, Theme} from '@material-ui/core/styles';
import React from 'react';
import {Card, CardHeader, Avatar, Button, CardContent, Box} from '@material-ui/core';

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
  user: User | null;
};

const Profile = ({user}: ProfilePropsType) => {
  const classes = useStyles();

  return (
    <Card className={classes.card} variant="outlined">
      <CardHeader
        avatar={<Avatar className={classes.avatar} />}
        action={
          <Button variant="contained" color="primary" className={classes.btn}>
            プロフィールを編集
          </Button>
        }
      />
      <CardContent>
        <h3 className={classes.heading}>{user.name}</h3>
        <span className={classes.subheader}>ここに紹介文を入れる予定</span>
        <Box display={'flex'} className={classes.relation}>
          <Box className={classes.following}>
            <span className={classes.statValue}>12</span>
            <span className={classes.statLabel}>フォロー中</span>
          </Box>
          <Box>
            <span className={classes.statValue}>6941</span>
            <span className={classes.statLabel}>フォロワー</span>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Profile;
