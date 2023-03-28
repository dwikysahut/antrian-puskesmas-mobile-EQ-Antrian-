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

  headline: {
    fontSize: 32,
    lineHeight: 35 * 0.75,
    paddingTop: 35 - 35 * 0.75,
    color: 'black',
    fontFamily: 'JosefinSans-Bold',
  },
  subHeadline: {
    fontSize: 25,
    lineHeight: 35 * 0.75,
    paddingTop: 35 - 35 * 0.75,

    marginBottom: 30,
    color: 'lightgrey',
    fontFamily: 'JosefinSans-Bold',
  },
});

export default styles;
