import { Link } from 'react-router-dom';
import { VendoorLogo } from '../ui/icons';

const LogoLink = () => {
  return (
    <>
      <Link to={'/'}>
        <VendoorLogo className="w-32 h-8" />
        <span className="sr-only">Vendoor</span>
      </Link>
    </>
  );
};

export default LogoLink;
