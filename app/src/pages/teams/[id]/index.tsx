import {useRouter} from 'next/router';
import {AuthContext} from '../../_app';
import {useContext, useState, useEffect} from 'react';
import {TeamMessageItem} from '@/interfaces/models/teamMessage';
import {getTeamMessageList} from '@/apis/teamMessages';
import {Template} from '@/components/templates/teams/[id]';

export default function Page() {
  const router = useRouter();
  const {currentUser} = useContext(AuthContext);
  const [teamMessageList, setTeamMessageList] = useState<TeamMessageItem[]>([]);

  const id = Number(router.query.id);

  const GetTeamMessageList = async () => {
    try {
      const res = await getTeamMessageList(id);
      setTeamMessageList(res.data.teamMessages);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    GetTeamMessageList();
  }, []);

  return <Template teamMessageList={teamMessageList} currentUser={currentUser} />;
}
