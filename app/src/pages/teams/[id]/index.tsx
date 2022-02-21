import {useRouter} from 'next/router';
import {AuthContext} from '../../_app';
import {useContext, useState, useRef, useEffect} from 'react';
import {TeamMessageItem} from '@/interfaces/models/teamMessage';
import {getTeamMessageList} from '@/apis/teamMessages';
import {Template} from '@/components/templates/teams/[id]';

export default function Page() {
  const router = useRouter();
  const {currentUser} = useContext(AuthContext);
  const [teamMessageList, setTeamMessageList] = useState<TeamMessageItem[]>([]);
  const [receivedTeamMessage, setReceivedTeamMessage] = useState<TeamMessageItem>(null);

  const id = Number(router.query.id);
  const isFirstRender = useRef(true);

  const GetTeamMessageList = async () => {
    try {
      const res = await getTeamMessageList(id);
      setTeamMessageList(res.data.teamMessages);
    } catch (err) {
      console.log(err);
    }
  };

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
      teamMessageList={teamMessageList}
      getTeamMessageList={GetTeamMessageList}
      setReceivedTeamMessage={setReceivedTeamMessage}
      currentUser={currentUser}
    />
  );
}
