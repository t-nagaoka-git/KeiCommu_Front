import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import {useState} from 'react';
import {createTeamMessageParams} from '@/interfaces';
import {createTeamMessage} from '@/apis/teamMessages';
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
        <Button
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
