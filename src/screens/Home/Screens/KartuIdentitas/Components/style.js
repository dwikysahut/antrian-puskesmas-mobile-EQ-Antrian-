import {StyleSheet} from 'react-native';
import {color} from '../../../../../utils/Color';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  item: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 10,
    height: 100,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 19,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 17,
  },
  buttonDetailWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnDetail: {
    justifyContent: 'center',
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    backgroundColor: color.main,

    elevation: 6,
    paddingVertical: 15,
    width: '100%',
    borderRadius: 8,

    alignItems: 'center',
  },
});

export default styles;
