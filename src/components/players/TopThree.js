import {BASE_HEADSHOT_URL} from '../../contants'

const TopThree = ({ roster, stats }) => {
  if (!roster || !stats) { 
    return null;
  }

  stats.sort((a, b) => a.p > b.p ? -1 : 1);

  if (stats.length < 3) {
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
            <img className="headshot" alt="player" src={`${BASE_HEADSHOT_URL}${top.playerId}.jpg`} />
            <div className="topThreeText bold">P: {top.p}</div>
            <div className="topThreeText">GP: {top.games}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopThree;