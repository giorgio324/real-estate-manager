import { Link } from 'react-router-dom';
import logo from '../../assets/images/HeaderLogo.png';

const Navbar = () => {
  return (
    <nav className='px-[162px] py-[38px] border border-border'>
      <Link to={'/'}>
        <img src={logo} alt='Redberry Logo' />
      </Link>
    </nav>
  );
};

export default Navbar;
