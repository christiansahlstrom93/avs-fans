import { Route, Switch, BrowserRouter } from 'react-router-dom';
import {PlayersContextProvider} from './contexts/PlayersContext'
import { PlayerDetailsContextProvider } from './contexts/PlayerDetailsContext';
import Homepage from './components/homepage/Homepage'
import PlayerDetails from './components/players/PlayerDetails';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import { index,playerDetails } from './routes';
import Schedule from './components/schedule/Schedule';
import { ScheduleContextProvider } from './contexts/ScheduleContext';
import { LeagueStatsContextProvider } from './contexts/LeagueStatsContext';
import './App.css';
import { PointSummaryContextProvider } from './contexts/PointSummaryContext';

const App = () => {
  return (
    <PlayersContextProvider>
      <PointSummaryContextProvider>
        <PlayerDetailsContextProvider>
          <ScheduleContextProvider>
            <LeagueStatsContextProvider>
              <Header />
              <Schedule />
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
