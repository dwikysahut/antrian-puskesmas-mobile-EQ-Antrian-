import {io} from 'socket.io-client';
import {URL_BASE} from '../utils/CONSTANT';
import {createContext} from 'react';

let socket = null;
export const SocketContext = createContext();

export const socketInit = () => {
  if (socket == null) {
    socket = io(URL_BASE);
  }
  return socket;
};
export function runSocketInit() {
  socketInit();
}

export const socketDisconnect = () => {
  if (socket != null) {
    socket = null;
  }
};
export function runSocketDisconnect(userId, token) {
  socket.emit('client-logout', userId, token);
  socketDisconnect();
}

// import {io} from 'socket.io-client';
// import {URL_BASE} from '../utils/CONSTANT';
// import {createContext, useContext, useState} from 'react';

// const SocketContext = createContext();
// export const getSocket = () => {
//   return useContext(SocketContext);
// };
// export const socket = io(URL_BASE);

// export const SocketContextProvider = ({children}) => {
//   return (
//     <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
//   );
// };
// // export const SocketContext = createContext();
