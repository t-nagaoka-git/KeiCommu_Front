import {useContext} from 'react';
import {AuthContext} from '@/pages/_app';

export function Template() {
  const {isLoggedIn, currentUser} = useContext(AuthContext);
  return (
    <>
      {isLoggedIn && currentUser ? (
        <>
          <h1>Signed in successfully!</h1>
          <h2>Email: {currentUser?.email}</h2>
          <h2>Name: {currentUser?.name}</h2>
        </>
      ) : (
        <h1>Not signed in</h1>
      )}
    </>
  );
}
