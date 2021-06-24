import './Game.css';

const Game = ({ game }) => {  
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
  
  return (
    <>
    <div className={game.status.detailedState.toLowerCase() === 'final' ? 'gameContainerFinished' : 'gameContainer'}>
      {summary()}
      <div className="gameWrapper">
        <div className="gameBox">
          <div className="teamSection">
            <img className="team-logo" src={`/team-logos/${game.teams.away.team.abbreviation}.png`} alt="" />
            <div className="teamName">{game.teams.away.team.abbreviation}</div>
            {game.status.detailedState.toLowerCase() === 'final' ? (
              <div>{game.teams.away.score}</div>
            ) : 
            <div></div>
          }
          </div>
            <div className="teamSection">
              <img className="team-logo" src={`/team-logos/${game.teams.home.team.abbreviation}.png`} alt="" />
              <div className="teamName">{game.teams.home.team.abbreviation}</div>
              {game.status.detailedState.toLowerCase() === 'final' ? (
                <div>{game.teams.home.score}</div>
              ) : 
              <div></div>}
            </div>
          </div>
        </div>
      <div className="gameBox">
        <div className="gameDate">
          {new Date(game.gameDate).toLocaleString() }
        </div>
      </div>
    </div>
    </>
  );
};

export default Game;
