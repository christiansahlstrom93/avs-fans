import React, { useContext } from "react";
import { SimulationContext } from "../../contexts/SimulationContext";
import "./Simulation.css";

const Simulation = () => {
  const [{ data, loading }, , clear] = useContext(SimulationContext);

  const onCloseClick = () => {
    clear();
  };

  const renderTopBar = () => (
    <div className="closeBar">
      <img className="closeImg" src="/logos/close.png" onClick={onCloseClick} />
    </div>
  );

  if (loading) {
    return (
      <div>
        {renderTopBar()}
        <div className="loadingSim">
          <div className="loader circle" />
          <div className="loadingText">Simulating...</div>
        </div>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  if (
    !data[0].totalAwayGames ||
    !data[0].totalHomeGames ||
    !data[1].totalAwayGames ||
    !data[1].totalHomeGames
  ) {
    return (
      <div className="simulation">
        {renderTopBar()}
        <div className="no-games">
          Not enough games played to make simulations
        </div>
      </div>
    );
  }

  const renderTeamData = (simData, isHome) => (
    <div className="simTeam">
      <div className="simTeamNameContainer">
        <div className="simTeamName">{simData.teamData.name}</div>
        <img
          className="logo-team-small"
          src={`/team-logos/${simData.teamData.abbreviation}.png`}
          alt=""
        />
      </div>
      <div className="simScore">
        {isHome ? simData.homeScoresAvg : simData.awayScoresAvg}
      </div>
      <ul>
        <li className="simInfoText">
          Predicted score:{" "}
          {isHome ? simData.homeScoresAvg : simData.awayScoresAvg}
        </li>
        <li className="simInfoText">
          {`Has won ${simData.totalWinsPercentage}% of the games`}
        </li>
        <li className="simInfoText">
          {`Has won ${
            isHome
              ? simData.totalHomeWinsPercentage
              : simData.totalAwayWinsPercentage
          }% of the ${isHome ? "home" : "away"} games`}
        </li>
        <li className="simInfoText">
          {`Simulation made of ${simData.totalGames} games (${simData.totalHomeGames} home, ${simData.totalAwayGames} away)`}
        </li>
      </ul>
    </div>
  );

  return (
    <div className="simulation">
      {renderTopBar()}
      <div className="simTeams">
        {renderTeamData(data[0], true)}
        {renderTeamData(data[1])}
      </div>
    </div>
  );
};

export default Simulation;
