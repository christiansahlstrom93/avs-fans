import { useContext } from "react";
import { ConfigContext } from '../../contexts/ConfigContext'
import './Header.css';

const Header = () => {
  const [ config ] = useContext(ConfigContext);

  return (
    <div className="header" style={{ backgroundColor: config.header.color }}>
      <a href="/">
        <img className="logo" src={config.header.logo} alt='logo' />
      </a>
      <a className="link" href="/" >Colorado Avalanche</a>
    </div>
  );
};

export default Header;