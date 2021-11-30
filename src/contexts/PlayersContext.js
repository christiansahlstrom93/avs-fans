import axios from "axios";
import { createContext, useCallback, useReducer } from "react";
import {BASE_API_URL, TEAM_ID} from '../contants'
import basedata from './basedata'

export const PlayersContext = createContext([basedata, () => '']);

export const PlayersContextProvider = ({ children }) => {
  const reducer = (prevState, updatedProperty) => ({
    ...prevState,
    ...updatedProperty,
  });

  const [playersState, setPlayersState] = useReducer(reducer, {
    loading: null,
    error: null,
    errorCode: null,
    data: null,
  });

  const fetchPlayers = useCallback(async () => {
    setPlayersState({
      loading: true,
      error: null,
    });

    try {
      const response = await axios.get(`${BASE_API_URL}/teams/${TEAM_ID}/roster?expand=roster.person`);
      setPlayersState({
        loading: false,
        error: null,
        data: response.data.roster,
      });
    } catch (err) {
      setPlayersState({
        loading: false,
        error: err
      })
    }
  }, []);

  return (
    <PlayersContext.Provider value={[playersState, fetchPlayers]}>
      {children}
    </PlayersContext.Provider>
  );
}