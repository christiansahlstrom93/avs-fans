import './LeagueStats.css';

const LeagueTable = ({ stats }) => {
  return (
    <table>
          <thead>
          <tr>
            <th>{stats.division.name}</th>
            <th className="thCenter">GP</th>
            <th className="thCenter" style={{ fontWeight: 'bold' }}>P</th>
            <th className="thCenter">W</th>
            <th className="thCenter">L</th>
            <th className="thCenter">OT</th>
          </tr>
          </thead>
          <tbody>
            {stats.teamRecords.map((record, idx) => (
              <tr className="leagueTableTr" key={record.team.id}>
                <td>
                  <div className="leagueTableTeamCell">
                    {`${(idx + 1)}`}
                    <img className="team-logo" src={`/team-logos/${record.team.abbreviation}.png`} alt="" />
                    <p>{`${record.team.shortName}`}</p>
                  </div>
                </td>
                <td className="tdCenter">{record.gamesPlayed}</td>
                <td className="tdCenter" style={{ fontWeight: 'bold' }}>{record.points}</td>
                <td className="tdCenter">{record.leagueRecord.wins}</td>
                <td className="tdCenter">{record.leagueRecord.losses}</td>
                <td className="tdCenter">{record.leagueRecord.ot}</td>
              </tr>
            ))}
          </tbody>
    </table>
  );
};

export default LeagueTable;