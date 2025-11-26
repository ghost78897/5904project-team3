import { useState } from 'react';
import { HomePage } from './components/HomePage';
import { TravelRoutePage } from './components/TravelRoutePage';
import { TravelNotesPage } from './components/TravelNotesPage';
import { BookBoyPage } from './components/BookBoyPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const navigateToPage = (page: string) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#f5f2f0' }}>
      {/* Top Navigation Bar */}
      <header className="w-full py-6 px-8 shadow-md flex-shrink-0" style={{ backgroundColor: '#655d25' }}>
        <div className="max-w-[1440px] mx-auto flex items-center justify-between px-4">
          {/* Logo and Title */}
          <div>
            <h1 className="text-white text-2xl mb-1" style={{ fontFamily: 'serif' }}>
              Xu Xiake Digital Interactive Map
            </h1>
            <p className="text-white/80 text-xs">徐霞客数字互动地图</p>
          </div>

          {/* Navigation Buttons */}
          <nav className="flex gap-6 flex-wrap">
            <NavButton 
              label="Home" 
              isActive={currentPage === 'home'}
              onClick={() => navigateToPage('home')}
            />
            <NavButton 
              label="Travel Route" 
              isActive={currentPage === 'route'}
              onClick={() => navigateToPage('route')}
            />
            <NavButton 
              label="Travel Notes" 
              isActive={currentPage === 'notes'}
              onClick={() => navigateToPage('notes')}
            />
            <NavButton 
              label="Book Boy" 
              isActive={currentPage === 'chat'}
              onClick={() => navigateToPage('chat')}
            />
          </nav>
        </div>
      </header>

      {/* Main Content Area - Centered with max width */}
      <main className="flex-1 w-full max-w-[1440px] mx-auto">
        {currentPage === 'home' ? (
          <HomePage onNavigate={navigateToPage} />
        ) : currentPage === 'route' ? (
          <TravelRoutePage onNavigate={navigateToPage} />
        ) : currentPage === 'notes' ? (
          <TravelNotesPage onNavigate={navigateToPage} />
        ) : currentPage === 'chat' ? (
          <BookBoyPage onNavigate={navigateToPage} />
        ) : (
          <PlaceholderPage page={currentPage} />
        )}
      </main>
    </div>
  );
}

function NavButton({ label, isActive, onClick }: { label: string; isActive: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`px-5 py-2 rounded-lg transition-all duration-300 ${
        isActive ? 'shadow-lg scale-105' : 'hover:scale-105'
      }`}
      style={{
        backgroundColor: isActive ? '#959d8b' : '#636c53',
        color: '#f5f2f0'
      }}
    >
      {label}
    </button>
  );
}

function PlaceholderPage({ page }: { page: string }) {
  const pageNames: Record<string, string> = {
    route: 'Travel Route',
    notes: 'Travel Notes',
    chat: 'Book Boy'
  };

  return (
    <div className="text-center">
      <h2 style={{ color: '#655d25' }} className="mb-4">
        {pageNames[page]}
      </h2>
      <p style={{ color: '#636c53' }}>
        This page is under construction.
      </p>
    </div>
  );
}