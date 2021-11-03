import {useContext, useEffect} from 'react';
import {AuthContext} from '../_app';
import {useRouter} from 'next/router';
import {Template} from '@/components/templates/search';

export default function Page() {
  const {isLoggedIn, currentUser} = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn || !currentUser) {
      router.push('/login');
    }
  }, []);

  return (
    <>
      <Template currentUser={currentUser} />
    </>
  );
}
