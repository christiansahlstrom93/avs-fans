import { useState } from 'react';
import './Stats.css'
import StatsFilter from './StatsFilter';

const DEFAULT_ID = 133;

const Stats = ({ statistics }) => {
  const statsRegular = statistics[0].splits ?? [];
  const defaultId = statsRegular.find(stat => stat.league.id === DEFAULT_ID) ?? (statsRegular[0].league.id ?? statsRegular[0].league.name);
  const [ currentId, setCurrentId ] = useState(defaultId instanceof Object ? defaultId.league.id : defaultId);
  const onFilter = id => { setCurrentId(id) }
  const filteredStats = statsRegular.filter(stat => stat.league.name === currentId || stat.league.id === currentId);
  return (
    <>
      <StatsFilter statistics={statistics} currentId={currentId} onClick={onFilter} />
      <div className="tableContainer">
        <table>
          <thead>
          <tr>
            <th>Season</th>
            <th>Team</th>
            <th>Games</th>
            <th>G</th>
            <th>A</th>
            <th>P</th>
          </tr>
          </thead>
          <tbody>
          {filteredStats.map((stats, idx) => (
            <tr key={`${stats.season}${idx}`}>
              <td>{stats.season.replace(/^(.{4})/,"$1-")}</td>
              <td>{stats.team.abbreviation ?? stats.team.name}</td>
              <td>{stats.stat.games}</td>
              <td>{stats.stat.goals}</td>
              <td>{stats.stat.assists}</td>
              <td>{stats.stat.points}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Stats;