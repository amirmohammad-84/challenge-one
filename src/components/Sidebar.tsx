// src/components/Sidebar.tsx یا Sidebar.jsx
import { Link, useLocation } from 'react-router-dom';
import archiveIcon from '../assets/archive.svg';
import voiceIcon from '../assets/mic.svg';
import logo from '../assets/logo.svg';
import asideImage from '../assets/mainPageAside.svg';

export default function Sidebar() {
  const location = useLocation();
  const activeTab = location.pathname === '/archive' ? 'archive' : 'voice';

  return (
    <div className="hidden lg:flex relative w-44 bg-[#00BA9F] text-white rounded-tl-xl rounded-bl-xl min-h-screen">
      <img
        src={asideImage}
        alt="aside-typography"
        className="absolute top-0 left-0 w-full h-full object-cover"
      />

      <div className="absolute top-6 left-1/2 transform -translate-x-1/2">
        <img src={logo} alt="logo" className="w-14 h-9" />
      </div>

      <Link
        to="/"
        className={`absolute top-56 left-1/2 transform -translate-x-1/2 w-36 h-12 flex items-center justify-center rounded-xl px-4 cursor-pointer transition-opacity ${
          activeTab === 'voice' ? 'bg-[#02816E] text-white' : 'bg-transparent text-black'
        }`}
      >
        <img src={voiceIcon} className="w-6 h-6 ml-3" alt="voice" />
        <span className={activeTab === 'voice' ? 'text-white' : 'text-white'}>
          تبدیل گفتار
        </span>
      </Link>

      <Link
        to="/archive"
        className={`absolute top-80 left-1/2 transform -translate-x-1/2 w-36 h-12 flex items-center justify-center rounded-xl px-4 cursor-pointer transition-opacity ${
          activeTab === 'archive' ? 'bg-[#02816E] text-white' : 'bg-transparent text-black'
        }`}
      >
        <img src={archiveIcon} className="w-6 h-6 ml-7" alt="archive" />
        <span className={activeTab === 'archive' ? 'text-white' : 'text-white'}>
          آرشیو
        </span>
      </Link>
    </div>
  );
}
