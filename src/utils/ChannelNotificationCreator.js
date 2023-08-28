import PushNotification from 'react-native-push-notification';
import {CHANNEL_ID, URL_BASE} from './CONSTANT';
export const createChannel = () => {
  PushNotification.createChannel(
    {
      channelId: CHANNEL_ID, // (required)
      channelName: 'EQ Puskesmas Notification', // (required)
      channelDescription: 'Notification for EQ Puskesmas', // (optional) default: undefined.
      importance: 4, // (optional) default: 4. Int value of the Android notification importance
      vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
    },
    created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
  );
};
