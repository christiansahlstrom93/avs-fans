import { Route, Switch, BrowserRouter } from 'react-router-dom';
import {PlayersContextProvider} from './contexts/PlayersContext'
import { PlayerDetailsContextProvider } from './contexts/PlayerDetailsContext';
import Homepage from './components/homepage/Homepage'
import PlayerDetails from './components/players/PlayerDetails';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import { index,playerDetails } from './routes';
import { ScheduleContextProvider } from './contexts/ScheduleContext';
import { LeagueStatsContextProvider } from './contexts/LeagueStatsContext';
import { WithScheduleWrapper } from '@christiansahlstrom/nhl-cool-widget';
import './App.css';
import { PointSummaryContextProvider } from './contexts/PointSummaryContext';
import ScheduleHeader from './components/schedule/ScheduleHeader';
import { useCallback, useState } from 'react';

const App = () => {
  const [ shouldFilter, setFilter ] = useState(false);
  const onFilter = useCallback(() => {
    setFilter(!shouldFilter)
  }, [shouldFilter, setFilter]);
  return (
    <PlayersContextProvider>
      <PointSummaryContextProvider>
        <PlayerDetailsContextProvider>
          <ScheduleContextProvider>
            <LeagueStatsContextProvider>
              <Header />
              <>
                <ScheduleHeader onFilter={onFilter} isActive={shouldFilter} />
                <WithScheduleWrapper filterActive={shouldFilter} teamId={21} />
              </>
              <BrowserRouter basename="/">
                <Switch>
                  <Route exact path={index} component={Homepage} />
                  <Route exact path={playerDetails} component={PlayerDetails} />
                </Switch>
              </BrowserRouter>
              <Footer />
            </LeagueStatsContextProvider>
          </ScheduleContextProvider>
        </PlayerDetailsContextProvider>
      </PointSummaryContextProvider>
    </PlayersContextProvider>
  );
}

export default App;
