import { createContext } from "react";
import Config from '../config';

const TEAM_ID = process.env.REACT_APP_TEAM_ID;

export const ConfigContext = createContext(Config);

export const ConfigContextProvider = ({ children }) => {
  const mergedConfig = {
    ...Config.default,
    ...Config[TEAM_ID]
  }
  return (
    <ConfigContext.Provider value={[mergedConfig]}>
      {children}
    </ConfigContext.Provider>
  );
};