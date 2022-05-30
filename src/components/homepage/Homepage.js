import { useCallback, useState, useContext } from "react";
import { ConfigContext } from "../../contexts/ConfigContext";
import LatestNews from "../latestNews/LatestNews";
import LeageuStats from "../leagueStats/LeagueStats";
import Players from "../players/Players";
import Tab from "../tab/Tab";
import "./Homepage.css";

const PLAYERS_TAB = 0;
const STATS_TAB = 1;
const LATEST_TAB = 2;

const Homepage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [config] = useContext(ConfigContext);
  const getContent = useCallback(() => {
    if (activeTab === PLAYERS_TAB) {
      return <Players />;
    } else if (activeTab === STATS_TAB) {
      return <LeageuStats />;
    } else if (activeTab === LATEST_TAB) {
      return <LatestNews />;
    }
    return null;
  }, [activeTab]);

  const onTabClick = useCallback((id) => setActiveTab(id), [setActiveTab]);

  return (
    <div>
      <img className="playersbanner" src={config.banner} alt="" />
      <div className="tabs">
        <Tab
          isActive={activeTab === PLAYERS_TAB}
          name="Roster"
          id={PLAYERS_TAB}
          onClick={onTabClick}
        />
        <Tab
          isActive={activeTab === STATS_TAB}
          name="Stats"
          id={STATS_TAB}
          onClick={onTabClick}
        />
        <Tab
          isActive={activeTab === LATEST_TAB}
          name="Latest news"
          id={LATEST_TAB}
          onClick={onTabClick}
        />
      </div>
      {getContent()}
    </div>
  );
};

export default Homepage;
