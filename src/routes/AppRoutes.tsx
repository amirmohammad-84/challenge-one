// src/routes/AppRoutes.tsx یا AppRoutes.jsx
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/home';
import Archive from '../pages/archive';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/archive" element={<Archive />} />
    </Routes>
  );
};

export default AppRoutes;
