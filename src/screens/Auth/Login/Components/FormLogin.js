import {View, TouchableOpacity} from 'react-native';
import ErrorForm from '../../../../Components/ErrorForm';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {
  Input,
  Text,
  Stack,
  Pressable,
  Icon,
  Button,
  FormControl,
} from 'native-base';
import React from 'react';
import LoaderIndicator from '../../../../Components/LoaderIndicator';
import {color} from '../../../../utils/Color';

const FormLogin = ({
  isValid,
  values,
  handleChange,
  errors,
  show,
  setShow,
  forgotPasswordNavigation,
  navigation,
  handleSubmit,
  isLoading,
}) => {
  return (
    <Stack space={2} w="100%" maxW="350px" mx="auto">
      <FormControl isInvalid={!isValid}>
        <Input
          variant="underlined"
          placeholder="NIK / User ID"
          value={values.user_id}
          maxLength={16}
          keyboardType="numeric"
          focusOutlineColor="green.700"
          onChangeText={handleChange('user_id')}
        />
        <Text style={{fontSize: 13, color: 'darkgrey'}}>
          {values.user_id.length}/16
        </Text>
        {errors.user_id && <ErrorForm text={errors.user_id} />}
      </FormControl>
      <FormControl isInvalid={!isValid}>
        <Input
          variant="underlined"
          type={show ? 'text' : 'password'}
          value={values.password}
          focusOutlineColor="green.700"
          onChangeText={handleChange('password')}
          InputRightElement={
            <Pressable onPress={() => setShow(!show)}>
              <Icon
                as={
                  <MaterialIcons
                    name={show ? 'visibility' : 'visibility-off'}
                  />
                }
                size={5}
                mr="2"
                color="muted.400"
              />
            </Pressable>
          }
          placeholder="Password"
        />

        {errors.password && <ErrorForm text={errors.password} />}
      </FormControl>
      <TouchableOpacity onPress={forgotPasswordNavigation}>
        <View>
          <Text
            style={{
              textAlign: 'right',
              color: 'darkgreen',
              marginVertical: 5,
            }}>
            Lupa Password ?
          </Text>
        </View>
      </TouchableOpacity>
      {isLoading ? (
        <LoaderIndicator />
      ) : (
        <Button
          variant="outline"
          backgroundColor={color.main}
          onPress={handleSubmit}>
          <Text color="white">Masuk</Text>
        </Button>
      )}

      <Button
        variant="outline"
        backgroundColor="white"
        onPress={() => navigation.navigate('Register')}>
        <Text color="darkgreen">Daftar</Text>
      </Button>
    </Stack>
  );
};
export default FormLogin;
