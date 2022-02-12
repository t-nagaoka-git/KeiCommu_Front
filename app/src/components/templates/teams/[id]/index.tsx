import {makeStyles, createStyles} from '@material-ui/core/styles';
import {TeamMessageItem} from '@/interfaces/models/teamMessage';
import {User} from '@/interfaces/models/user';
import {Paper} from '@material-ui/core';
import ChatMessageList from '@/components/molecules/List/ChatMessageList';
import ChatForm from '@/components/molecules/Form/ChatForm';

const useStyles = makeStyles(() =>
  createStyles({
    paper: {
      height: '85vh',
    },
    messagesBody: {
      margin: 10,
      overflowY: 'scroll',
      height: 'calc( 100% - 80px )',
    },
  })
);

type TemplatePropsType = {
  teamMessageList: TeamMessageItem[] | [];
  currentUser: User;
};

export function Template({teamMessageList, currentUser}: TemplatePropsType) {
  const classes = useStyles();
  return (
    <Paper className={classes.paper} elevation={2}>
      <Paper className={classes.messagesBody}>
        <ChatMessageList teamMessageList={teamMessageList} currentUser={currentUser} />
      </Paper>
      <ChatForm />
    </Paper>
  );
}
