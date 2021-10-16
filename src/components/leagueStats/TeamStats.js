import { useContext, useEffect } from "react";
import { PointSummaryContext } from "../../contexts/PointSummaryContext";

const TeamStats = () => {
  const [ { data, loading, error }, fetchPointSummare ] = useContext(PointSummaryContext);

  useEffect(() => {
    if (!data || (!data && loading) && !error) {
      // fetchPointSummare();
    }
  }, [fetchPointSummare, data, loading, error]);

  console.log('team')

  if (loading) {
    return <div>Loading stats...</div>
  }

  if (!data) {
    return null;
  }

  return (
    <div>
      Stats
    </div>
  );
};

export default TeamStats;