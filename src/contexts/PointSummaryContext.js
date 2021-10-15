

import axios from "axios";
import { createContext, useCallback, useReducer } from "react";
import basedata from './basedata'

export const PointSummaryContext = createContext([basedata, () => '']);

export const PointSummaryContextProvider = ({ children }) => {
  const reducer = (prevState, updatedProperty) => ({
    ...prevState,
    ...updatedProperty,
  });

  const [pointSummary, setPointSummary] = useReducer(reducer, {
    loading: null,
    error: null,
    errorCode: null,
    data: null,
  });

  const fetchPointSummary = useCallback(async () => {
    setPointSummary({
      loading: true,
      error: null,
    });

    try {
      const response = await axios.get('https://api.nhle.com/stats/rest/sv/skater/summary?isAggregate=false&isGame=false&sort=%5B%7B%22property%22:%22assists%22,%22direction%22:%22DESC%22%7D,%7B%22property%22:%22points%22,%22direction%22:%22DESC%22%7D,%7B%22property%22:%22gamesPlayed%22,%22direction%22:%22ASC%22%7D,%7B%22property%22:%22playerId%22,%22direction%22:%22ASC%22%7D%5D&start=0&limit=50&factCayenneExp=gamesPlayed%3E=1&cayenneExp=franchiseId%3D27%20and%20gameTypeId=2%20and%20seasonId%3C=20212022%20and%20seasonId%3E=20212022');
      setPointSummary({
        loading: false,
        error: null,
        data: response.data.dates,
      });
    } catch (err) {
      setPointSummary({
        loading: false,
        error: err
      })
    }
  }, []);

  return (
    <PointSummaryContext.Provider value={[pointSummary, fetchPointSummary]}>
      {children}
    </PointSummaryContext.Provider>
  );
}

