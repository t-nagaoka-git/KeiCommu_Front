import {makeStyles, Theme} from '@material-ui/core/styles';
import {useContext, useState} from 'react';
import {AuthContext} from '@/pages/_app';
import {SignInParams} from '@/interfaces/index';
import {signIn} from '@/apis/auth';
import Cookies from 'js-cookie';
import {useRouter} from 'next/router';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AlertMessage from '@/components/atoms/AlertMessage';

const useStyles = makeStyles((theme: Theme) => ({
  btn: {
    marginTop: theme.spacing(1),
  },
  card: {
    margin: theme.spacing(1),
    padding: theme.spacing(2),
    maxWidth: 500,
  },
}));

export function Template() {
  const {isLoggedIn, setIsLoggedIn, setCurrentUser} = useContext(AuthContext);
  const classes = useStyles();
  const router = useRouter();

  if (isLoggedIn) router.push('/');

  const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const params: SignInParams = {
      email: email,
      password: password,
    };

    try {
      const res = await signIn(params);

      if (res.status === 200) {
        Cookies.set('_access_token', res.headers['access-token']);
        Cookies.set('_client', res.headers['client']);
        Cookies.set('_uid', res.headers['uid']);

        setIsLoggedIn(true);
        setCurrentUser(res.data.data);

        router.push('/');
      } else {
        setAlertMessageOpen(true);
      }
    } catch (err) {
      console.log(err);
      setAlertMessageOpen(true);
    }
  };

  return (
    <>
      <form noValidate autoComplete="off">
        <Card className={classes.card}>
          <CardContent>
            <Box textAlign="center">
              <Typography variant="body2">アカウントをお持ちでない方はこちら</Typography>
            </Box>
            <Link href={`/signup`}>
              <Button variant="contained" size="large" fullWidth color="primary" className={classes.btn}>
                新規会員登録
              </Button>
            </Link>
          </CardContent>
        </Card>
        <Card className={classes.card}>
          <CardContent>
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
              type="password"
              value={password}
              margin="dense"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              color="primary"
              disabled={!email || !password ? true : false}
              className={classes.btn}
              onClick={handleSubmit}
            >
              ログイン
            </Button>
          </CardContent>
        </Card>
      </form>
      <AlertMessage
        open={alertMessageOpen}
        setOpen={setAlertMessageOpen}
        severity="error"
        message="メールアドレスまたはパスワードが違います"
      />
    </>
  );
}
