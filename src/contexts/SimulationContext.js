import axios from "axios";
import { createContext, useCallback, useReducer } from "react";
import {BASE_API_URL} from '../contants'
import basedata from './basedata'

export const SimulationContext = createContext([basedata, () => '']);

export const SimulationContextProvider = ({ children }) => {
  const reducer = (prevState, updatedProperty) => ({
    ...prevState,
    ...updatedProperty,
  });

  const [simulationState, setSimulationState] = useReducer(reducer, {
    loading: null,
    error: null,
    errorCode: null,
    data: null,
  });

  const round = (number) => Math.round(number * 10) / 10;

  const calculateWins = (homeGames, awayGames) => {
    const homeWins = homeGames.filter(game => game.games[0].teams.home.score > game.games[0].teams.away.score).length;
    const awayWins = awayGames.filter(game => game.games[0].teams.away.score > game.games[0].teams.home.score).length;
    return { totalWins: homeWins + awayWins, homeWins, awayWins};
  };

  const averageGoals = (homeGames, awayGames) => {
    const homeScores = homeGames.reduce((a, b) => a + b.games[0].teams.home.score, 0);
    const awayScores = awayGames.reduce((a, b) => a + b.games[0].teams.away.score, 0);
    return {
      totalAvg: round((homeScores + awayScores) / (homeGames.length + awayGames.length)),
      homeScoresAvg: round(homeScores / homeGames.length),
      awayScoresAvg: round(awayScores / awayGames.length)
    }
  };

  const fetchSimulation = useCallback(async (homeTeam, awayTeam) => {
    setSimulationState({
      loading: true,
      error: null,
    });

    const getSimulationData = (teamId, allGames) => {
      const filteredHomeGames = allGames.filter(date => date.games[0].teams.home.team.id === teamId);
      const filteredAwayGames = allGames.filter(date => date.games[0].teams.away.team.id === teamId);
      const totalGames = filteredAwayGames.length + filteredHomeGames.length;
      const winsData = calculateWins(filteredHomeGames, filteredAwayGames);
      const simulationResults = {
        teamId,
        totalGames,
        totalAwayGames: filteredAwayGames.length,
        totalHomeGames: filteredHomeGames.length,
        totalWins: winsData.totalWins,
        totalHomeWins: winsData.homeWins,
        totalAwayWins: winsData.awayWins,
        totalWinsPercentage: round((winsData.totalWins * 100 / totalGames)),
        totalAwayWinsPercentage: round((winsData.awayWins * 100 / filteredAwayGames.length)),
        totalHomeWinsPercentage: round((winsData.homeWins * 100 / filteredHomeGames.length)),
        ...averageGoals(filteredHomeGames, filteredAwayGames),
      };
  
      return simulationResults;
    };

    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 48);
    const endDate = new Date();

    try {
      const response = await axios.get(`${BASE_API_URL}/schedule?startDate=${startDate.toISOString().split('T')[0]}&endDate=${endDate.toISOString().split('T')[0]}&teamId=${homeTeam.id}&hydrate=team&site=en_nhlNORDIC`);
      const filteredGames = response.data.dates.filter(date => date.games[0].status.detailedState.toLowerCase() === 'final' && (date.games[0].teams.home.team.id === awayTeam.id || date.games[0].teams.away.team.id === awayTeam.id));
      const simulationResults = [
        {
          teamData: homeTeam,
          ...getSimulationData(homeTeam.id, filteredGames)
        },
        {
          teamData: awayTeam,
          ...getSimulationData(awayTeam.id, filteredGames),
        }
      ];

      setSimulationState({
        loading: false,
        error: null,
        data: simulationResults,
      });
    } catch (err) {
      setSimulationState({
        loading: false,
        error: err
      })
    }
  }, []);

  const clear = useCallback(() => {
    setSimulationState({
      loading: false,
      error: null,
      data: null
    })
  }, []);

  return (
    <SimulationContext.Provider value={[simulationState, fetchSimulation, clear]}>
      {children}
    </SimulationContext.Provider>
  );
}

