import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'justify',
    marginBottom: 15,
  },
  bodyText: {
    fontSize: 18,
    padding: 5,
    textAlign: 'justify',
    lineHeight: 30,
  },
  textWrapper: {
    textAlign: 'justify',
    padding: 10,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
});

export default styles;
