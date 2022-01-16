import {makeStyles, Theme} from '@material-ui/core/styles';
import {Dispatch, SetStateAction, useState} from 'react';
import {User} from '@/interfaces/models/user';
import {editUserParams} from '@/interfaces';
import {editUser} from '@/apis/auth';
import {Button, Dialog, DialogContent, InputLabel, TextField, DialogActions} from '@material-ui/core';

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
  currentUser: User;
  setCurrentUser: Dispatch<SetStateAction<User>>;
  setUser: Dispatch<SetStateAction<User>>;
};

const UserEditDialog = ({open, setOpen, currentUser, setCurrentUser, setUser}: DialoggPropsType) => {
  const classes = useStyles();
  const [name, setName] = useState<string>(currentUser.name);
  const [email, setEmail] = useState<string>(currentUser.email);
  const [description, setDescription] = useState<string>(currentUser.description);

  const handleClose = () => {
    setOpen(false);
  };
  const handleUserEditBtnClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!currentUser) return;

    const params: editUserParams = {
      name: name,
      email: email,
      description: description,
    };

    try {
      const res = await editUser(params);
      const user: User = res.data.data;
      setCurrentUser(user);
      setUser(user);
      setOpen(false);
    } catch (err) {
      console.log(err);
      setOpen(false);
    }
  };

  return (
    <>
      <Dialog className={classes.dialog} open={open} onClose={handleClose} fullWidth>
        <form noValidate autoComplete="off">
          <DialogContent>
            <InputLabel className={classes.inputLabel}>メールアドレス</InputLabel>
            <TextField
              variant="outlined"
              required
              fullWidth
              value={email}
              margin="dense"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
            <InputLabel className={classes.inputLabel}>名前</InputLabel>
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
            <InputLabel className={classes.inputLabel}>自己紹介</InputLabel>
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
          </DialogContent>
          <DialogActions className={classes.dialogActions}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              color="primary"
              onClick={handleUserEditBtnClick}
              disabled={!name || !email ? true : false}
            >
              保存
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default UserEditDialog;
