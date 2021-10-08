import { useContext, useEffect, useMemo, useState } from 'react';
import { PlayersContext } from '../../contexts/PlayersContext';
import Player from './Player';
import banner from './banner.jpeg';
import './Players.css';

const Players = () => {
  const [ { data, loading }, fetchPlayers ] = useContext(PlayersContext);
  const [searchFilter, setSearchFilter] = useState('');

  const filteredPlayers = useMemo(() => {
    return data?.filter(player => player.jerseyNumber?.toLowerCase().includes(searchFilter) ||
        player.person.fullName.toLowerCase().includes(searchFilter) ||
        player.person.birthCountry.toLowerCase().includes(searchFilter) ||
        player.position.abbreviation.toLowerCase().includes(searchFilter)
    )
  }, [searchFilter, data]) 

  const onChange = (ev) => {
    setSearchFilter(ev.target.value.trim().toLowerCase());
  };

  useEffect(() => {
    fetchPlayers();
  }, [fetchPlayers]);

  if (loading || !data) {
    return null;
  }

  return (
    <>
      <img className="playersbanner" src={banner} alt="" />
      <div className="playersPage">
        <input type="text" name="search" placeholder="Search.." onChange={onChange} />
        <div className="container">
          {filteredPlayers?.map(player => <Player player={player} key={player.person.id} />)}
        </div>
      </div>
    </>
  );
};

export default Players;