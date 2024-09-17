import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

import Home from './pages/Home';
import RootLayout from './layouts/RootLayout';
import Create from './pages/Create';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path='create' element={<Create />} />
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};
export default App;
