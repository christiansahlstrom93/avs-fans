

import axios from "axios";
import { createContext, useCallback, useReducer } from "react";
import basedata from './basedata'

export const PointSummaryContext = createContext([basedata, () => '']);
const SEASON = '20212022';

const basePointsData = {
  playerId: null,
  g: 0,
  a: 0,
  p: 0,
  games: 0,
};

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

  const fetchPointSummary = useCallback(async (ids) => {
    if (!ids || !ids.length) {
      return;
    }
    setPointSummary({
      loading: true,
      error: null,
    });

    const promises = [];
    ids.forEach(id => {
      promises.push(axios.get(`https://statsapi.web.nhl.com/api/v1/people/${id}?expand=person.stats&stats=yearByYear`))
    });
    const response = await Promise.all(promises);

    const getStatsForSeason = (playerId, splits) => {
      if (!splits || !splits.length) {
        return { ...basePointsData, playerId };
      }
      const seasonSplit = splits.find(split => split.season === SEASON);
      if (seasonSplit) {
        const { stat } = seasonSplit;
        return {
          g: stat.goals ?? 0,
          a: stat.assists ?? 0,
          p: stat.points ?? 0,
          games: stat.games ?? 0,
          playerId
        }
      }
      return { ...basePointsData, playerId };
    };

    const getFormattedData = () => response.map(playerData => getStatsForSeason(playerData.data.people[0].id, playerData.data.people[0].stats[0].splits));

    try {
      setPointSummary({
        loading: false,
        error: null,
        data: getFormattedData(),
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

