import React from 'react';
import {Fab, Icon} from 'native-base';
import {StyleSheet} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const FabButton = ({isShow, onPressFabHandler}) => {
  return (
    <>
      {isShow ? (
        <Fab
          position="absolute"
          style={styles.fabGoTop}
          size="sm"
          renderInPortal={false}
          onPress={onPressFabHandler}
          icon={<Icon color="white" as={<AntDesign name="up" />} size="sm" />}
        />
      ) : (
        <></>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  fabGoTop: {backgroundColor: 'black', bottom: 50},
});

export default FabButton;
