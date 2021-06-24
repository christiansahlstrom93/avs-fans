import './Header.css';
import logo from './logo.svg'

const Header = () => {
  return (
    <div className="header">
      <img className="logo" src={logo} alt='logo' />
      <a className="link" href="/" >Colorado Avalanche</a>
    </div>
  );
};

export default Header;