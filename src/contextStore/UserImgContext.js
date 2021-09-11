import React from 'react';
import { getUserImgFromLocalStorage } from '../utils/functions';

const UserImgContext = React.createContext({
  userImg: getUserImgFromLocalStorage(),
  setUserImg:(newImg)=>{}
});

export default UserImgContext;