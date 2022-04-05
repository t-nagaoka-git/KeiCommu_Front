import {makeStyles, Theme} from '@material-ui/core/styles';
import {useState} from 'react';
import {TeamItem as ITeamItem} from '@/interfaces/models/team';
import {User} from '@/interfaces/models/user';
import {searchTeams} from '@/apis/teams';
import {searchUsers} from '@/apis/users';
import {ToggleButtonGroup, ToggleButton} from '@material-ui/lab';
import {Paper, InputBase, IconButton} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import styles from './styles.module.css';
import TeamItem from '@/components/molecules/Item/TeamItem';
import TeamDetailDialog from '@/components/molecules/Dialog/TeamDetailDialog';
import UsersList from '@/components/molecules/List/UserList';

const useStyles = makeStyles((theme: Theme) => ({
  toggle: {
    maxWidth: 500,
    width: '100%',
  },
  toggleBtn: {
    width: '50%',
  },
  searchForm: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: '0 4px',
    display: 'flex',
    alignItems: 'center',
    maxWidth: 500,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 7,
  },
}));

type TemplatePropsType = {
  currentUser: User;
};

export function Template({currentUser}: TemplatePropsType) {
  const classes = useStyles();
  const [searchTarget, setSearchTarget] = useState<string>('teams');
  const [keyword, setKeyword] = useState<string>('');
  const [teams, setTeams] = useState<ITeamItem[]>([]);
  const [openTeamDetailDialog, setOpenTeamDetailDialog] = useState(false);
  const [selectTeam, setSelectTeam] = useState<ITeamItem>(null);
  const [users, setUsers] = useState<User[]>([]);

  const handleChnageGender = (e: React.MouseEvent<HTMLButtonElement>, value: any) => {
    if (value !== null) {
      setSearchTarget(value);
    }
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (searchTarget === 'teams') {
      try {
        const res = await searchTeams(keyword);
        setUsers([]);
        setTeams(res.data.teams);
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const res = await searchUsers(keyword);
        setTeams([]);
        setUsers(res.data.users);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleTeamDetailDialog = (team: ITeamItem) => {
    setSelectTeam(team);
    setOpenTeamDetailDialog(true);
  };

  return (
    <>
      <ToggleButtonGroup
        color="primary"
        exclusive
        size="small"
        value={searchTarget}
        className={classes.toggle}
        onChange={handleChnageGender}
      >
        <ToggleButton value="teams" className={classes.toggleBtn}>
          チーム
        </ToggleButton>
        <ToggleButton value="users" className={classes.toggleBtn}>
          ユーザー
        </ToggleButton>
      </ToggleButtonGroup>
      <Paper component="form" className={classes.searchForm} variant="outlined">
        <IconButton type="submit" className={classes.iconButton} onClick={handleSubmit} disabled={!keyword}>
          <SearchIcon />
        </IconButton>
        <InputBase
          className={classes.input}
          placeholder="キーワード検索"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </Paper>
      {0 < teams.length &&
        teams.map((team: ITeamItem) => (
          <div className={styles.teamItem} onClick={handleTeamDetailDialog.bind(this, team)}>
            <TeamItem team={team} recentTeamMessageDisplayFlag={false} />
          </div>
        ))}
      {openTeamDetailDialog && (
        <TeamDetailDialog
          open={openTeamDetailDialog}
          setOpen={setOpenTeamDetailDialog}
          team={selectTeam}
          currentUser={currentUser}
          joinButtonDisplayFlag={true}
        />
      )}
      {0 < users.length && <UsersList usersList={users} />}
    </>
  );
}
