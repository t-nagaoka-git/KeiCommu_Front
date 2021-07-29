import {GetStaticProps} from 'next';
import {useRouter} from 'next/router';
import {useEffect, useContext} from 'react';
import {AuthContext} from '@/pages/_app';
import {Template} from '@/components/templates';

export const getStaticProps: GetStaticProps = async () => {
  return {props: {}};
};

export default function Page() {
  const router = useRouter();
  const {isLoggedIn} = useContext(AuthContext);
  useEffect(() => {
    console.log(isLoggedIn);
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, []);

  return (
    <>
      <Template />
    </>
  );
}
