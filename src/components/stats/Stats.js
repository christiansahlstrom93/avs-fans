import './Stats.css'
const stats = ({ statistics, leagueId }) => {
  console.log(statistics[0].splits)
  const filteredStats = statistics[0]?.splits.filter(stat => stat.league.name === leagueId || stat.league.id === leagueId);
  return (
    <div className="tableContainer">
      <table>
        <tr>
          <th>Season</th>
          <th>Team</th>
          <th>Games</th>
          <th>G</th>
          <th>A</th>
          <th>P</th>
        </tr>
        {filteredStats.map(stats => (
          <tr>
            <td>{stats.season.replace(/^(.{4})/,"$1-")}</td>
            <td>{stats.team.abbreviation}</td>
            <td>{stats.stat.games}</td>
            <td>{stats.stat.goals}</td>
            <td>{stats.stat.assists}</td>
            <td>{stats.stat.points}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default stats;