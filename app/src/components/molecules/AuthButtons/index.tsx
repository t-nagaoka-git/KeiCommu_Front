import {useContext} from 'react';
import {AuthContext} from '@/pages/_app';
import {signOut} from '@/apis/auth';
import Cookies from 'js-cookie';
import {useRouter} from 'next/router';
import Button from '@material-ui/core/Button';
import Link from 'next/link';

const AuthButtons = () => {
  const router = useRouter();
  const {loading, isLoggedIn, setIsLoggedIn} = useContext(AuthContext);

  const handleSignOut = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const res = await signOut();

      if (res.data.success === true) {
        Cookies.remove('_access_token');
        Cookies.remove('_client');
        Cookies.remove('_uid');

        setIsLoggedIn(false);
        router.push('/login');

        console.log('Succeeded in sign out');
      } else {
        console.log('Failed in sign out');
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (isLoggedIn) {
    return (
      <Button color="inherit" onClick={handleSignOut}>
        Logout
      </Button>
    );
  } else {
    return (
      <>
        <Link href="/login">
          <Button color="inherit">Login</Button>
        </Link>
        <Link href="/signup">
          <Button color="inherit">Sign Up</Button>
        </Link>
      </>
    );
  }
};

export default AuthButtons;
