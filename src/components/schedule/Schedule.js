import { useCallback, useContext, useEffect, useState } from 'react';
import { ScheduleContext } from '../../contexts/ScheduleContext';
import Game from './Game';
import './Schedule.css';
import ScheduleHeader from './ScheduleHeader';

const Schedule = () => {
  const [ { data, loading }, fetchSchedule ] = useContext(ScheduleContext);
  const [ shouldFilter, setShouldFilter ] = useState(false);

  useEffect(() => {
    const startDate = new Date();
    startDate.setHours(startDate.getHours() - (72));
    const endDate = new Date();
    endDate.setHours(endDate.getHours() + 168);
    fetchSchedule(startDate.toISOString().split('T')[0], endDate.toISOString().split('T')[0]);
  }, [fetchSchedule]);

  const onFilter = useCallback(() => {
    setShouldFilter(!shouldFilter);
  }, [shouldFilter]);

  if (loading || !data) {
    return null;
  }

  const filteredData = data.map(event => ({
      ...event,
      games: event.games.filter(game => shouldFilter ?
        (game.teams.away.team.id === 21 || game.teams.home.team.id === 21) :
        true
      )
    })
  );
    
  const firstLive = filteredData.map(event => event.games
    .find(game => game.status.detailedState.toLowerCase() === 'scheduled'))
    .filter(foundGames => !!foundGames)[0];

  return (
    <>
      <ScheduleHeader onFilter={onFilter} isActive={shouldFilter} />
      <div className="schedule">
        {filteredData?.map((event, index) => {
          return (
            <div key={index} className="games-event">
              {event.games.map((game, idx) => <Game shouldScroll={game.gamePk === firstLive?.gamePk} game={game} key={idx} />
              )}
            </div>
          );
        })}
    </div>
    </>
  );
};

export default Schedule;