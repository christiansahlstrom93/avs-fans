import React, { useEffect, useRef, useContext } from 'react';
import { format } from 'date-fns';
import { SimulationContext } from '../../contexts/SimulationContext';
import './Game.css';

const Game = ({ game, shouldScroll }) => {
  const ref = useRef(null);
  const [ , fetchSimulation ] = useContext(SimulationContext);
  const homeTeam = game.teams.home.team;
  const awayTeam = game.teams.away.team;
  const onSimulate = () => {
    fetchSimulation(homeTeam, awayTeam);
  };
  const summary = () => {
    if (!game?.seriesSummary?.seriesStatusShort) {
      return null;
    }
    return (
      <div className="summary">
        <div>
          {game.seriesSummary.seriesStatusShort}
        </div>
        <div>
          {game.seriesSummary.gameLabel}
        </div>
      </div>
    );
  }

  useEffect(() => {
    if (shouldScroll && ref) {
      ref.current.scrollIntoView({ behavior: 'smooth', inline: 'end', block: 'end' })
    }
  }, [ref, shouldScroll, game]);
  
  return (
    <>
    <div id={game.id} ref={ref} className={game.status.detailedState.toLowerCase() === 'final' ? 'gameContainerFinished' : 'gameContainer'}>
      {summary()}
      <div className="gameWrapper">
        <div className="gameBox">
          <div className="teamSection">
            <img className="team-logo" src={`/team-logos/${awayTeam.abbreviation}.png`} alt="" />
            <div className="teamName">{awayTeam.abbreviation}</div>
            {game.status.detailedState.toLowerCase() === 'final' ? (
              <div>{game.teams.away.score}</div>
            ) : 
            <div></div>
          }
          </div>
            <div className="teamSection">
              <img className="team-logo" src={`/team-logos/${homeTeam.abbreviation}.png`} alt="" />
              <div className="teamName">{homeTeam.abbreviation}</div>
              {game.status.detailedState.toLowerCase() === 'final' ? (
                <div>{game.teams.home.score}</div>
              ) : 
              <div></div>}
            </div>
          </div>
        </div>
      <div className="gameBox">
        <div className="gameDate">
          {format(new Date(game.gameDate), 'yyyy-MM-dd hh:mm')}
        </div>
      </div>
      {game.status.detailedState.toLowerCase() === 'scheduled' ? (
        <button className="simulateButton" onClick={onSimulate}>Simulate</button>
      ) : ''}
    </div>
    </>
  );
};

export default Game;
