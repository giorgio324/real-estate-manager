import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

import Home from './pages/Home';
import RootLayout from './layouts/RootLayout';
import Create from './pages/Create';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ModalProvider } from './context/ModalContext';
import RealEstate from './pages/RealEstate';
import { FilterProvider } from './context/FilterContext';

const queryClient = new QueryClient();

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout />}>
      <Route
        index
        element={
          <FilterProvider>
            <Home />
          </FilterProvider>
        }
      />
      <Route path='create' element={<Create />} />
      <Route path='estate/:id' element={<RealEstate />} />
    </Route>
  )
);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ModalProvider>
        <RouterProvider router={router} />
      </ModalProvider>
    </QueryClientProvider>
  );
};
export default App;
