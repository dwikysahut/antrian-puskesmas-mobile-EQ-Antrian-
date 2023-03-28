import {Colors} from 'react-native/Libraries/NewAppScreen';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  inner: {
    padding: 25,
    marginTop: 30,
    flex: 1,
    justifyContent: 'flex-end',
  },
  containerImage: {
    zIndex: 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
    marginTop: 20,
  },
  image: {
    width: 200,
    height: 200,
  },
  headline: {
    fontSize: 32,
    lineHeight: 35 * 0.75,
    paddingTop: 35 - 35 * 0.75,

    color: 'black',
    fontFamily: 'JosefinSans-Bold',
  },
  subHeadline: {
    fontSize: 16,
    lineHeight: 35 * 0.75,
    paddingTop: 35 - 35 * 0.75,
    marginTop: 40,
    marginBottom: 20,

    color: 'dimgrey',
    fontFamily: 'JosefinSans-Bold',
  },
  boldText: {
    fontWeight: '900',
    color: 'black',
  },
});

export default styles;
