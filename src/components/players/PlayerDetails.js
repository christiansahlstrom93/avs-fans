import { useContext, useEffect, useState } from 'react';
import { useParams, useHistory } from "react-router-dom";
import { PlayerDetailsContext } from '../../contexts/PlayerDetailsContext';
import {BASE_HEADSHOT_URL, BASE_ACTION_SHOT} from '../../contants'
import './PlayerDetails.css';
import backButton from './backButton.png';

const PlayerDetails = () => {
  const [ { data, loading }, fetchDetails ] = useContext(PlayerDetailsContext);
  let { id } = useParams();
  const history = useHistory();
  const [jumbotron, setJumbotronSrc] = useState(`${BASE_ACTION_SHOT}${id}.jpg`);
  const onNavigate = () => history.replace('/');

  const onError = () => setJumbotronSrc('https://cms.nhl.bamgrid.com/images/arena/default/21.jpg')

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    fetchDetails(id);
  }, [fetchDetails, id]);

  if (loading || !data) {
    return null;
  }

  console.log(data)

  return (
    <div className="playerDetailsContainer">
      <div className="imageContainer">
        <img onError={onError} className="jumbrotron" src={jumbotron} alt="" />
        <img className="headshot-details" alt="player" src={`${BASE_HEADSHOT_URL}${id}.jpg`} />
      </div>
      <img className="backButton" onClick={onNavigate} src={backButton} alt="" />
      <div className="playerContent">
        <div className="subContent">
          <div className="name">{`${data.fullName} | #${data.primaryNumber}`}</div>
        </div>
        <div className="subContent">
          <div className="additionalInfo">{`${data.primaryPosition.abbreviation} | ${data.height} | ${data.weight} lb | Age ${data.currentAge}`}</div>
        </div>
      </div>
    </div>
  );
};

export default PlayerDetails;