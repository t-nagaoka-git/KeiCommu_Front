import {Dispatch, SetStateAction, useEffect} from 'react';
import actionCable from 'actioncable';
import {cableUrl} from '@/urls';

type CablePropsType<T> = {
  channelName: string;
  id: number;
  getDataList: () => Promise<void>;
  setReceivedData: Dispatch<SetStateAction<T>>;
};

const Cable = <T,>({channelName, id, getDataList, setReceivedData}: CablePropsType<T>) => {
  const cable = actionCable.createConsumer(cableUrl);

  useEffect(() => {
    getDataList();
    cable.subscriptions.create(
      {channel: channelName, id: id},
      {
        received: (data: T) => {
          setReceivedData(data);
        },
      }
    );
  }, []);

  return <></>;
};

export default Cable;
