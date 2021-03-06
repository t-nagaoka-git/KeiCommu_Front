import {createContext, useState, useEffect} from 'react';
import type {AppProps} from 'next/app';
import {User} from '@/interfaces/models/user';
import {Layout} from '@/components/organisms/Layout';
import {getCurrentUser} from '@/apis/auth';
import '../styles/globals.css';

export const AuthContext = createContext(
  {} as {
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    isLoggedIn: boolean;
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
    currentUser: User | undefined;
    setCurrentUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  }
);

export default function MyApp({Component, pageProps}: AppProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | undefined>();

  const handleGetCurrentUser = async () => {
    try {
      const res = await getCurrentUser();

      if (res?.data.isLogin === true) {
        setIsLoggedIn(true);
        setCurrentUser(res?.data.data);
      } else {
        console.log('No current user');
      }
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);

  useEffect(() => {
    handleGetCurrentUser();
  }, [setCurrentUser]);

  return (
    <AuthContext.Provider value={{loading, setLoading, isLoggedIn, setIsLoggedIn, currentUser, setCurrentUser}}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthContext.Provider>
  );
}
