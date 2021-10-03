import {useState} from 'react';
import {BASE_HEADSHOT_URL, HEADSHOT_DEFAULT} from '../../contants'
import testimonials from './testimonials.json';
import { useHistory } from 'react-router-dom';
import './Player.css';

const Player = ({ player }) => {
  const history = useHistory();
  const onNavigate = () => history.push(`/player/${player.person.id}`);
  const [headshot, setHeadshot] = useState(`${BASE_HEADSHOT_URL}${player.person.id}.jpg`);
  const onError = () => setHeadshot(HEADSHOT_DEFAULT)

  const testimonial = testimonials[player.person.id]?.testimonial;
  
  return (
    <div className="playerContainer" onClick={onNavigate}>
    <div className="player-content">
      <div className="logoWrapper">
        <img onError={onError} className="headshot" alt="player" src={headshot} />
      </div>
        <div className="textContainer">
          <div className="playerInfoShort">{`${player.person.fullName} #${player.jerseyNumber} ${player.position.abbreviation}`}</div>
        </div>
    </div>
    <div className="testimonial-small">
         {testimonial ? `"${testimonial}"` : ''}
      </div>
    </div>
  );
};

export default Player;