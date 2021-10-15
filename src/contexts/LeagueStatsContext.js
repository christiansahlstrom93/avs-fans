import axios from "axios";
import { createContext, useCallback, useReducer } from "react";
import {BASE_API_URL} from '../contants'
import basedata from './basedata'

export const LeagueStatsContext = createContext([basedata, () => '']);

export const LeagueStatsContextProvider = ({ children }) => {
  const reducer = (prevState, updatedProperty) => ({
    ...prevState,
    ...updatedProperty,
  });

  const [leagueStatsState, setLeagueStatsState] = useReducer(reducer, {
    loading: null,
    error: null,
    errorCode: null,
    data: null,
  });

  const fetchLeagueStats = useCallback(async (playerId) => {
    setLeagueStatsState({
      loading: true,
      error: null,
    });

    try {
      const response = await axios.get(`${BASE_API_URL}/standings?hydrate=record(overall),division,conference,team(nextSchedule(team),previousSchedule(team))&season=20212022`);
      setLeagueStatsState({
        loading: false,
        error: null,
        data: response.data.records,
      });
    } catch (err) {
      setLeagueStatsState({
        loading: false,
        error: err
      })
    }
  }, []);

  return (
    <LeagueStatsContext.Provider value={[leagueStatsState, fetchLeagueStats]}>
      {children}
    </LeagueStatsContext.Provider>
  );
}