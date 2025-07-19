import { Routes, Route } from 'react-router-dom';
import MainLayout from '../components/Layouts/MainLayout';
import Home from '../pages/home';
import Archive from '../pages/archive';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<MainLayout children={<Home />} />} />
      <Route path="/archive" element={<MainLayout children={<Archive />} />} />
    </Routes>
  );
};

export default AppRoutes;
