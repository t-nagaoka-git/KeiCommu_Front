import {makeStyles, createStyles} from '@material-ui/core/styles';
import {User} from '@/interfaces/models/user';
import {TeamMessageItem} from '@/interfaces/models/teamMessage';
import {Dispatch, SetStateAction} from 'react';
import {Paper} from '@material-ui/core';
import ChatMessageList from '@/components/molecules/List/ChatMessageList';
import ChatForm from '@/components/molecules/Form/ChatForm';
import dynamic from 'next/dynamic';
const Cable = dynamic(() => import('@/components/atoms/Cable'), {ssr: false});

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
  currentUser: User;
  teamId: number;
  teamMessageList: TeamMessageItem[] | [];
  getTeamMessageList: () => Promise<void>;
  setReceivedTeamMessage: Dispatch<SetStateAction<TeamMessageItem>>;
};

export function Template({
  currentUser,
  teamId,
  teamMessageList,
  getTeamMessageList,
  setReceivedTeamMessage,
}: TemplatePropsType) {
  const classes = useStyles();
  return (
    <Paper className={classes.paper} elevation={2}>
      <Paper id="teamMessageList" className={classes.messagesBody}>
        <ChatMessageList teamMessageList={teamMessageList} currentUser={currentUser} />
      </Paper>
      <ChatForm teamId={teamId} />
      <Cable
        channelName="TeamRoomsChannel"
        id={teamId}
        getDataList={getTeamMessageList}
        setReceivedData={setReceivedTeamMessage}
      />
    </Paper>
  );
}
