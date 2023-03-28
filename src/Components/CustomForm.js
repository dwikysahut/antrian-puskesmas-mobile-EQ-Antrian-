import React from 'react';

import {FormControl, Input} from 'native-base';
import ErrorForm from './ErrorForm';
import {keyboardType} from 'deprecated-react-native-prop-types/DeprecatedTextInputPropTypes';

const CustomForm = ({
  isValid,
  values,
  handleChange,
  errors,
  maxLength = 100,
  keyboardType,
  placeholder,
}) => {
  return (
    <FormControl isRequired isInvalid={!isValid}>
      <Input
        variant="underlined"
        placeholder={placeholder}
        keyboardType={keyboardType}
        maxLength={maxLength}
        value={values}
        onChangeText={handleChange}
      />
      {errors && <ErrorForm text={errors} />}
    </FormControl>
  );
};

export default CustomForm;
