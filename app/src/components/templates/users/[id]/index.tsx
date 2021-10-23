import {User} from '@/interfaces/models/user';
import {MicropostItem} from '@/interfaces/models/micropost';
import React from 'react';
import Profile from '@/components/molecules/Profile';
import MicropostList from '@/components/molecules/List/MicropostList';

type TemplatePropsType = {
  user: User | null;
  micropostList: MicropostItem[] | [];
};

export function Template({user, micropostList}: TemplatePropsType) {
  return (
    <>
      <Profile user={user} />
      {0 < micropostList.length && <MicropostList micropostList={micropostList} />}
    </>
  );
}
