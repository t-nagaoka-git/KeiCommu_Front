import React from 'react';
import {signIn} from '@/apis/auth';
import {SignInParams} from '@/interfaces/index';
import Cookies from 'js-cookie';
import Link from 'next/link';
import {Button} from '@/components/atoms/Button';
import {InputText} from '@/components/atoms/InputText';

export function Template() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

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

        console.log('Signed in successfully!');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
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
  );
}
