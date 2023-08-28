import React from 'react';
import {Stack, Input, Select} from 'native-base';
import {View, TouchableOpacity, Icon, TextInput} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Text} from 'react-native';

import FormPasien from './FormPasien';
import {Formik} from 'formik';
import {value} from 'deprecated-react-native-prop-types/DeprecatedTextInputPropTypes';

const FormPendaftaran = ({
  checkNik,
  noKk,
  dataPraktek,
  setTglKunjungan,
  setTglLahir,
  tglLahir,
  tglKunjungan,
  submitBtnHandler,
  imageFile,
  isOpenTglKunjungan,
  isOpenTglLahir,
  setIsOpenTglKunjungan,
  setIsOpenTglLahir,
  filterState,
  isNew = true,
  showModalUpload,
  setShowModalUpload,
  showModalPicker,
  onSubmitFilter,
  setShowModalPicker,
  cameraHandler,
  galleryHandler,
  initialForm,
  isOwner = null,
  setIsOwner = () => {},
  onChangeFilter,
  isAvailable,
  isLoading,
  formValidationSchema,
  onSubmitHandler,
}) => {
  return (
    <Formik
      enableReinitialize
      validateOnChange={false}
      initialValues={{...initialForm}}
      validationSchema={formValidationSchema}
      onSubmit={submitBtnHandler}>
      {({
        handleChange,
        handleReset,
        setFieldValue,
        handleSubmit,
        values,
        errors,
        touched,
        isValid,
        isSubmitting,
      }) => (
        <FormPasien
          isOpenTglKunjungan={isOpenTglKunjungan}
          isOpenTglLahir={isOpenTglLahir}
          handleChange={handleChange}
          handleReset={handleReset}
          setFieldValue={setFieldValue}
          handleSubmit={handleSubmit}
          values={values}
          errors={errors}
          touched={touched}
          imageFile={imageFile}
          dataPraktek={dataPraktek}
          isValid={isValid}
          isLoading={isLoading}
          isOwner={isOwner}
          setIsOwner={setIsOwner}
          isSubmitting={isSubmitting}
          setIsOpenTglKunjungan={setIsOpenTglKunjungan}
          setIsOpenTglLahir={setIsOpenTglLahir}
          setTglKunjungan={setTglKunjungan}
          setTglLahir={setTglLahir}
          isNew={isNew}
          checkNik={checkNik}
          noKk={noKk}
          filterState={filterState}
          onChangeFilter={onChangeFilter}
          onSubmitFilter={onSubmitFilter}
          isAvailable={isAvailable}
          showModalUpload={showModalUpload}
          setShowModalUpload={setShowModalUpload}
          showModalPicker={showModalPicker}
          setShowModalPicker={setShowModalPicker}
          cameraHandler={cameraHandler}
          galleryHandler={galleryHandler}
        />
      )}
    </Formik>
  );
};

export default FormPendaftaran;
