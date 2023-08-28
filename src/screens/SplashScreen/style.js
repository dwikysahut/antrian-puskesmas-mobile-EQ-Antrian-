import {Colors} from 'react-native/Libraries/NewAppScreen';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  containerImage: {
    zIndex: 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
    height: 200,
    marginBottom: 50,
  },
  image: {},
  welcomeText: {
    fontSize: 32,
    lineHeight: 35 * 0.75,
    paddingTop: 35 - 35 * 0.75,
    color: 'black',
    fontFamily: 'JosefinSans-Bold',
  },
});

export default styles;
