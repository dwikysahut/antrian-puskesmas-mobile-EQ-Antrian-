import {Colors} from 'react-native/Libraries/NewAppScreen';
import {StyleSheet, Dimensions} from 'react-native';
var {height} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  inner: {
    marginHorizontal: 20,
    padding: 5,
    marginVertical: 10,

    flex: 1,
    justifyContent: 'flex-end',
  },
  containerImage: {
    zIndex: 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: height * 0.3,
    marginTop: 30,
    marginBottom: 10,
  },
  image: {
    width: 200,
    height: 200,
  },
  headline: {
    fontSize: 32,
    lineHeight: 35 * 0.75,
    paddingTop: 35 - 35 * 0.75,
    marginTop: '10%',

    color: 'black',
    fontFamily: 'JosefinSans-Bold',
  },
  subHeadline: {
    fontSize: 25,
    marginTop: 5,
    lineHeight: 35 * 0.75,
    paddingTop: 35 - 35 * 0.75,

    color: 'darkgrey',
    fontFamily: 'JosefinSans-Bold',
  },
});

export default styles;
