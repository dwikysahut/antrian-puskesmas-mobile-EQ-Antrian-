/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Stack, Input, Select, Icon, FormControl, Checkbox} from 'native-base';
import {
  View,
  TouchableOpacity,
  TextInput,
  Image,
  Pressable,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import UploadImage from '../../../Components/UploadImage';
import ErrorForm from '../../../../../Components/ErrorForm';
import {Text} from 'react-native';
import {
  kelurahan as dataKelurahan,
  kecamatan as dataKecamatan,
  statusAnggotaKel,
  pekerjaan,
  pendidikanTerakhir,
} from '../../../../../utils/DATA';
import DatePicker from 'react-native-date-picker';
import {dateOnlyConvert} from '../../../../../utils/functionHelper';
import {color} from '../../../../../utils/Color';
import LoaderIndicator from '../../../../../Components/LoaderIndicator';
const FormPasien = ({
  handleChange,
  handleReset,
  dataPraktek,
  setFieldValue,
  handleSubmit,
  values,
  imageFile,
  errors,
  onSubmitFilter,
  isValid,
  isNew,
  onChangeFilter,
  filterState,
  isAvailable,
  isOpenTglKunjungan,
  isLoading,
  isOpenTglLahir,
  isOwner,
  setIsOwner,
  setIsOpenTglKunjungan,
  setIsOpenTglLahir,
  setShowModalUpload,
  checkNik,
}) => {
  console.log(errors);
  return (
    <Stack
      space={4}
      w="full"
      mx="auto"
      borderRadius="8"
      borderColor="darkgreen"
      backgroundColor="white"
      p={4}
      borderWidth={0.4}>
      <View style={{backgroundColor: 'white', padding: 8, borderRadius: 10}}>
        <FormControl isInvalid={!isValid}>
          <Pressable>
            <Text style={{color: 'black'}}>
              Poli Tujuan <Text style={{color: 'red'}}>*</Text>
            </Text>
          </Pressable>
          <Select
            selectedValue={values.id_praktek}
            minWidth="200"
            accessibilityLabel="Poli Tujuan"
            placeholder="Poli "
            _selectedItem={{
              bg: 'gray.300',
              color: 'white',
              endIcon: '',
            }}
            onValueChange={itemValue => {
              onChangeFilter({name: 'id_praktek', value: itemValue});
              setFieldValue('id_praktek', itemValue);
            }}>
            {dataPraktek
              .filter(
                item =>
                  item.status_operasional == 1 &&
                  !item.nama_poli.toUpperCase().includes('ISPA'),
              )
              .map(item => (
                <Select.Item label={item.nama_poli} value={item.id_praktek} />
              ))}
          </Select>
          {errors.id_praktek && <ErrorForm text={errors.id_praktek} />}
        </FormControl>

        <FormControl isInvalid={!isValid}>
          <View style={{marginTop: 10}}>
            <Pressable>
              <Text style={{color: 'black'}}>
                Tanggal Kunjungan <Text style={{color: 'red'}}>*</Text>
              </Text>
            </Pressable>

            <TouchableOpacity
              onPress={() => setIsOpenTglKunjungan(true)}
              style={{
                flex: 1,
                justifyContent: 'center',
              }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',

                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    marginLeft: 10,
                    alignSelf: 'flex-end',
                    color: 'black',
                  }}
                  color="muted.400">
                  {values?.tanggal_periksa === '' || !values?.tanggal_periksa
                    ? // new Date()?.toDateString()
                      'belum dipilih'
                    : dateOnlyConvert(values?.tanggal_periksa)}
                </Text>
                <Icon
                  style={{alignSelf: 'flex-end'}}
                  as={<MaterialIcons name={'date-range'} />}
                  size={8}
                  color="green.700"
                />
              </View>
              <Text
                style={{flex: 1, flexWrap: 'nowrap', borderBottomWidth: 0.6}}
                color="muted.300"
              />
            </TouchableOpacity>
          </View>
          {errors.tanggal_periksa && (
            <ErrorForm text={errors.tanggal_periksa} />
          )}
        </FormControl>
        <TouchableOpacity
          onPress={onSubmitFilter}
          disabled={
            filterState?.tanggal_periksa == undefined ||
            filterState?.id_praktek == undefined
              ? true
              : false
          }
          style={{
            backgroundColor:
              filterState?.tanggal_periksa == undefined ||
              filterState?.id_praktek == undefined
                ? 'darkgrey'
                : 'black',
            borderRadius: 5,
            flex: 1,

            padding: 10,

            marginTop: 10,
            justifyContent: 'center',
            alignItems: 'center',
            fontFamily: 'JosefinSans-Bold',
          }}>
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
              fontSize: 16,
              flex: 1,
              fontWeight: 'bold',
            }}>
            Cek Ketersediaan
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          borderBottomWidth: 2,
          borderStyle: 'solid',
          borderColor: 'black',
        }}
      />
      {isAvailable && (
        <View>
          {isNew && (
            <View style={{marginVertical: 10}}>
              <Checkbox
                size="md"
                value="true"
                onChange={() => {
                  setIsOwner(!isOwner);
                }}>
                Gunakan Identitas pemilik Akun
              </Checkbox>
            </View>
          )}

          <View>
            <Pressable>
              <Text style={{color: 'black'}}>Nomor Kartu Keluarga</Text>
            </Pressable>
            <Input
              variant="underlined"
              keyboardType="numeric"
              placeholder="Nomor Kartu Keluarga"
              focusOutlineColor="green.700"
              _disabled="true"
              value={values.no_kk}
              onChangeText={itemValue => setFieldValue('no_kk', itemValue)}
              isDisabled="true"
              editable={false}
            />
          </View>
          {isNew && (
            <FormControl isInvalid={!isValid} style={{marginBottom: 10}}>
              <View>
                <Pressable>
                  <Text style={{color: 'black'}}>
                    Nomor Induk Kependudukan (NIK){' '}
                    <Text style={{color: 'red'}}>*</Text>
                  </Text>
                </Pressable>
                <View style={{flexDirection: 'row'}}>
                  <View style={{flex: 2}}>
                    <Input
                      variant="underlined"
                      keyboardType="numeric"
                      maxLength={16}
                      value={values.nik}
                      placeholder="NIK Anggota Keluarga"
                      onChangeText={itemValue =>
                        setFieldValue('nik', itemValue)
                      }
                      focusOutlineColor="green.700"
                      style={{width: '50%'}}
                    />
                  </View>
                  <TouchableOpacity
                    onPress={() => checkNik(values?.nik, handleReset)}
                    style={{
                      backgroundColor: 'darkgreen',
                      borderRadius: 5,
                      flex: 1,
                      margin: 2,
                      justifyContent: 'center',
                      alignItems: 'center',
                      fontFamily: 'JosefinSans-Bold',
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        textAlign: 'center',
                        fontSize: 16,
                        fontWeight: 'bold',
                      }}>
                      Cek
                    </Text>
                  </TouchableOpacity>
                </View>
                <Text style={{fontSize: 12}}>
                  {values?.nik?.length || 0} / 16
                </Text>
              </View>
              {errors.nik && <ErrorForm text={errors.nik} />}
            </FormControl>
          )}

          <FormControl isInvalid={!isValid} style={{marginBottom: 10}}>
            <Text style={{color: 'black'}}>
              Nama Kepala Keluarga <Text style={{color: 'red'}}>*</Text>
            </Text>
            <Input
              variant="underlined"
              keyboardType="default"
              placeholder="Nama Kepala Keluarga"
              focusOutlineColor="green.700"
              value={values?.kepala_keluarga}
              onChangeText={itemValue =>
                setFieldValue('kepala_keluarga', itemValue)
              }
            />

            {errors.kepala_keluarga && (
              <ErrorForm text={errors.kepala_keluarga} />
            )}
          </FormControl>
          <FormControl isInvalid={!isValid} style={{marginBottom: 10}}>
            <View>
              <Pressable>
                <Text style={{color: 'black'}}>
                  Nama Lengkap <Text style={{color: 'red'}}>*</Text>
                </Text>
              </Pressable>
              <Input
                variant="underlined"
                onChangeText={handleChange('nama')}
                placeholder="Nama Lengkap"
                value={values.nama}
                focusOutlineColor="green.700"
              />
            </View>
            {errors.nama && <ErrorForm text={errors.nama} />}
          </FormControl>
          <View style={{marginBottom: 10}}>
            <Pressable>
              <Text style={{color: 'black'}}>
                Tempat dan Tanggal Lahir <Text style={{color: 'red'}}>*</Text>
              </Text>
            </Pressable>
            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 1}}>
                <FormControl isInvalid={!isValid}>
                  <Input
                    placeholder="Tempat Lahir"
                    variant="underlined"
                    value={values.tempat_lahir}
                    onChangeText={itemValue =>
                      setFieldValue('tempat_lahir', itemValue)
                    }
                  />
                  {errors.tempat_lahir && (
                    <ErrorForm text={errors.tempat_lahir} />
                  )}
                </FormControl>
              </View>
              <TouchableOpacity
                onPress={() => setIsOpenTglLahir(true)}
                style={{
                  flex: 1,
                  marginLeft: 10,
                }}>
                <FormControl isInvalid={!isValid}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      alignItems: 'center',

                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{
                        marginLeft: 10,
                        alignSelf: 'flex-end',
                        color: 'black',
                      }}
                      color="muted.400">
                      {values?.tanggal_lahir === '' || !values?.tanggal_lahir
                        ? // new Date()?.toDateString()
                          'belum dipilih'
                        : dateOnlyConvert(values?.tanggal_lahir)}
                    </Text>
                    <Icon
                      style={{alignSelf: 'flex-end'}}
                      as={<MaterialIcons name={'date-range'} />}
                      size={8}
                      color="green.700"
                    />
                  </View>
                  <Text
                    style={{
                      flex: 1,

                      borderBottomWidth: 0.4,
                      borderColor: 'gray',
                      alignSelf: 'auto',
                      marginTop: -8,
                    }}
                    color="muted.300"
                  />
                  {errors.tanggal_lahir && (
                    <ErrorForm text={errors.tanggal_lahir} />
                  )}
                </FormControl>
              </TouchableOpacity>
            </View>
          </View>

          <FormControl isInvalid={!isValid} style={{marginBottom: 10}}>
            <Pressable>
              <Text style={{color: 'black', marginBottom: 8}}>
                Status BPJS <Text style={{color: 'red'}}>*</Text>
              </Text>
            </Pressable>
            <Select
              selectedValue={values?.bpjs.toString()}
              minWidth="200"
              accessibilityLabel="Status BPJS"
              placeholder="Status BPJS "
              _selectedItem={{
                bg: 'gray.300',
                color: 'white',
                endIcon: '',
              }}
              onValueChange={itemValue => {
                // setFieldValue('daftar_dengan_bpjs', itemValue);
                setFieldValue('bpjs', itemValue);
                console.log(values.bpjs);
              }}>
              <Select.Item label="BPJS " value="1" />
              <Select.Item label="Non BPJS" value="0" />
            </Select>
            {errors.bpjs && <ErrorForm text={errors.bpjs} />}
          </FormControl>
          <FormControl isInvalid={!isValid} style={{marginBottom: 10}}>
            <View>
              <Pressable>
                <Text style={{color: 'black', marginBottom: 8}}>
                  No Kartu BPJS{' '}
                  <Text
                    style={{color: '#D1B000', fontSize: 12, fontWeight: '900'}}>
                    *Diisi jika memilih menggunakan BPJS
                  </Text>
                </Text>
              </Pressable>
              <Input
                isDisabled={values?.bpjs != 1}
                _disabled={values?.bpjs != 1}
                variant="outline"
                onChangeText={itemValue =>
                  setFieldValue('nomor_kartu_bpjs', itemValue)
                }
                value={values?.nomor_kartu_bpjs}
                placeholder="No Kartu BPJS"
              />
            </View>
            {errors.nomor_kartu_bpjs && (
              <ErrorForm text={errors.nomor_kartu_bpjs} />
            )}
          </FormControl>

          <FormControl isInvalid={!isValid} style={{marginBottom: 10}}>
            <View>
              <Pressable>
                <Text style={{color: 'black'}}>
                  No.Telepon <Text style={{color: 'red'}}>*</Text>
                </Text>
              </Pressable>
              <Input
                variant="underlined"
                keyboardType="numeric"
                value={values?.no_telepon}
                onChangeText={itemValue =>
                  setFieldValue('no_telepon', itemValue)
                }
                placeholder="No. Telepon"
                maxLength={13}
                focusOutlineColor="green.700"
              />
              <Text style={{fontSize: 13}}>
                {' '}
                {values?.no_telepon?.length || 0} digit ( 10 - 13 digit )
              </Text>
            </View>
            {errors.no_telepon && <ErrorForm text={errors.no_telepon} />}
          </FormControl>
          <FormControl isInvalid={!isValid} style={{marginBottom: 10}}>
            <Pressable>
              <Text style={{color: 'black', marginBottom: 8}}>
                Status Dalam Keluarga <Text style={{color: 'red'}}>*</Text>
              </Text>
            </Pressable>
            <Select
              selectedValue={values?.status_anggota_keluarga}
              minWidth="200"
              accessibilityLabel="Kategori"
              placeholder="Kategori "
              _selectedItem={{
                bg: 'gray.300',
                color: 'white',
                endIcon: '',
              }}
              onValueChange={itemValue =>
                setFieldValue('status_anggota_keluarga', itemValue)
              }>
              {statusAnggotaKel.map((item, i) => (
                <Select.Item label={item.nama} value={item.nama} key={i} />
              ))}
            </Select>
            {errors.status_anggota_keluarga && (
              <ErrorForm text={errors.status_anggota_keluarga} />
            )}
          </FormControl>
          <FormControl isInvalid={!isValid} style={{marginBottom: 10}}>
            <Pressable>
              <Text style={{color: 'black', marginBottom: 8}}>
                Jenis Kelamin <Text style={{color: 'red'}}>*</Text>
              </Text>
            </Pressable>

            <Select
              selectedValue={values?.jenis_kelamin}
              minWidth="200"
              accessibilityLabel="Jenis Kelamin"
              placeholder="Jenis Kelamin"
              _selectedItem={{
                bg: 'gray.300',
                color: 'white',
                endIcon: '',
              }}
              onValueChange={itemValue =>
                setFieldValue('jenis_kelamin', itemValue)
              }>
              <Select.Item label="Laki-Laki" value="Laki-laki" />
              <Select.Item label="Perempuan" value="Perempuan" />
            </Select>
            {errors.jenis_kelamin && <ErrorForm text={errors.jenis_kelamin} />}
          </FormControl>
          {/* <FormControl isInvalid={!isValid}>
       <Text style={{color: 'black'}}>Email</Text>

       <Input
         variant="underlined"
         placeholder="Email"
         value={values?.email}
         onChangeText={itemValue => setFieldValue('email', itemValue)}
         keyboardType="email-address"
         focusOutlineColor="green.700"
       />

       {errors.email && <ErrorForm text={errors.email} />}
     </FormControl> */}
          <FormControl isInvalid={!isValid} style={{marginBottom: 10}}>
            <Pressable>
              <Text style={{color: 'black', marginBottom: 8}}>
                Pendidikan Terakhir <Text style={{color: 'red'}}>*</Text>
              </Text>
            </Pressable>
            <Select
              selectedValue={values?.pendidikan_terakhir}
              minWidth="200"
              accessibilityLabel="Pendidikan Terakhir"
              placeholder="Pendidikan Terakhir"
              _selectedItem={{
                bg: 'gray.300',
                color: 'white',
                endIcon: '',
              }}
              onValueChange={itemValue =>
                setFieldValue('pendidikan_terakhir', itemValue)
              }>
              {pendidikanTerakhir.map((item, i) => (
                <Select.Item label={item.nama} value={item.nama} key={i} />
              ))}
            </Select>
            {errors.pendidikan_terakhir && (
              <ErrorForm text={errors.pendidikan_terakhir} />
            )}
          </FormControl>
          <FormControl isInvalid={!isValid} style={{marginBottom: 10}}>
            <View>
              <Pressable>
                <Text style={{color: 'black', marginBottom: 8}}>
                  Pekerjaan <Text style={{color: 'red'}}>*</Text>
                </Text>
              </Pressable>
              <Select
                selectedValue={values?.pekerjaan}
                minWidth="200"
                accessibilityLabel="Jenis Kelamin"
                placeholder="Pekerjaan"
                _selectedItem={{
                  bg: 'gray.300',
                  color: 'white',
                  endIcon: '',
                }}
                onValueChange={itemValue =>
                  setFieldValue('pekerjaan', itemValue)
                }>
                {pekerjaan
                  .sort((a, b) =>
                    a.nama > b.nama ? 1 : b.nama > a.nama ? -1 : 0,
                  )
                  .map((item, i) => (
                    <Select.Item label={item.nama} value={item.nama} key={i} />
                  ))}
              </Select>
              {/* <Input
           value={values.pekerjaan}
           variant="underlined"
           placeholder="Pekerjaan"
           focusOutlineColor="green.700"
         /> */}
            </View>
            {errors.pekerjaan && <ErrorForm text={errors.pekerjaan} />}
          </FormControl>
          <FormControl isInvalid={imageFile == null} style={{marginBottom: 10}}>
            <View>
              <Pressable>
                <Text style={{color: 'black'}}>
                  Upload Foto Kartu Identitas{' '}
                  <Text style={{color: 'red'}}>*</Text>
                </Text>

                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 8,
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    onPress={() => setShowModalUpload(true)}
                    style={{
                      padding: 12,
                      paddingVertical: 10,
                      backgroundColor: 'white',
                      borderRadius: 5,
                      borderWidth: 0.8,

                      borderColor: 'darkgreen',
                    }}>
                    <Text style={{color: 'darkgreen'}}>Upload</Text>
                  </TouchableOpacity>
                  {/* <Text style={{color: 'black', marginStart: 20}}>
                  {imageFile?.fileName}
                </Text> */}
                  <Image
                    style={{width: 80, height: 60, marginLeft: 30}}
                    source={{
                      uri: imageFile?.uri
                        ? imageFile?.uri
                        : imageFile?.fileName,
                    }}
                  />
                </View>
              </Pressable>
            </View>
            {imageFile == null && <ErrorForm text="Foto harus diisi" />}
          </FormControl>
          <FormControl isInvalid={!isValid}>
            <View>
              <Pressable>
                <Text style={{color: 'black', marginBottom: 8}}>
                  Alamat <Text style={{color: 'red'}}>*</Text>
                </Text>
              </Pressable>
              <TextInput
                multiline={true}
                numberOfLines={5}
                value={values?.alamat}
                onChangeText={itemValue => setFieldValue('alamat', itemValue)}
                placeholder="Alamat"
                style={{
                  textAlignVertical: 'top',
                  borderWidth: 0.4,
                  marginBottom: 8,
                  color: 'black',
                }}
              />
            </View>
            {errors.alamat && <ErrorForm text={errors.alamat} />}
          </FormControl>
          <FormControl isInvalid={!isValid} style={{marginBottom: 10}}>
            <View style={{flex: 1}}>
              <Pressable>
                <Text style={{color: 'black'}}>
                  Kecamatan <Text style={{color: 'red'}}>*</Text>
                </Text>
              </Pressable>

              <Select
                selectedValue={values?.kecamatan}
                accessibilityLabel="Kecamatan"
                placeholder="Kecamatan"
                _selectedItem={{
                  bg: 'gray.300',
                  color: 'white',
                  endIcon: '',
                }}
                mt={2}
                onValueChange={itemValue =>
                  setFieldValue('kecamatan', itemValue)
                }>
                {dataKecamatan
                  .sort((a, b) => a.nama.localeCompare(b.nama))
                  .map(item => (
                    <Select.Item
                      label={item.nama}
                      value={item.nama}
                      key={item.id}
                    />
                  ))}
              </Select>
            </View>
            {errors.kecamatan && <ErrorForm text={errors.kecamatan} />}
          </FormControl>
          <FormControl isInvalid={!isValid} style={{marginBottom: 10}}>
            <View style={{flex: 1}}>
              <Pressable>
                <Text style={{color: 'black'}}>
                  Kelurahan <Text style={{color: 'red'}}>*</Text>
                </Text>
              </Pressable>

              <Select
                selectedValue={values?.kelurahan}
                accessibilityLabel="Kelurahan"
                placeholder="Kelurahan"
                isDisabled={
                  values.kecamatan == null || values.kecamatan == undefined
                }
                _selectedItem={{
                  bg: 'gray.300',
                  color: 'white',
                  endIcon: '',
                }}
                mt={2}
                onValueChange={itemValue =>
                  setFieldValue('kelurahan', itemValue)
                }>
                {dataKelurahan
                  .sort((a, b) => a.nama.localeCompare(b.nama))
                  .map(item => (
                    <Select.Item
                      label={item.nama}
                      value={item.nama}
                      key={item.id}
                    />
                  ))}
              </Select>
            </View>
            {errors.kelurahan && <ErrorForm text={errors.kelurahan} />}
          </FormControl>
          <View style={{flexDirection: 'row', marginBottom: 10}}>
            <View style={{flex: 1}}>
              <FormControl isInvalid={!isValid}>
                <Text style={{color: 'black'}}>
                  RT <Text style={{color: 'red'}}>*</Text>
                </Text>

                <Input
                  value={values?.rt}
                  onChangeText={itemValue => setFieldValue('rt', itemValue)}
                  variant="underlined"
                  placeholder="RT (ex: 02)"
                  mt={2}
                  keyboardType="number-pad"
                  focusOutlineColor="green.700"
                />
                {errors.rt && <ErrorForm text={errors.rt} />}
              </FormControl>
            </View>
            <View style={{flex: 1, marginStart: 8}}>
              <FormControl isInvalid={!isValid}>
                <Text style={{color: 'black'}}>
                  RW <Text style={{color: 'red'}}>*</Text>
                </Text>

                <Input
                  variant="underlined"
                  value={values?.rw}
                  onChangeText={itemValue => setFieldValue('rw', itemValue)}
                  placeholder="RW (ex: 09)"
                  mt={2}
                  keyboardType="number-pad"
                  focusOutlineColor="green.700"
                />
                {errors.rw && <ErrorForm text={errors.rw} />}
              </FormControl>
            </View>
          </View>
          <FormControl isInvalid={!isValid} style={{marginBottom: 10}}>
            <Pressable>
              <Text style={{color: 'black', marginBottom: 8}}>
                Keluhan <Text style={{color: 'red'}}>*</Text>
              </Text>
            </Pressable>
            <TextInput
              multiline={true}
              onChangeText={itemValue => setFieldValue('keluhan', itemValue)}
              numberOfLines={5}
              value={values.keluhan}
              placeholder="keluhan"
              style={{
                textAlignVertical: 'top',
                borderWidth: 0.4,
                color: 'black',
              }}
            />
            {errors.keluhan && <ErrorForm text={errors.keluhan} />}
          </FormControl>
          {isLoading ? (
            <LoaderIndicator />
          ) : (
            <TouchableOpacity
              onPress={handleSubmit}
              style={{
                padding: 15,
                backgroundColor: 'darkgreen',
                borderRadius: 5,
                fontFamily: 'JosefinSans-Bold',
              }}>
              <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  fontSize: 16,
                  fontWeight: 'bold',
                }}>
                Submit
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* <View style={{marginTop: 10}}>
        <Text style={{marginBottom: 5}}>Tanggal Lahir</Text>
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              alignSelf: 'flex-end',

              width: '100%',
            }}>
            <TouchableOpacity onPress={() => setIsOpenTglKunjungan(true)}>
              <View style={{marginLeft: 5}}>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      marginBottom: 10,
                      marginLeft: 10,
                      alignSelf: 'flex-start',
                    }}
                    color="muted.400">
                    {tglKunjungan.toDateString() === new Date().toDateString()
                      ? 'belum dipilih'
                      : tglKunjungan.toLocaleDateString('id')}
                  </Text>
                  <Icon
                    as={<MaterialIcons name={'date-range'} />}
                    size={8}
                    mr="2"
                    color="green.700"
                  />
                </View>
                <Text
                  style={{
                    position: 'absolute',
                    marginTop: 15,
                  }}
                  color="muted.300">
                  _____________________________________________
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View> */}
      <DatePicker
        modal
        open={isOpenTglLahir}
        date={
          values.tanggal_lahir ? new Date(values.tanggal_lahir) : new Date()
        }
        mode="date"
        maximumDate={new Date()}
        onConfirm={date => {
          setIsOpenTglLahir(false);

          setFieldValue('tanggal_lahir', date);
        }}
        onCancel={() => {
          setIsOpenTglLahir(false);
        }}
      />
      <DatePicker
        modal
        open={isOpenTglKunjungan}
        date={
          values.tanggal_periksa ? new Date(values.tanggal_periksa) : new Date()
        }
        mode="date"
        minimumDate={new Date()}
        maximumDate={new Date(new Date().setDate(new Date().getDate() + 7))}
        onConfirm={date => {
          setIsOpenTglKunjungan(false);
          onChangeFilter({name: 'tanggal_periksa', value: date});
          setFieldValue('tanggal_periksa', date);
        }}
        onCancel={() => {
          setIsOpenTglKunjungan(false);
        }}
      />
    </Stack>
  );
};

export default FormPasien;
