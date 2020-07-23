import { useContext } from 'react';
import { Context } from '../store';

const Route = ({ path, component }) => {
  const { currentPath } = useContext(Context);
  return currentPath === path ? component : null;
};

export default Route;
