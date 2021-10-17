import { useContext, useEffect } from "react";
import { LeagueStatsContext } from "../../contexts/LeagueStatsContext";
import LeagueTable from "./LeagueTable";
import './LeagueStats.css';

const PREFERRED_DIVISION = 'Central';

const LeageuStats = () => {
  const [ { data, loading }, fetchLeagueStats ] = useContext(LeagueStatsContext);

  useEffect(() => {
    if (!data || (!data && loading)) {
      fetchLeagueStats();
    }
  }, [fetchLeagueStats, data, loading]);

  if (loading) {
    return null;
  }

  if (!data) {
    return null;
  }

  data.sort((a, b) => a.division.name === PREFERRED_DIVISION ? -1 : 1);

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