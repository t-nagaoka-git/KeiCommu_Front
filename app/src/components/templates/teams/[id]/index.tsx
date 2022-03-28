import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import {User} from '@/interfaces/models/user';
import {TeamMessageItem} from '@/interfaces/models/teamMessage';
import {Dispatch, SetStateAction} from 'react';
import {Paper, Typography, Box} from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ChatMessageList from '@/components/molecules/List/ChatMessageList';
import ChatForm from '@/components/molecules/Form/ChatForm';
import dynamic from 'next/dynamic';
const Cable = dynamic(() => import('@/components/atoms/Cable'), {ssr: false});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      height: '85vh',
    },
    box: {
      alignItems: 'center',
      background: theme.palette.primary.light,
      color: 'white',
      fontSize: 18,
      justifyContent: 'center',
      padding: theme.spacing(2),
      position: 'relative',
    },
    teamName: {
      fontWeight: 'bold',
    },
    menuIcon: {
      cursor: 'pointer',
      position: 'absolute',
      right: theme.spacing(3),
    },
    messagesBody: {
      margin: 10,
      overflowY: 'scroll',
      height: 'calc( 100% - 20% )',
    },
  })
);

type TemplatePropsType = {
  currentUser: User;
  teamId: number;
  teamName: string;
  teamMessageList: TeamMessageItem[] | [];
  getTeamMessageList: () => Promise<void>;
  setReceivedTeamMessage: Dispatch<SetStateAction<TeamMessageItem>>;
};

export function Template({
  currentUser,
  teamId,
  teamName,
  teamMessageList,
  getTeamMessageList,
  setReceivedTeamMessage,
}: TemplatePropsType) {
  const classes = useStyles();
  return (
    <Paper className={classes.paper} elevation={2}>
      <Box display={'flex'} className={classes.box}>
        <Typography className={classes.teamName}>{teamName}</Typography>
        <MoreHorizIcon className={classes.menuIcon} fontSize="large" />
      </Box>
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
