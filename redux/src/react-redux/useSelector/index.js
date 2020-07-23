import React, { useEffect, useReducer } from 'react';
import { Context } from '../Provider';

function useSelector(selector = (data) => data) {
  const [, forceRender] = useReducer((s) => s + 1, 0);

  const store = React.useContext(Context);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      forceRender();
    });

    return () => unsubscribe();
  }, [store]);

  const state = selector(store.getState());

  return state;
}

export default useSelector;
