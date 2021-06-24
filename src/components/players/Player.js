import {BASE_HEADSHOT_URL} from '../../contants'
import testimonials from './testimonials.json';
import { useHistory } from 'react-router-dom';
import './Player.css';

const Player = ({ player }) => {
  const history = useHistory();
  const onNavigate = () => history.replace(`/player/${player.person.id}`);
  const testimonial = testimonials[player.person.id]?.testimonial;
  return (
    <div className="playerContainer" onClick={onNavigate}>
    <div className="player-content">
      <div className="logoWrapper">
        <img className="headshot" alt="player" src={`${BASE_HEADSHOT_URL}${player.person.id}.jpg`} />
      </div>
        <div className="textContainer">
          <div className="number">#{player.jerseyNumber}</div>
          <div className="name">{player.person.fullName}</div>
          <div className="pos">{player.position.abbreviation}</div>
        </div>
    </div>
    <div className="testimonial-small">
         {testimonial ? `"${testimonial}"` : ''}
      </div>
    </div>
  );
};

export default Player;