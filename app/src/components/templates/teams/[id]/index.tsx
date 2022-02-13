import {makeStyles, createStyles} from '@material-ui/core/styles';
import {User} from '@/interfaces/models/user';
import {TeamMessageItem} from '@/interfaces/models/teamMessage';
import {Dispatch, SetStateAction} from 'react';
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
  teamId: number;
  teamMessageList: TeamMessageItem[] | [];
  setTeamMessageList: Dispatch<SetStateAction<TeamMessageItem[]>>;
  currentUser: User;
};

export function Template({teamId, teamMessageList, setTeamMessageList, currentUser}: TemplatePropsType) {
  const classes = useStyles();
  return (
    <Paper className={classes.paper} elevation={2}>
      <Paper className={classes.messagesBody}>
        <ChatMessageList teamMessageList={teamMessageList} currentUser={currentUser} />
      </Paper>
      <ChatForm
        teamId={teamId}
        currentUser={currentUser}
        teamMessageList={teamMessageList}
        setTeamMessageList={setTeamMessageList}
      />
    </Paper>
  );
}
