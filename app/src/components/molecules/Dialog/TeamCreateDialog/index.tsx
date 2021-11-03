import {makeStyles, Theme} from '@material-ui/core/styles';
import {Dispatch, SetStateAction, useState} from 'react';
import {TeamItem} from '@/interfaces/models/team';
import {User} from '@/interfaces/models/user';
import {createTeamParams} from '@/interfaces';
import {createTeam} from '@/apis/teams';
import {
  Button,
  Dialog,
  DialogContent,
  InputLabel,
  TextField,
  Box,
  Select,
  MenuItem,
  DialogActions,
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  dialog: {
    maxWidth: 500,
    margin: 'auto',
  },
  inputLabel: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    marginRight: 'auto',
  },
  box: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  dialogActions: {
    padding: '20px 24px',
  },
}));

type DialoggPropsType = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  teamList: TeamItem[] | null;
  setTeamList: Dispatch<SetStateAction<TeamItem[]>> | null;
  currentUser: User;
};

const TeamCreateDialog = ({open, setOpen, teamList, setTeamList, currentUser}: DialoggPropsType) => {
  const classes = useStyles();
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [visibilitySetting, setvVsibilitySetting] = useState<string>('close');
  const [genderRestriction, setGenderRestriction] = useState<string>('none');
  const [autoExitGracePeriod, setAutoExitGracePeriod] = useState<number>(0);

  const handleClose = () => {
    setOpen(false);
  };
  const handleChangeVisibilitySetting = (event: React.ChangeEvent<{value: unknown}>) => {
    setvVsibilitySetting(event.target.value as string);
  };
  const handleChangeGenderRestriction = (event: React.ChangeEvent<{value: unknown}>) => {
    setGenderRestriction(event.target.value as string);
  };
  const handleChangeAutoExitGracePeriod = (event: React.ChangeEvent<{value: unknown}>) => {
    setAutoExitGracePeriod(event.target.value as number);
  };
  const handleTeamCreateBtnClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!currentUser) return;

    const params: createTeamParams = {
      name: name,
      description: description,
      visibilitySetting: visibilitySetting,
      genderRestriction: genderRestriction,
      autoExitGracePeriod: autoExitGracePeriod,
    };

    try {
      const res = await createTeam(params);
      const team: TeamItem = res.data.team;
      team.users = [{id: currentUser.id, name: currentUser.name, image: currentUser.image}];
      if (teamList && setTeamList) {
        setTeamList([team, ...teamList]);
      }
      setOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Dialog className={classes.dialog} open={open} onClose={handleClose} fullWidth>
        <form noValidate autoComplete="off">
          <DialogContent>
            <InputLabel className={classes.inputLabel}>チーム名</InputLabel>
            <TextField
              variant="outlined"
              required
              fullWidth
              value={name}
              margin="dense"
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
            <InputLabel className={classes.inputLabel}>チーム説明</InputLabel>
            <TextField
              variant="outlined"
              required
              multiline
              rows={4}
              fullWidth
              value={description}
              margin="dense"
              onChange={(event) => {
                setDescription(event.target.value);
              }}
            />
            <Box display={'flex'} className={classes.box}>
              <InputLabel className={classes.inputLabel}>公開設定</InputLabel>
              <Select value={visibilitySetting} onChange={handleChangeVisibilitySetting}>
                <MenuItem value="close">クローズ</MenuItem>
                <MenuItem value="open">オープン</MenuItem>
              </Select>
            </Box>
            <Box display={'flex'} className={classes.box}>
              <InputLabel className={classes.inputLabel}>性別制限</InputLabel>
              <Select value={genderRestriction} onChange={handleChangeGenderRestriction}>
                <MenuItem value="none">指定なし</MenuItem>
                <MenuItem value="man">男性</MenuItem>
                <MenuItem value="woman">女性</MenuItem>
              </Select>
            </Box>
            <Box display={'flex'} className={classes.box}>
              <InputLabel className={classes.inputLabel}>自動退出猶予期間</InputLabel>
              <Select value={autoExitGracePeriod} onChange={handleChangeAutoExitGracePeriod}>
                <MenuItem value={0}>0</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={7}>7</MenuItem>
              </Select>
              日間
            </Box>
          </DialogContent>
          <DialogActions className={classes.dialogActions}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              color="primary"
              onClick={handleTeamCreateBtnClick}
              disabled={!name || !description ? true : false}
            >
              チームを作成
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default TeamCreateDialog;
