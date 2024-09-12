import logo from '../assets/images/HeaderLogo.png';
import { Outlet } from 'react-router-dom';

const RootLayout = () => {
  return (
    <>
      <div className='px-[162px] py-[38px]'>
        <img src={logo} alt='Redberry Logo' />
      </div>
      <main className='px-[162px]'>
        <Outlet />
      </main>
    </>
  );
};
export default RootLayout;
