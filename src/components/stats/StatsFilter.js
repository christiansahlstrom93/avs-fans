import Tab from '../tab/Tab';
import './Stats.css'

const statsFilter = ({ statistics, currentId, onClick }) => {
  const leagues = statistics[0].splits.map(stats => ({
    name: stats.league.name,
    id: stats.league.id ?? stats.league.name
  }));

  const tabs = leagues.filter((league, idx, arr) => arr.findIndex(t => (t.id === league.id)) === idx)
  
  return (
    <div className="statsFilter">
      {tabs.map(tab => (
        <Tab
          key={tab.id}
          name={tab.name}
          id={tab.id}
          isActive={currentId === tab.id}
          onClick={onClick}
        />
      ))}
    </div>
  );
};

export default statsFilter;