import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import {TextField, Button} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      display: 'flex',
      justifyContent: 'center',
      width: '95%',
      margin: `${theme.spacing(0)} auto`,
    },
    text: {
      width: '100%',
    },
  })
);

const ChatForm = () => {
  const classes = useStyles();
  return (
    <>
      <form className={classes.form} noValidate autoComplete="off">
        <TextField label="メッセージを入力" className={classes.text} />
        <Button variant="contained" color="primary">
          <SendIcon />
        </Button>
      </form>
    </>
  );
};

export default ChatForm;
