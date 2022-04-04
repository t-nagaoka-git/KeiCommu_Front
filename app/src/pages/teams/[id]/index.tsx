import {useRouter} from 'next/router';
import {AuthContext} from '../../_app';
import {useContext, useState, useRef, useEffect} from 'react';
import {TeamItem} from '@/interfaces/models/team';
import {TeamMessageItem} from '@/interfaces/models/teamMessage';
import {getTeamDetail} from '@/apis/teams';
import {getTeamMessageList} from '@/apis/teamMessages';
import {Template} from '@/components/templates/teams/[id]';

export default function Page() {
  const router = useRouter();
  const {currentUser} = useContext(AuthContext);
  const [team, setTeam] = useState<TeamItem>(null);
  const [teamMessageList, setTeamMessageList] = useState<TeamMessageItem[]>([]);
  const [receivedTeamMessage, setReceivedTeamMessage] = useState<TeamMessageItem>(null);

  const id = Number(router.query.id);
  const isFirstRender = useRef(true);

  const GetTeamDetail = async () => {
    try {
      const res = await getTeamDetail(id);
      setTeam(res.data.team);
    } catch (err) {
      console.log(err);
    }
  };

  const GetTeamMessageList = async () => {
    try {
      const res = await getTeamMessageList(id);
      setTeamMessageList(res.data.teamMessages);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    GetTeamDetail();
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setTeamMessageList([...teamMessageList, receivedTeamMessage]);
  }, [receivedTeamMessage]);

  return (
    <Template
      teamId={id}
      team={team}
      teamMessageList={teamMessageList}
      getTeamMessageList={GetTeamMessageList}
      setReceivedTeamMessage={setReceivedTeamMessage}
      currentUser={currentUser}
    />
  );
}
