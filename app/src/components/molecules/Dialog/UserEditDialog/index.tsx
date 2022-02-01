import {makeStyles, Theme} from '@material-ui/core/styles';
import {Dispatch, SetStateAction, useState, useCallback} from 'react';
import {User, Profile} from '@/interfaces/models/user';
import {editUserParams} from '@/interfaces';
import {editUser} from '@/apis/auth';
import {Button, Dialog, DialogContent, Avatar, InputLabel, TextField, DialogActions} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  dialog: {
    maxWidth: 500,
    margin: 'auto',
  },
  input: {
    display: 'none',
  },
  avatar: {
    width: 90,
    height: 90,
    cursor: 'pointer',
    margin: 'auto',
    marginBottom: theme.spacing(2),
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
  user: Profile;
  setUser: Dispatch<SetStateAction<Profile>>;
};

const UserEditDialog = ({open, setOpen, currentUser, setCurrentUser, user, setUser}: DialoggPropsType) => {
  const classes = useStyles();
  const [name, setName] = useState<string>(currentUser.name);
  const [email, setEmail] = useState<string>(currentUser.email);
  const [description, setDescription] = useState<string>(currentUser.description);
  const [image, setImage] = useState<File>();
  const [preview, setPreview] = useState<string>('');

  const uploadImage = useCallback((e) => {
    const file = e.target.files[0];
    setImage(file);
  }, []);
  const previewImage = useCallback((e) => {
    const file = e.target.files[0];
    setPreview(window.URL.createObjectURL(file));
  }, []);

  const handleClose = () => {
    setImage(undefined);
    setPreview('');
    setOpen(false);
  };
  const handleUserEditBtnClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!currentUser) return;

    const params: editUserParams = {
      name: name,
      image: image,
      email: email,
      description: description,
    };

    try {
      const res = await editUser(params);
      const userData: User = res.data.data;
      setCurrentUser(userData);
      setUser({
        ...user,
        name: name,
        email: email,
        description: description,
        image: preview ? preview : user.image,
      });
      setImage(undefined);
      setPreview('');
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
            <label htmlFor="icon-button-file">
              <input
                accept="image/*"
                className={classes.input}
                id="icon-button-file"
                type="file"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  uploadImage(e);
                  previewImage(e);
                }}
              />
              {preview ? (
                <Avatar src={preview} className={classes.avatar} />
              ) : (
                <Avatar src={user.image} className={classes.avatar} />
              )}
            </label>
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
