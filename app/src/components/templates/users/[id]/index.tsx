import {User, Profile as IProfile} from '@/interfaces/models/user';
import {MicropostItem} from '@/interfaces/models/micropost';
import {Dispatch, SetStateAction} from 'react';
import Profile from '@/components/molecules/Profile';
import MicropostList from '@/components/molecules/List/MicropostList';

type TemplatePropsType = {
  currentUser: User;
  setCurrentUser: Dispatch<SetStateAction<User>>;
  user: IProfile | null;
  setUser: Dispatch<SetStateAction<IProfile>>;
  micropostList: MicropostItem[] | [];
};

export function Template({currentUser, setCurrentUser, user, setUser, micropostList}: TemplatePropsType) {
  return (
    <>
      <Profile currentUser={currentUser} setCurrentUser={setCurrentUser} user={user} setUser={setUser} />
      {0 < micropostList.length && <MicropostList micropostList={micropostList} />}
    </>
  );
}
