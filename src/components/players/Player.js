import {useCallback, useState} from 'react';
import {BASE_HEADSHOT_URL, HEADSHOT_DEFAULT} from '../../contants'
// import testimonials from './testimonials.json';
import { useHistory } from 'react-router-dom';
import './Player.css';

const Player = ({ player, stats }) => {
  const history = useHistory();
  const onNavigate = () => history.push(`/player/${player.person.id}`);
  const [headshot, setHeadshot] = useState(`${BASE_HEADSHOT_URL}${player.person.id}.jpg`);
  const onError = () => setHeadshot(HEADSHOT_DEFAULT);

  // const testimonial = testimonials[player.person.id]?.testimonial;

  const captainEl = useCallback(() => {
    if (player.person.captain) {
      return ' (C)';
    } else if (player.person.alternateCaptain) {
      return ' (A)';
    }
    return null;
  }, [player]);

  const getStatsEl = useCallback(() => {
    if (!stats) {
      return null;
    }
    return (
      <>
        <div className="bold">P: {stats.p}</div>
        <div>G: {stats.g}</div>
        <div>A: {stats.a}</div>
        <div>GP: {stats.games}</div>
      </>
    );
  }, [stats]);
  
  return (
    <div className="playerContainer" onClick={onNavigate}>
    <div className="player-content">
      <div className="logoWrapper">
        <img onError={onError} className="headshot" alt="player" src={headshot} />
      </div>
      <div>
        <div className="textContainer">
          <div className="playerInfoShort">
            {`#${player.jerseyNumber} ${player.person.fullName}`}
            {captainEl()}
            <img className="country-logo-slim" src={`/country/${player.person.birthCountry}.png`} alt="" />
          </div>
          <div className="statsContainer">
            {getStatsEl()}
          </div>
          <div className="playerInfoShort-pos">{`${player.position.name}`}</div>
        </div>
        </div>
    </div>
    </div>
  );
};

export default Player;