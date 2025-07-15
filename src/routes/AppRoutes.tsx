import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../components/Layouts/MainLayout';
import Home from '../pages/home';
import Archive from '../pages/archive';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout children={<Home />} />} />
      <Route path="/archive" element={<MainLayout children={<Archive />} />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
