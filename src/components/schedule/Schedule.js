import { useContext, useEffect } from 'react';
import { ScheduleContext } from '../../contexts/ScheduleContext';
import Game from './Game';
import './Schedule.css';

const Schedule = () => {
  const [ { data, loading }, fetchSchedule ] = useContext(ScheduleContext);

  useEffect(() => {
    const startDate = new Date();
    startDate.setHours(startDate.getHours() - (489));
    const endDate = new Date();
    endDate.setHours(endDate.getHours() + 72);
    fetchSchedule(startDate.toISOString().split('T')[0], endDate.toISOString().split('T')[0]);
  }, [fetchSchedule]);

  if (loading) {
    return null;
  }

  return (
    <div className="schedule">
      {data?.map((event, index) => {
        return (
          <div key={index} className="games-event">
            {event.games.map((game, idx) => <Game game={game} key={idx} />)}
          </div>
        );
      })}
    </div>
  );
};

export default Schedule;