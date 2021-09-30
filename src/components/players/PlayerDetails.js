import { useContext, useEffect, useState } from 'react';
import { useParams, useHistory } from "react-router-dom";
import { PlayerDetailsContext } from '../../contexts/PlayerDetailsContext';
import {BASE_HEADSHOT_URL, BASE_ACTION_SHOT, HEADSHOT_DEFAULT, JUMBOTRON_DEFAULT} from '../../contants'
import './PlayerDetails.css';
import backButton from './backButton.png';
import Stats from '../stats/Stats';

const PlayerDetails = () => {
  const [ { data, loading }, fetchDetails ] = useContext(PlayerDetailsContext);
  let { id } = useParams();
  const history = useHistory();
  const [jumbotron, setJumbotronSrc] = useState(`${BASE_ACTION_SHOT}${id}.jpg`);
  const [headshot, setHeadshot] = useState(`${BASE_HEADSHOT_URL}${id}.jpg`);

  const onNavigate = () => history.push('/');

  const onError = (func, fallbackSrc) => () => func(fallbackSrc)

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    fetchDetails(id);
  }, [fetchDetails, id]);

  if (loading || !data) {
    return null;
  }

  return (
    <div className="playerDetailsContainer">
      <div className="imageContainer">
        <img onError={onError(setJumbotronSrc, JUMBOTRON_DEFAULT)} className="jumbrotron" src={jumbotron} alt="" />
        <img onError={onError(setHeadshot, HEADSHOT_DEFAULT)} className="headshot-details" alt="player" src={headshot} />
      </div>
      <img className="backButton" onClick={onNavigate} src={backButton} alt="" />
      <div className="playerContent">
        <div className="subContent">
          <div className="name">{`${data.fullName} | #${data.primaryNumber ?? ' N/A'} | ${data.birthCountry ?? 'N/A'}`}</div>
        </div>
        <div className="subContent">
          <div className="additionalInfo">{`${data.primaryPosition.abbreviation} | ${data.height ?? '-'} | ${`${data.weight ?? 'N/A'} lb`}| Age ${data.currentAge}`}</div>
        </div>
      </div>
      <div className="divider" />
      <Stats statistics={data.stats} leagueId={133} />
    </div>
  );
};

export default PlayerDetails;