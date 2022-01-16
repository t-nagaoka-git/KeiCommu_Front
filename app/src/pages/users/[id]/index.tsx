import {useRouter} from 'next/router';
import {AuthContext} from '../../_app';
import {useState, useContext, useEffect} from 'react';
import {User} from '@/interfaces/models/user';
import {MicropostItem} from '@/interfaces/models/micropost';
import {getUser} from '@/apis/users';
import {indexMicropost} from '@/apis/microposts';
import {Template} from '@/components/templates/users/[id]';
import Loading from '@/components/atoms/Loading';

export default function Page() {
  const router = useRouter();
  const {currentUser, setCurrentUser} = useContext(AuthContext);
  const [user, setUser] = useState<User>(null);
  const [micropostList, setMicropostList] = useState<MicropostItem[]>([]);

  const id = Number(router.query.id);

  const handleGetUser = async () => {
    try {
      const res = await getUser(id);
      setUser(res.data.user);
    } catch (err) {
      console.log(err);
    }
  };
  const handleGetMicroposts = async () => {
    try {
      const res = await indexMicropost();
      setMicropostList(res.data.microposts);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleGetUser();
    handleGetMicroposts();
  }, []);

  return (
    <>
      {user && micropostList ? (
        <Template
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          user={user}
          setUser={setUser}
          micropostList={micropostList}
        />
      ) : (
        <Loading />
      )}
    </>
  );
}
