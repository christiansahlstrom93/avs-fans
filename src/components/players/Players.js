import { useContext, useEffect, useMemo, useState } from 'react';
import { PlayersContext } from '../../contexts/PlayersContext';
import Player from './Player';
import './Players.css';

const Players = () => {
  const [ { data, loading }, fetchPlayers ] = useContext(PlayersContext);
  const [searchFilter, setSearchFilter] = useState('');

  const filteredPlayers = useMemo(() => {
    return data?.filter(player => {
      return player.jerseyNumber.toLowerCase().includes(searchFilter) ||
        player.person.fullName.toLowerCase().includes(searchFilter) ||
        player.position.abbreviation.toLowerCase().includes(searchFilter)
    })
  }, [searchFilter, data]) 

  const onChange = (ev) => {
    setSearchFilter(ev.target.value.trim().toLowerCase());
  };

  useEffect(() => {
    fetchPlayers();
  }, [fetchPlayers]);

  if (loading ||  !data) {
    return null;
  }

  return (
    <div className="playersPage">
      <input type="text" name="search" placeholder="Search.." onChange={onChange} />
      <div className="container">
        {filteredPlayers?.map(player => <Player player={player} key={player.jerseyNumber} />)}
      </div>
    </div>
  );
};

export default Players;