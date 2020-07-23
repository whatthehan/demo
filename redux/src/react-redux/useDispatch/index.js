import React from 'react';
import { Context } from '../Provider';

function useDispatch() {
  const { dispatch } = React.useContext(Context);
  return dispatch;
}

export default useDispatch;
