import {makeStyles, Theme} from '@material-ui/core/styles';
import {TeamItem as ITeamItem} from '@/interfaces/models/team';
import {Card, Box, Typography, Avatar, CardContent} from '@material-ui/core';
import AvatarGroup from '@material-ui/lab/AvatarGroup';

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    maxWidth: 500,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
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
  cardContent: {
    paddingBottom: theme.spacing(1),
  },
}));

type ListPropsType = {
  team: ITeamItem;
};

const TeamItem = ({team}: ListPropsType) => {
  const classes = useStyles();

  return (
    <Card className={classes.card} key={team.id}>
      <Box className={classes.main} minHeight={75} display={'flex'}>
        <Typography className={classes.title}>{team.name}</Typography>
      </Box>
      {team.users && (
        <AvatarGroup className={classes.avatarGroup} max={5}>
          {team.users.map((user) => (
            <Avatar className={classes.avatar} />
          ))}
        </AvatarGroup>
      )}
      <CardContent className={classes.cardContent}>{team.description}</CardContent>
    </Card>
  );
};

export default TeamItem;
