import { useHistory } from 'react-router';
import { useCallback } from 'react';
import {BASE_HEADSHOT_URL} from '../../contants'

const TopThree = ({ roster, stats }) => {
  const history = useHistory();
  const onNavigate = useCallback((playerId) => () => history.push(`/player/${playerId}`), [history]);
  if (!roster || !stats) { 
    return null;
  }

  stats.sort((a, b) => a.p > b.p ? -1 : 1);

  if (stats.length < 3 || stats[0].p < 1) {
    return null;
  }

  const topThree = [ stats[0], stats[1], stats[2] ];

  return (
    <div className="topThreeContainer">
      <div className="topThreeHeadline">
        Top three
      </div>
      <div className="topThreeLogoWrapper">
        {topThree.map(top => (
          <div key={top.playerId} className="topThreeInfo">
            <img className="headshot" alt="player" src={`${BASE_HEADSHOT_URL}${top.playerId}.jpg`} onClick={onNavigate(top.playerId)} />
            <div className="topThreeText bold">P: {top.p}</div>
            <div className="topThreeText">GP: {top.games}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopThree;