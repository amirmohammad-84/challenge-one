import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import Sidebar from './components/Sidebar';
import './index.css';

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen" style={{ fontFamily: 'Yekan, sans-serif' }}>
        <Sidebar />

        <main className="flex-1 relative">
          <AppRoutes />
        </main>
      </div>
    </BrowserRouter>
  );
}
