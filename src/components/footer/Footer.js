import { useContext } from "react";
import { ConfigContext } from '../../contexts/ConfigContext'
import './Footer.css';

const Footer = () => {
  const [ config ] = useContext(ConfigContext);
  return (
    <div className="footer">
      <a href="https://www.nhl.com/">
        <img className="footerLogo" src={config.footer.logo} alt="" />
      </a>
    </div>
  );
};

export default Footer;