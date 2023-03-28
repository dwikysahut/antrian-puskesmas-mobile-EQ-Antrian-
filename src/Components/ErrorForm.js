import React from 'react';
import {FormControl} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';

const ErrorForm = ({text}) => {
  return (
    <FormControl.ErrorMessage
      leftIcon={<AntDesign name="warning" color="red" />}>
      {text}
    </FormControl.ErrorMessage>
  );
};

export default ErrorForm;
