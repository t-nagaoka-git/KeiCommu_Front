import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import {User} from '@/interfaces/models/user';
import {TeamItem} from '@/interfaces/models/team';
import {TeamMessageItem} from '@/interfaces/models/teamMessage';
import {Dispatch, SetStateAction, useState} from 'react';
import {Paper, Box, Typography, IconButton, Menu, MenuItem, ListItemIcon, ListItemText} from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import TeamDetailDialog from '@/components/molecules/Dialog/TeamDetailDialog';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import PanToolOutlinedIcon from '@material-ui/icons/PanToolOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
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
  team: TeamItem;
  teamMessageList: TeamMessageItem[] | [];
  getTeamMessageList: () => Promise<void>;
  setReceivedTeamMessage: Dispatch<SetStateAction<TeamMessageItem>>;
};

export function Template({
  currentUser,
  teamId,
  team,
  teamMessageList,
  getTeamMessageList,
  setReceivedTeamMessage,
}: TemplatePropsType) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openTeamDetailDialog, setOpenTeamDetailDialog] = useState(false);
  const open = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleTeamDetailDialog = () => {
    setAnchorEl(null);
    setOpenTeamDetailDialog(true);
  };

  return (
    <Paper className={classes.paper} elevation={2}>
      <Box display={'flex'} className={classes.box}>
        <Typography className={classes.teamName}>{team?.name}</Typography>
        <IconButton
          className={classes.menuIcon}
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
        >
          <MoreHorizIcon fontSize="large" />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={handleTeamDetailDialog}>
            <ListItemIcon>
              <InfoOutlinedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="チーム詳細" />
            {openTeamDetailDialog && (
              <TeamDetailDialog
                open={openTeamDetailDialog}
                setOpen={setOpenTeamDetailDialog}
                team={team}
                currentUser={currentUser}
                joinButtonDisplayFlag={false}
              />
            )}
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <SettingsOutlinedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="チーム設定" />
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <PanToolOutlinedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="強制退出" />
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <ExitToAppOutlinedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="退出する" />
          </MenuItem>
        </Menu>
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
