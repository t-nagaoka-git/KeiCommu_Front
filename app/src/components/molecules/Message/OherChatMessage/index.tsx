import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    messageRow: {
      display: 'flex',
      marginBottom: theme.spacing(1),
    },
    messageContent: {
      width: '60%',
      borderRadius: theme.spacing(1),
      backgroundColor: theme.palette.grey[500],
      marginBottom: theme.spacing(1),
      marginLeft: theme.spacing(2),
      padding: theme.spacing(1),
      color: 'white',
      fontSize: '16px',
    },
    displayName: {
      fontSize: '12px',
      marginLeft: theme.spacing(2),
    },
    timestamp: {
      fontSize: '12px',
      marginLeft: theme.spacing(1),
    },
  })
);

type MessagePropsType = {
  message: string;
  timestamp: string;
  photoURL: string;
  displayName: string;
};

const OtherChatMessage = ({message, timestamp, photoURL, displayName}: MessagePropsType) => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.messageRow}>
        <Avatar alt={displayName} src={photoURL}></Avatar>
        <div>
          <div className={classes.messageContent}>
            <p>{message}</p>
          </div>
          <span className={classes.displayName}>{displayName}</span>
          <span className={classes.timestamp}>{timestamp}</span>
        </div>
      </div>
    </>
  );
};

export default OtherChatMessage;
