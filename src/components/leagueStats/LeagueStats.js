import { useContext, useEffect } from "react";
import { LeagueStatsContext } from "../../contexts/LeagueStatsContext";
import LeagueTable from "./LeagueTable";
import './LeagueStats.css';

const LeageuStats = () => {
  const [ { data, loading }, fetchLeagueStats ] = useContext(LeagueStatsContext);

  useEffect(() => {
    if (!data || (!data && loading)) {
      fetchLeagueStats();
    }
  }, [fetchLeagueStats, data, loading]);

  if (loading) {
    return <div>Loading stats...</div>
  }

  if (!data) {
    return null;
  }

  return (
    <div className="leagueStatsPage">
      {data.map(stats => (
        <div key={stats.division.id} className="leagueTableContainer">
          <LeagueTable stats={stats} />
        </div>
      ))}
    </div>
  );
};

export default LeageuStats;