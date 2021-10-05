import { useCallback, useEffect, useRef } from 'react';
import './Tab.css';

const Tab = ({ name, id, onClick, isActive }) => {
  const clickCb = useCallback(() => onClick(id), [id, onClick]);
  const ref = useRef(null);
  useEffect(() => {
    if (isActive) {
      ref.current.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
    }
  }, [isActive]);
  return (
    <div ref={ref} className={isActive ? 'tabActive' : 'tab'} onClick={clickCb}>
      {name}
    </div>
  );
};


export default Tab;