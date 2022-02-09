import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    messageRow: {
      display: 'flex',
      alignItems: 'flex-end',
      flexDirection: 'column',
      marginBottom: theme.spacing(1),
    },
    messageContent: {
      width: '60%',
      borderRadius: theme.spacing(1),
      backgroundColor: theme.palette.primary.light,
      marginBottom: theme.spacing(1),
      marginRight: theme.spacing(2),
      padding: theme.spacing(1),
      color: 'white',
    },
    timestamp: {
      fontSize: '12px',
      marginRight: theme.spacing(2),
    },
  })
);

type MessagePropsType = {
  message: string;
  timestamp: string;
};

const MyChatMessage = ({message, timestamp}: MessagePropsType) => {
  const classes = useStyles();
  return (
    <div className={classes.messageRow}>
      <div className={classes.messageContent}>
        <p>{message}</p>
      </div>
      <div className={classes.timestamp}>{timestamp}</div>
    </div>
  );
};

export default MyChatMessage;
