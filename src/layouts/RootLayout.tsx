import { Outlet } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';

const RootLayout = () => {
  return (
    <>
      <Navbar />
      <div className='px-[162px]'>
        <Outlet />
      </div>
    </>
  );
};
export default RootLayout;
