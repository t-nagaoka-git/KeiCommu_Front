import {MicropostItem} from '@/interfaces/models/micropost';
import {Dispatch, SetStateAction} from 'react';
import MicropostForm from '../molecules/Form/MicropostForm';
import MicropostList from '../molecules/List/MicropostList';

type TemplatePropsType = {
  micropostList: MicropostItem[] | [];
  setMicropostList: Dispatch<SetStateAction<MicropostItem[]>>;
};

export function Template({micropostList, setMicropostList}: TemplatePropsType) {
  return (
    <>
      <MicropostForm micropostList={micropostList} setMicropostList={setMicropostList} />
      {0 < micropostList.length && <MicropostList micropostList={micropostList} setMicropostList={setMicropostList} />}
    </>
  );
}
