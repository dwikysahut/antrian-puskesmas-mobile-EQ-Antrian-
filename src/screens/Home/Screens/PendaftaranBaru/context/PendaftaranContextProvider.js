import React, {createContext, useContext, useState} from 'react';

const PendaftaranContext = createContext();

export const usePendaftaran = () => useContext(PendaftaranContext);

export const PendaftaranContextProvider = ({children}) => {
  const [toast, setToast] = useState('');
  const setToastHandler = (type, title, text) => {
    setToast({type, title, text});
  };
  return (
    <PendaftaranContext.Provider value={{toast, setToastHandler}}>
      {children}
    </PendaftaranContext.Provider>
  );
};
