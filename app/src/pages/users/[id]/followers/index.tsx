import {useContext, useState, useEffect} from 'react';
import {AuthContext} from '../../../_app';
import {User} from '@/interfaces/models/user';
import {useRouter} from 'next/router';
import {getFollowerList} from '@/apis/users';
import {Template} from '@/components/templates/users/[id]/followers';

export default function Page() {
  const {isLoggedIn} = useContext(AuthContext);
  const [users, setUsers] = useState<User[]>([]);
  const router = useRouter();
  const id = Number(router.query.id);

  const handleGetFollowerList = async () => {
    try {
      const res = await getFollowerList(id);
      console.log(res);
      setUsers(res.data.users);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
    } else {
      handleGetFollowerList();
    }
  }, []);

  return (
    <>
      <Template users={users} />
    </>
  );
}
