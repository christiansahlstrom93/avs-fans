import { useContext, useEffect, useMemo, useState } from 'react';
import { PlayersContext } from '../../contexts/PlayersContext';
import { PointSummaryContext } from '../../contexts/PointSummaryContext';
import Player from './Player';
import TopThree from './TopThree';
import './Players.css';

const Players = () => {
  const [ { data: playersData, loading }, fetchPlayers ] = useContext(PlayersContext);
  const [ { data: pointsSummaryData, loading: pointsLoading }, fetchPoints ] = useContext(PointSummaryContext);
  const [searchFilter, setSearchFilter] = useState('');

  const filteredPlayers = useMemo(() => {
    return playersData?.filter(player => player.jerseyNumber?.toLowerCase().includes(searchFilter) ||
        player.person.fullName.toLowerCase().includes(searchFilter) ||
        player.person.birthCountry.toLowerCase().includes(searchFilter) ||
        player.position.abbreviation.toLowerCase().includes(searchFilter)
    )
  }, [searchFilter, playersData]) 

  const onChange = (ev) => {
    setSearchFilter(ev.target.value.trim().toLowerCase());
  };

  useEffect(() => {
    fetchPlayers();
  }, [fetchPlayers]);

  useEffect(() => {
    if (!playersData) {
      return;
    }
    if (!pointsSummaryData && !pointsLoading) {
      fetchPoints(playersData.map(player => player.person.id));
    }
  }, [pointsSummaryData, pointsLoading, fetchPoints, playersData]);

  if (loading || !playersData) {
    return null;
  }

  return (
    <>
      <div className="playersPage">
        <input type="text" name="search" placeholder="Search.." onChange={onChange} />
        <TopThree stats={pointsSummaryData} roster={playersData} />
        <div className="container">
          {filteredPlayers?.map(player =>
            <Player
              key={player.person.id}
              player={player} 
              stats={pointsSummaryData?.find(stat => stat.playerId === player.person.id)}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Players;