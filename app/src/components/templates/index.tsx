import {useContext} from 'react';
import {AuthContext} from '@/pages/_app';
import MicropostForm from '../molecules/Form/MicropostForm';

export function Template() {
  const {isLoggedIn, currentUser} = useContext(AuthContext);
  return <>{isLoggedIn && currentUser ? <MicropostForm /> : <h1>Not signed in</h1>}</>;
}
