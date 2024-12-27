import { Route, Routes } from 'react-router';
import MainPage from '../pages/MainPage';
import ErrorPage from '../pages/ErrorPage';

export default function RouterProvider() {
  return (
    <Routes>
      <Route errorElement={<ErrorPage />} path="/" element={<MainPage />}></Route>
    </Routes>
  );
}
