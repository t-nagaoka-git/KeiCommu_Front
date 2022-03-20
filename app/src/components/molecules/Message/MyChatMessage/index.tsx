import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    messageRow: {
      display: 'flex',
      alignItems: 'flex-end',
      flexDirection: 'column',
      marginBottom: theme.spacing(1),
    },
    content: {
      width: '60%',
      borderRadius: theme.spacing(1),
      backgroundColor: theme.palette.primary.light,
      marginBottom: theme.spacing(1),
      marginRight: theme.spacing(2),
      padding: theme.spacing(1),
      color: 'white',
    },
    image: {
      width: '60%',
      marginBottom: theme.spacing(1),
      marginRight: theme.spacing(2),
    },
    timestamp: {
      fontSize: '12px',
      marginRight: theme.spacing(2),
    },
  })
);

type MessagePropsType = {
  message?: string;
  imageUrl?: string;
  timestamp: string;
};

const MyChatMessage = ({message, imageUrl, timestamp}: MessagePropsType) => {
  const classes = useStyles();
  return (
    <div className={classes.messageRow}>
      {message ? (
        <div className={classes.content}>
          <p>{message}</p>
        </div>
      ) : (
        <img className={classes.image} src={imageUrl} />
      )}
      <div className={classes.timestamp}>{timestamp}</div>
    </div>
  );
};

export default MyChatMessage;
