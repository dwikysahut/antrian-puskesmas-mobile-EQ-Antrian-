import React from 'react';
import {
  Image,
  View,
  Dimensions,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MenuItem from './MenuItem';

const ProfileMenu = ({
  onPressKartuIdentitasHandler,
  onPressTentangHandler,
  onPressHubungiHandler,
  onPressKeluarHandler,
}) => {
  return (
    <View style={styles.innerWrapper}>
      <MenuItem
        menuName="Kartu Identitas"
        onPressHandler={onPressKartuIdentitasHandler}
        isFirst={true}
      />
      <MenuItem
        menuName="Tentang Aplikasi"
        onPressHandler={onPressTentangHandler}
      />
      <MenuItem
        menuName="Hubungi Kami"
        onPressHandler={onPressHubungiHandler}
      />
      <MenuItem menuName="Keluar" onPressHandler={onPressKeluarHandler} />
    </View>
  );
};
const styles = StyleSheet.create({
  innerWrapper: {
    alignItems: 'flex-start',
    marginHorizontal: 50,
    marginTop: 50,
    flex: 1,
  },
  menuList: {},
});
export default ProfileMenu;
