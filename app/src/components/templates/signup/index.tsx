import React from 'react';
import Cookies from 'js-cookie';
import {signUp} from '@/apis/auth';
import {SignUpParams} from '@/interfaces/index';
import {Button} from '@/components/atoms/Button';
import {InputText} from '@/components/atoms/InputText';
import {InputRadio} from '@/components/atoms/InputRadio';
import {InputPassword} from '@/components/atoms/InputPassword';

export function Template() {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [gender, setGender] = React.useState('man');

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
      <div>
        <p>アカウントを作成する</p>
        <p>名前</p>
        <InputText
          type="text"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <p>メールアドレス</p>
        <InputText
          type="text"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <p>パスワード</p>
        <InputPassword
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <p>性別</p>
        <InputRadio
          name="gender"
          value="man"
          onChange={(event) => {
            setGender(event.target.value);
          }}
          checked
        />
        男性
        <InputRadio
          name="gender"
          value="woman"
          onChange={(event) => {
            setGender(event.target.value);
          }}
        />
        女性
        <Button onClick={handleSubmit}>アカウントを作成</Button>
      </div>
    </form>
  );
}
