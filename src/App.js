import { Route, Switch, BrowserRouter } from 'react-router-dom';
import {PlayersContextProvider} from './contexts/PlayersContext'
import { PlayerDetailsContextProvider } from './contexts/PlayerDetailsContext';
import Players from './components/players/Players'
import PlayerDetails from './components/players/PlayerDetails';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import { index,playerDetails } from './routes';
import Schedule from './components/schedule/Schedule';
import { ScheduleContextProvider } from './contexts/ScheduleContext';
import './App.css';

const App = () => {
  return (
    <PlayersContextProvider>
      <PlayerDetailsContextProvider>
        <ScheduleContextProvider>
          <Header />
          <Schedule />
          <BrowserRouter basename="/">
            <Switch>
              <Route exact path={index} component={Players} />
              <Route exact path={playerDetails} component={PlayerDetails} />
            </Switch>
          </BrowserRouter>
          <Footer />
        </ScheduleContextProvider>
      </PlayerDetailsContextProvider>
    </PlayersContextProvider>
  );
}

export default App;
