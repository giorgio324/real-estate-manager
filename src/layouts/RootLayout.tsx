import logo from '../assets/images/HeaderLogo.png';
import { Link, Outlet } from 'react-router-dom';

const RootLayout = () => {
  return (
    <>
      <nav className='px-[162px] py-[38px] border-b border-border'>
        <Link to={'/'}>
          <img src={logo} alt='Redberry Logo' />
        </Link>
      </nav>
      <div className='px-[162px]'>
        <Outlet />
      </div>
    </>
  );
};
export default RootLayout;
