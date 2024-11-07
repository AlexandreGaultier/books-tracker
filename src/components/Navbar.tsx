import { useTheme } from '../context/ThemeContext';
import './Navbar.css';

interface NavbarProps {
  onAddClick: () => void;
}

export default function Navbar({ onAddClick }: NavbarProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="navbar glass-card">
      <div className="nav-content">
        <div className="nav-logo">
          <span className="logo-icon">📚</span>
          <h1>Bibliothèque</h1>
        </div>

        <div className="nav-actions">
          <button 
            className="add-book-btn"
            onClick={onAddClick}
          >
            <span>+</span> Ajouter un livre
          </button>
          <button 
            className="theme-toggle"
            onClick={toggleTheme}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </nav>
  );
} 