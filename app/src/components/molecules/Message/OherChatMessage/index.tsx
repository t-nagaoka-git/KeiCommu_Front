import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    messageRow: {
      display: 'flex',
      marginBottom: theme.spacing(1),
    },
    content: {
      width: '60%',
      borderRadius: theme.spacing(1),
      backgroundColor: theme.palette.grey[500],
      marginBottom: theme.spacing(1),
      marginLeft: theme.spacing(2),
      padding: theme.spacing(1),
      color: 'white',
      fontSize: '16px',
    },
    image: {
      width: '60%',
      marginBottom: theme.spacing(1),
      marginLeft: theme.spacing(2),
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
  message?: string;
  imageUrl?: string;
  timestamp: string;
  photoURL: string;
  displayName: string;
};

const OtherChatMessage = ({message, imageUrl, timestamp, photoURL, displayName}: MessagePropsType) => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.messageRow}>
        <Avatar alt={displayName} src={photoURL}></Avatar>
        <div>
          {message ? (
            <div className={classes.content}>
              <p>{message}</p>
            </div>
          ) : (
            <img className={classes.image} src={imageUrl} />
          )}
          <div>
            <span className={classes.displayName}>{displayName}</span>
            <span className={classes.timestamp}>{timestamp}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default OtherChatMessage;
