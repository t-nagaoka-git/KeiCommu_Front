import {Dispatch, SetStateAction, useEffect} from 'react';
import actionCable from 'actioncable';
import {cableUrl} from '@/urls';

type CablePropsType<T> = {
  channelName: string;
  id: number;
  dataList: T[];
  setDataList: Dispatch<SetStateAction<T[]>>;
};

const Cable = <T,>({channelName, id, dataList, setDataList}: CablePropsType<T>) => {
  const cable = actionCable.createConsumer(cableUrl);

  useEffect(() => {
    cable.subscriptions.create(
      {channel: channelName, id: id},
      {
        received: (teamMessage: T) => {
          setDataList([...dataList, teamMessage]);
        },
      }
    );
  }, []);

  return <></>;
};

export default Cable;
