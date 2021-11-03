import {makeStyles, Theme} from '@material-ui/core/styles';
import {TeamItem as ITeamItem} from '@/interfaces/models/team';
import {Dispatch, SetStateAction, useState} from 'react';
import {User} from '@/interfaces/models/user';
import {Button} from '@material-ui/core';
import TeamCreateDialog from '@/components/molecules/Dialog/TeamCreateDialog';
import styles from './styles.module.css';
import TeamItem from '@/components/molecules/Item/TeamItem';

const useStyles = makeStyles((theme: Theme) => ({
  btn: {
    marginBottom: theme.spacing(1),
  },
}));

type TemplatePropsType = {
  teamList: ITeamItem[] | [];
  setTeamList: Dispatch<SetStateAction<ITeamItem[]>>;
  currentUser: User;
};

export function Template({teamList, setTeamList, currentUser}: TemplatePropsType) {
  const classes = useStyles();
  const [openCreateDialog, setOpenCreateDialog] = useState(false);

  const handleCreateDialog = () => {
    setOpenCreateDialog(true);
  };

  return (
    <>
      <Button
        className={classes.btn}
        variant="contained"
        size="large"
        fullWidth
        color="primary"
        onClick={handleCreateDialog}
      >
        チームを作成
      </Button>
      <TeamCreateDialog
        open={openCreateDialog}
        setOpen={setOpenCreateDialog}
        teamList={teamList}
        setTeamList={setTeamList}
        currentUser={currentUser}
      />
      {teamList.map((team: ITeamItem) => (
        <div className={styles.teamItem}>
          <TeamItem team={team} />
        </div>
      ))}
    </>
  );
}
