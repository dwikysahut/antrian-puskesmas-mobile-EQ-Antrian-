/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Stack, Input, Select, Icon} from 'native-base';
import {View, TouchableOpacity, TextInput} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import UploadImage from '../../../Components/UploadImage';

import {Text} from 'react-native';
import {
  kelurahan as dataKelurahan,
  kecamatan as dataKecamatan,
} from '../../../../../utils/DATA';
import DatePicker from 'react-native-date-picker';
const FormPasienBaru = ({
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
  showModalUpload,
  setShowModalUpload,
  showModalPicker,
  setShowModalPicker,
  cameraHandler,
  galleryHandler,
  submitBtnHandler,
}) => {
  return (
    <Stack
      space={4}
      w="full"
      mx="auto"
      borderRadius="8"
      borderColor="darkgreen"
      p={4}
      borderWidth={0.4}>
      <View>
        <Text style={{color: 'black'}}>Nomor Kartu Keluarga</Text>
        <Input
          variant="underlined"
          keyboardType="numeric"
          placeholder="Nomor Kartu Keluarga"
          focusOutlineColor="green.700"
          _disabled="true"
          isDisabled="true"
          editable={false}
        />
      </View>
      <View>
        <Text style={{color: 'black'}}>NIK</Text>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 2}}>
            <Input
              variant="underlined"
              keyboardType="numeric"
              placeholder="NIK"
              focusOutlineColor="green.700"
              style={{width: '50%'}}
            />
          </View>
          <TouchableOpacity
            onPress={submitBtnHandler}
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
      </View>
      <View>
        <Text style={{color: 'black'}}>Nama Lengkap</Text>
        <Input
          variant="underlined"
          placeholder="Nama Lengkap"
          focusOutlineColor="green.700"
        />
      </View>
      <View>
        <Text style={{color: 'black'}}>Tempat dan Tanggal Lahir</Text>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1}}>
            <Input placeholder="Tempat Lahir" variant="underlined" />
          </View>
          <TouchableOpacity
            onPress={() => setIsOpenTglLahir(true)}
            style={{
              flex: 1,
              marginLeft: 10,
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
                }}
                color="muted.400">
                {tglLahir.toDateString() === new Date().toDateString()
                  ? 'belum dipilih'
                  : tglLahir.toLocaleDateString('id')}
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
          </TouchableOpacity>
        </View>
      </View>

      <Text style={{color: 'black'}}>Kategori</Text>
      <Select
        selectedValue={kategoriValue}
        minWidth="200"
        accessibilityLabel="Kategori"
        placeholder="Kategori "
        _selectedItem={{
          bg: 'gray.300',
          color: 'white',
          endIcon: '',
        }}
        onValueChange={itemValue => setKategoriValue(itemValue)}>
        <Select.Item label="Umum " value="0" />
        <Select.Item label="BPJS" value="1" />
      </Select>
      <View>
        <Text style={{color: 'black', marginBottom: 8}}>
          No Kartu BPJS{' '}
          <Text style={{color: '#D1B000', fontSize: 12, fontWeight: '900'}}>
            *Diisi jika memilih kategori BPJS
          </Text>
        </Text>
        <Input variant="outline" placeholder="No Kartu BPJS" />
      </View>
      <Text style={{color: 'black'}}>Poli Tujuan</Text>
      <Select
        selectedValue={poliValue}
        minWidth="200"
        accessibilityLabel="Poli Tujuan"
        placeholder="Poli "
        _selectedItem={{
          bg: 'gray.300',
          color: 'white',
          endIcon: '',
        }}
        onValueChange={itemValue => setPoliValue(itemValue)}>
        <Select.Item label="Poli " />
        <Select.Item label="Poli Umum" value="01" />
        <Select.Item label="Poli KIA" value="02" />
      </Select>
      <View>
        <Text style={{color: 'black'}}>Tanggal Kunjungan</Text>

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
              }}
              color="muted.400">
              {tglLahir.toDateString() === new Date().toDateString()
                ? 'belum dipilih'
                : tglLahir.toLocaleDateString('id')}
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

      <Text style={{color: 'black'}}>Keluhan</Text>
      <TextInput
        multiline={true}
        numberOfLines={5}
        placeholder="keluhan"
        style={{textAlignVertical: 'top', borderWidth: 0.4, marginBottom: 8}}
      />
      <View>
        <Text style={{color: 'black'}}>No.Telepon</Text>

        <Input
          variant="underlined"
          keyboardType="numeric"
          placeholder="No. Telepon"
          focusOutlineColor="green.700"
        />
      </View>
      <Text style={{color: 'black'}}>Status Dalam Keluarga</Text>
      <Select
        selectedValue={kategoriValue}
        minWidth="200"
        accessibilityLabel="Kategori"
        placeholder="Kategori "
        _selectedItem={{
          bg: 'gray.300',
          color: 'white',
          endIcon: '',
        }}
        onValueChange={itemValue => setKategoriValue(itemValue)}>
        <Select.Item label="Anak " value="0" />
        <Select.Item label="Istri" value="1" />
        <Select.Item label="Suami" value="2" />
      </Select>
      <Text style={{color: 'black'}}>Jenis Kelamin</Text>

      <Select
        selectedValue={jenis_kelamin}
        minWidth="200"
        accessibilityLabel="Jenis Kelamin"
        placeholder="Jenis Kelamin"
        _selectedItem={{
          bg: 'gray.300',
          color: 'white',
          endIcon: '',
        }}
        onValueChange={itemValue => setJenis_kelamin(itemValue)}>
        <Select.Item label="Laki-Laki" value="Laki-laki" />
        <Select.Item label="Perempuan" value="Perempuan" />
      </Select>
      <View>
        <Text style={{color: 'black'}}>Email</Text>

        <Input
          variant="underlined"
          placeholder="Email"
          keyboardType="email-address"
          focusOutlineColor="green.700"
        />
      </View>
      <View>
        <Text style={{color: 'black'}}>Pekerjaan</Text>
        <Input
          variant="underlined"
          placeholder="Pekerjaan"
          focusOutlineColor="green.700"
        />
      </View>
      <View>
        <Text style={{color: 'black'}}>Upload Foto Kartu Identitas</Text>
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
          <Text style={{color: 'black', marginStart: 20}}>Foto_kartu.jpg</Text>
        </View>
      </View>
      <View>
        <Text style={{color: 'black', marginBottom: 8}}>Alamat</Text>
        <TextInput
          multiline={true}
          numberOfLines={5}
          placeholder="Alamat"
          style={{textAlignVertical: 'top', borderWidth: 0.4, marginBottom: 8}}
        />
      </View>
      <View style={{flex: 1}}>
        <Text style={{color: 'black'}}>Kecamatan</Text>

        <Select
          selectedValue={kecamatanValue}
          accessibilityLabel="Kecamatan"
          placeholder="Kecamatan"
          _selectedItem={{
            bg: 'gray.300',
            color: 'white',
            endIcon: '',
          }}
          mt={2}
          onValueChange={itemValue => setKecamatanValue(itemValue)}>
          {dataKecamatan
            .sort((a, b) => a.nama.localeCompare(b.nama))
            .map(item => (
              <Select.Item label={item.nama} value={item.nama} key={item.id} />
            ))}
        </Select>
      </View>
      <View style={{flex: 1}}>
        <Text style={{color: 'black'}}>Kelurahan</Text>

        <Select
          selectedValue={kelurahanValue}
          accessibilityLabel="Kelurahan"
          placeholder="Kelurahan"
          _selectedItem={{
            bg: 'gray.300',
            color: 'white',
            endIcon: '',
          }}
          mt={2}
          onValueChange={itemValue => setKelurahanValue(itemValue)}>
          {dataKelurahan
            .sort((a, b) => a.nama.localeCompare(b.nama))
            .map(item => (
              <Select.Item label={item.nama} value={item.nama} key={item.id} />
            ))}
        </Select>
      </View>

      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 1}}>
          <Text style={{color: 'black'}}>RT</Text>

          <Input
            variant="underlined"
            placeholder="RT (ex: 02)"
            mt={2}
            keyboardType="number-pad"
            focusOutlineColor="green.700"
          />
        </View>
        <View style={{flex: 1, marginStart: 8}}>
          <Text style={{color: 'black'}}>RW</Text>

          <Input
            variant="underlined"
            placeholder="RW (ex: 09)"
            mt={2}
            keyboardType="number-pad"
            focusOutlineColor="green.700"
          />
        </View>
      </View>
      <TouchableOpacity
        onPress={submitBtnHandler}
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
        date={tglLahir}
        mode="date"
        onConfirm={date => {
          setIsOpenTglLahir(false);
          setTglLahir(date);
        }}
        onCancel={() => {
          setIsOpenTglLahir(false);
        }}
      />
      <DatePicker
        modal
        open={isOpenTglKunjungan}
        date={tglKunjungan}
        mode="date"
        onConfirm={date => {
          setIsOpenTglKunjungan(false);
          setTglKunjungan(date);
        }}
        onCancel={() => {
          setIsOpenTglKunjungan(false);
        }}
      />
      <UploadImage
        showModal={showModalUpload}
        setShowModal={setShowModalUpload}
        showModalPicker={showModalPicker}
        setShowModalPicker={setShowModalPicker}
        cameraHandler={cameraHandler}
        galleryHandler={galleryHandler}
      />
    </Stack>
  );
};

export default FormPasienBaru;
