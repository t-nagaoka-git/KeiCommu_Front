import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import {useState} from 'react';
import {createTeamMessageParams} from '@/interfaces';
import {createTeamMessage} from '@/apis/teamMessages';
import {Box, TextField, Button} from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';
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
    imageUploadIcon: {
      height: theme.spacing(6),
      width: theme.spacing(6),
      cursor: 'pointer',
    },
    btn: {
      height: theme.spacing(6),
    },
  })
);

type FormPropsType = {
  teamId: number;
};

const ChatForm = ({teamId}: FormPropsType) => {
  const classes = useStyles();
  const [content, setContent] = useState<string>('');

  const handleChnageContent = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const params: createTeamMessageParams = {
      content: content,
    };

    try {
      await createTeamMessage(teamId, params);
      setContent('');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <form className={classes.form} noValidate autoComplete="off">
        <TextField className={classes.text} label="メッセージを入力" onChange={handleChnageContent} value={content} />
        <ImageIcon className={classes.imageUploadIcon} color="primary" fontSize="large" />
        <Button
          className={classes.btn}
          color="primary"
          disabled={!content ? true : false}
          onClick={handleSubmit}
          type="submit"
          variant="contained"
        >
          <SendIcon />
        </Button>
      </form>
    </>
  );
};

export default ChatForm;
