import React from 'react';
import {Stack, Input, Select} from 'native-base';
import {View, TouchableOpacity, Icon, TextInput} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Text} from 'react-native';
import FormPasienLama from './FormPasienLama';
import FormPasienBaru from './FormPasienBaru';

const FormPendaftaran = ({
  poliValue,
  kategoriValue,
  noBPJS,
  tglKunjungan,

  keluhanValue,
  telpValue,
  noKk,
  kotaLahir,
  tglLahir,
  emailValue,
  pekerjaanValue,
  alamatValue,
  kelurahanValue,
  kecamatanValue,
  rt,
  rw,
  jenis_kelamin,
  setPoliValue,
  setKategoriValue,
  setNoBPJS,
  setTglKunjungan,
  setKeluhanValue,
  setTelpValue,
  setNoKk,
  setKotaLahir,
  setTglLahir,
  setEmailValue,
  setPekerjaanValue,
  setAlamatValue,
  setKelurahanValue,
  setKecamatanValue,
  setRt,
  setRw,
  setJenis_kelamin,
  isOpenTglKunjungan,
  isOpenTglLahir,
  setIsOpenTglKunjungan,
  setIsOpenTglLahir,
  isNew = true,
  showModalUpload,
  setShowModalUpload,
  showModalPicker,
  setShowModalPicker,
  cameraHandler,
  galleryHandler,
  submitBtnHandler,
}) => {
  if (isNew) {
    return (
      <FormPasienBaru
        isOpenTglKunjungan={isOpenTglKunjungan}
        isOpenTglLahir={isOpenTglLahir}
        tglLahir={tglLahir}
        tglKunjungan={tglKunjungan}
        setIsOpenTglKunjungan={setIsOpenTglKunjungan}
        setIsOpenTglLahir={setIsOpenTglLahir}
        setTglKunjungan={setTglKunjungan}
        setTglLahir={setTglLahir}
        isNew={false}
        showModalUpload={showModalUpload}
        setShowModalUpload={setShowModalUpload}
        showModalPicker={showModalPicker}
        setShowModalPicker={setShowModalPicker}
        cameraHandler={cameraHandler}
        galleryHandler={galleryHandler}
        submitBtnHandler={submitBtnHandler}
      />
    );
  } else {
    return (
      <FormPasienLama
        isOpenTglKunjungan={isOpenTglKunjungan}
        isOpenTglLahir={isOpenTglLahir}
        tglLahir={tglLahir}
        tglKunjungan={tglKunjungan}
        setIsOpenTglKunjungan={setIsOpenTglKunjungan}
        setIsOpenTglLahir={setIsOpenTglLahir}
        setTglKunjungan={setTglKunjungan}
        setTglLahir={setTglLahir}
        submitBtnHandler={submitBtnHandler}
        isNew={false}
      />
    );
  }
};

export default FormPendaftaran;
