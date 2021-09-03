import {makeStyles, Theme} from '@material-ui/core/styles';
import React from 'react';
import Cookies from 'js-cookie';
import {signUp} from '@/apis/auth';
import {SignUpParams} from '@/interfaces/index';
import {Card, CardContent, CardHeader, TextField, Button} from '@material-ui/core';
import {ToggleButtonGroup, ToggleButton} from '@material-ui/lab';

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    padding: theme.spacing(2),
    maxWidth: 500,
  },
  header: {
    textAlign: 'center',
  },
  toggle: {
    marginTop: theme.spacing(1),
    width: '100%',
  },
  toggleBtn: {
    width: '50%',
  },
  submitBtn: {
    marginTop: theme.spacing(2),
  },
}));

export function Template() {
  const classes = useStyles();

  const [name, setName] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [gender, setGender] = React.useState<string>('man');

  const handleChnageGender = (e: React.MouseEvent<HTMLButtonElement>, value: any) => {
    if (value !== null) {
      setGender(value);
    }
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const params: SignUpParams = {
      name: name,
      email: email,
      password: password,
      gender: gender,
    };

    try {
      const res = await signUp(params);
      console.log(res);

      if (res.status === 200) {
        // アカウント作成と同時にログイン
        Cookies.set('_access_token', res.headers['access-token']);
        Cookies.set('_client', res.headers['client']);
        Cookies.set('_uid', res.headers['uid']);

        console.log('Signed in successfully!');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form noValidate autoComplete="off">
      <Card className={classes.card}>
        <CardContent>
          <CardHeader className={classes.header} title="アカウントを作成する" />
          <TextField
            variant="outlined"
            required
            fullWidth
            label="名前"
            value={name}
            margin="dense"
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
          <TextField
            variant="outlined"
            required
            fullWidth
            label="メールアドレス"
            value={email}
            margin="dense"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <TextField
            variant="outlined"
            required
            fullWidth
            label="パスワード"
            value={password}
            margin="dense"
            autoComplete="new-password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <ToggleButtonGroup
            color="primary"
            exclusive
            size="small"
            value={gender}
            className={classes.toggle}
            onChange={handleChnageGender}
          >
            <ToggleButton value="man" className={classes.toggleBtn}>
              男性
            </ToggleButton>
            <ToggleButton value="woman" className={classes.toggleBtn}>
              女性
            </ToggleButton>
          </ToggleButtonGroup>
          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            color="primary"
            disabled={!name || !email || !password || !gender ? true : false}
            className={classes.submitBtn}
            onClick={handleSubmit}
          >
            アカウントを作成
          </Button>
        </CardContent>
      </Card>
    </form>
  );
}
