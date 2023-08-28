import React, {useEffect} from 'react';
import {Alert} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import {CHANNEL_ID} from './CONSTANT';
const NotificationController = props => {
  useEffect(() => {
    //untuk FCM Push notif saat foreground maka ditangkap dan jadi local notification
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      PushNotification.localNotification({
        channelId: CHANNEL_ID,
        message: remoteMessage.notification.body,
        title: remoteMessage.notification.title,
      });
    });
    return unsubscribe;
  }, []);
  return null;
};
export default NotificationController;
