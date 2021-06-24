import axios from "axios";
import { createContext, useCallback, useReducer } from "react";
import {BASE_API_URL} from '../contants'
import basedata from './basedata'

export const ScheduleContext = createContext([basedata, () => '']);

export const ScheduleContextProvider = ({ children }) => {
  const reducer = (prevState, updatedProperty) => ({
    ...prevState,
    ...updatedProperty,
  });

  const [scheduleState, setScheduleState] = useReducer(reducer, {
    loading: null,
    error: null,
    errorCode: null,
    data: null,
  });

  const fetchSchedule = useCallback(async (startDate, endDate) => {
    setScheduleState({
      loading: true,
      error: null,
    });

    try {
      const response = await axios.get(`${BASE_API_URL}/schedule?startDate=${startDate}&endDate=${endDate}&hydrate=team,linescore,game(content(media(epg)),seriesSummary),metadata,seriesSummary(series)&site=en_nhlNORDIC`);
      setScheduleState({
        loading: false,
        error: null,
        data: response.data.dates,
      });
    } catch (err) {
      setScheduleState({
        loading: false,
        error: err
      })
    }
  }, []);

  return (
    <ScheduleContext.Provider value={[scheduleState, fetchSchedule]}>
      {children}
    </ScheduleContext.Provider>
  );
}

