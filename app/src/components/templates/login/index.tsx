import {useContext, useState} from 'react';
import {AuthContext} from '@/pages/_app';
import {SignInParams} from '@/interfaces/index';
import {signIn} from '@/apis/auth';
import Cookies from 'js-cookie';
import {useRouter} from 'next/router';
import Link from 'next/link';
import {InputText} from '@/components/atoms/InputText';
import {Button} from '@/components/atoms/Button';
import AlertMessage from '@/components/atoms/AlertMessage';

export function Template() {
  const {isLoggedIn, setIsLoggedIn, setCurrentUser} = useContext(AuthContext);
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
      console.log(res);

      if (res.status === 200) {
        Cookies.set('_access_token', res.headers['access-token']);
        Cookies.set('_client', res.headers['client']);
        Cookies.set('_uid', res.headers['uid']);

        setIsLoggedIn(true);
        console.log('setIsLoggedIn' + isLoggedIn);
        setCurrentUser(res.data.data);

        console.log('Signed in successfully!');

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
        <div>
          <p>アカウントをお持ちでない方はこちら</p>
          <Link href={`/signup`}>新規会員登録</Link>
          <InputText
            type="text"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <InputText
            type="password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <Button onClick={handleSubmit}>ログイン</Button>
        </div>
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
