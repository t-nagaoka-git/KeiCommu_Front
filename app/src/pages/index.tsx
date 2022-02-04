import {useContext, useState, useEffect} from 'react';
import {AuthContext} from '@/pages/_app';
import {MicropostItem} from '@/interfaces/models/micropost';
import {getTimeline} from '@/apis/microposts';
import {Template} from '@/components/templates';

export default function Page() {
  const {isLoggedIn, currentUser} = useContext(AuthContext);
  const [micropostList, setMicropostList] = useState<MicropostItem[]>([]);

  const handleGetMicroposts = async () => {
    if (isLoggedIn && currentUser) {
      try {
        const res = await getTimeline();
        setMicropostList(res.data.microposts);
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    handleGetMicroposts();
  }, []);

  return (
    <>
      {isLoggedIn && currentUser ? (
        <>
          <Template micropostList={micropostList} setMicropostList={setMicropostList} />
        </>
      ) : (
        <h1>Not signed in</h1>
      )}
    </>
  );
}
