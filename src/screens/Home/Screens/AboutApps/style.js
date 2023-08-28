import {Colors} from 'react-native/Libraries/NewAppScreen';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
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
    marginBottom: 30,
    marginTop: 50,
  },
  image: {},
  welcomeText: {
    fontSize: 32,
    padding: 14,
    color: 'black',
    fontFamily: 'JosefinSans-Bold',
  },
});

export default styles;
