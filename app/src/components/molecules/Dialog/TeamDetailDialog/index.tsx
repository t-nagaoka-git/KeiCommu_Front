import {makeStyles, Theme} from '@material-ui/core/styles';
import {Dispatch, SetStateAction} from 'react';
import {TeamItem} from '@/interfaces/models/team';
import {User} from '@/interfaces/models/user';
import {useRouter} from 'next/router';
import {joinTeam} from '@/apis/teamUsers';
import {Dialog, Box, Typography, Avatar, DialogContent, Divider, DialogActions, Button} from '@material-ui/core';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import moment from 'moment';

const useStyles = makeStyles((theme: Theme) => ({
  dialog: {
    maxWidth: 500,
    margin: 'auto',
  },
  main: {
    background: theme.palette.primary.main,
  },
  title: {
    display: 'flex',
    margin: 'auto',
    color: '#fff',
  },
  avatarGroup: {
    justifyContent: 'center',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(1),
  },
  avatar: {
    width: 48,
    height: 48,
  },
  itemName: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    marginRight: 'auto',
  },
  itemValue: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  itemBox: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  itemBoxRecentTalk: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
    flexDirection: 'column',
  },
  dialogActions: {
    padding: '20px 24px',
  },
}));

type DialoggPropsType = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  team: TeamItem;
  currentUser: User;
  joinButtonDisplayFlag: boolean;
};

const TeamDetailDialog = ({open, setOpen, team, currentUser, joinButtonDisplayFlag}: DialoggPropsType) => {
  const classes = useStyles();
  const router = useRouter();

  const handleClose = () => {
    setOpen(false);
  };

  const handleTeamJoinBtnClick = async (teamId: number) => {
    if (!currentUser) return;

    try {
      await joinTeam(teamId);
      router.push(`teams/${teamId}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Dialog className={classes.dialog} open={open} onClose={handleClose} fullWidth>
        <Box className={classes.main} minHeight={75} display={'flex'}>
          <Typography className={classes.title}>{team.name}</Typography>
        </Box>
        {team.users && (
          <AvatarGroup className={classes.avatarGroup} max={5}>
            {team.users.map((user) => (
              <Avatar className={classes.avatar} src={user.image.url} />
            ))}
          </AvatarGroup>
        )}
        <DialogContent>
          <Divider />
          <Box display={'flex'} className={classes.itemBox}>
            {team.description}
          </Box>
          <Divider />
          {joinButtonDisplayFlag && (
            <>
              <Box display={'flex'} className={classes.itemBoxRecentTalk}>
                <Typography className={classes.itemName} variant="body1">
                  ?????????????????????
                </Typography>
                {team.recentTeamMessages &&
                  team.recentTeamMessages.map((recentTeamMessage) => (
                    <Typography variant="body2">
                      {recentTeamMessage.userName} ???{' '}
                      {recentTeamMessage.content ? recentTeamMessage.content : '???????????????????????????'}
                    </Typography>
                  ))}
              </Box>
              <Divider />
            </>
          )}
          <Box display={'flex'} className={classes.itemBox}>
            <Typography className={classes.itemName} variant="body1">
              ????????????
            </Typography>
            <Typography className={classes.itemValue} variant="body1">
              {moment(team.updatedAt).format('YYYY-MM-DD HH:mm:ss')}
            </Typography>
          </Box>
          <Divider />
          <Box display={'flex'} className={classes.itemBox}>
            <Typography className={classes.itemName} variant="body1">
              ????????????
            </Typography>
            <Typography className={classes.itemValue} variant="body1">
              {(() => {
                console.log(team.genderRestriction);
                switch (team.genderRestriction) {
                  case 'none':
                    return '????????????';
                  case 'man':
                    return '??????';
                  case 'woman':
                    return '??????';
                }
              })()}
            </Typography>
          </Box>
          <Divider />
          <Box display={'flex'} className={classes.itemBox}>
            <Typography className={classes.itemName} variant="body1">
              ????????????????????????
            </Typography>
            <Typography className={classes.itemValue} variant="body1">
              {team.autoExitGracePeriod}??????
            </Typography>
          </Box>
          <Divider />
        </DialogContent>
        <DialogActions className={classes.dialogActions}>
          {joinButtonDisplayFlag ? (
            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              color="primary"
              onClick={handleTeamJoinBtnClick.bind(this, team.id)}
            >
              ??????????????????
            </Button>
          ) : (
            <Button type="submit" variant="contained" size="large" fullWidth color="primary" onClick={handleClose}>
              ?????????
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TeamDetailDialog;
