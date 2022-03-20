import {TeamMessageItem} from '@/interfaces/models/teamMessage';
import {User} from '@/interfaces/models/user';
import MyChatMessage from '../../Message/MyChatMessage';
import OtherChatMessage from '../../Message/OherChatMessage';
import moment from 'moment';

type ListPropsType = {
  teamMessageList: TeamMessageItem[] | [];
  currentUser: User;
};

const ChatMessageList = ({teamMessageList, currentUser}: ListPropsType) => {
  return (
    <>
      {teamMessageList.map((teamMessage: TeamMessageItem, index: number) => (
        <>
          {teamMessage.user.id == currentUser.id ? (
            <MyChatMessage
              message={teamMessage.content}
              imageUrl={teamMessage.image.url}
              timestamp={moment(teamMessage.createdAt).format('YYYY年MM月DD日 HH:mm')}
            />
          ) : (
            <OtherChatMessage
              message={teamMessage.content}
              imageUrl={teamMessage.image.url}
              timestamp={moment(teamMessage.createdAt).format('YYYY年MM月DD日 HH:mm')}
              photoURL={teamMessage.user.image.url}
              displayName={teamMessage.user.name}
            />
          )}
        </>
      ))}
    </>
  );
};

export default ChatMessageList;
