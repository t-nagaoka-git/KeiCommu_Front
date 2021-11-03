import {useContext, useState, useEffect} from 'react';
import {AuthContext} from '../_app';
import {TeamItem} from '@/interfaces/models/team';
import {useRouter} from 'next/router';
import {getTeamDetailList} from '@/apis/teams';
import {Template} from '@/components/templates/teams';

export default function Page() {
  const {isLoggedIn, currentUser} = useContext(AuthContext);
  const [teamList, setTeamList] = useState<TeamItem[]>([]);
  const router = useRouter();

  const handleGetTeams = async () => {
    try {
      const res = await getTeamDetailList();
      console.log(res);
      setTeamList(res.data.teams);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!isLoggedIn || !currentUser) {
      router.push('/login');
    } else {
      handleGetTeams();
    }
  }, []);

  return <Template teamList={teamList} setTeamList={setTeamList} currentUser={currentUser} />;
}
