import './Schedule.css';

const ScheduleHeader = ({ onFilter, isActive }) => {
  return (
    <div className="scheduleHeader">
      <div
        onClick={onFilter}
        className={isActive ? 'scheduleHeader-container-active' : 'scheduleHeader-container'}
      >
        <img className="logo-team-small" src={`/team-logos/COL.png`} alt="" />
      </div>
    </div>
  );
};

export default ScheduleHeader;