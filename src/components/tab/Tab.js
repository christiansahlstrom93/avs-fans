import { useCallback } from 'react';
import './Tab.css';

const Tab = ({ name, id, onClick, isActive }) => {
  const clickCb = useCallback(() => onClick(id), [id, onClick])
  return (
    <div className={isActive ? 'tabActive' : 'tab'} onClick={clickCb}>
      {name}
    </div>
  );
};


export default Tab;