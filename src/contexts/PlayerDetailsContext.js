import axios from "axios";
import { createContext, useCallback, useReducer } from "react";
import {BASE_API_URL} from '../contants'
import basedata from './basedata'

export const PlayerDetailsContext = createContext([basedata, () => '']);

export const PlayerDetailsContextProvider = ({ children }) => {
  const reducer = (prevState, updatedProperty) => ({
    ...prevState,
    ...updatedProperty,
  });

  const [playerDetailsState, setPlayerDetailsState] = useReducer(reducer, {
    loading: null,
    error: null,
    errorCode: null,
    data: null,
  });

  const fetchPlayerDetails = useCallback(async (playerId) => {
    setPlayerDetailsState({
      loading: true,
      error: null,
    });

    try {
      const response = await axios.get(`${BASE_API_URL}/people/${playerId}?expand=person.stats&stats=yearByYear,yearByYearPlayoffs,careerRegularSeason&expand=stats.team&site=en_nhlNR`);
      setPlayerDetailsState({
        loading: false,
        error: null,
        data: response.data.people[0],
      });
    } catch (err) {
      setPlayerDetailsState({
        loading: false,
        error: err
      })
    }
  }, []);

  return (
    <PlayerDetailsContext.Provider value={[playerDetailsState, fetchPlayerDetails]}>
      {children}
    </PlayerDetailsContext.Provider>
  );
}