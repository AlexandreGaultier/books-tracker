import { useState } from 'react';
import type Book from '../types/Book';
import { formatDate } from '../utils/dateUtils';
import './BookDetails.css';

interface BookDetailsProps {
  book: Book;
  isOpen: boolean;
  onClose: () => void;
  onUpdateProgress: (progress: number) => void;
}

export default function BookDetails({ book, isOpen, onClose, onUpdateProgress }: BookDetailsProps) {
  const [newProgress, setNewProgress] = useState(book.progress);
  const progressPercentage = (book.progress / book.totalPages) * 100;
  
  const handleProgressUpdate = () => {
    onUpdateProgress(newProgress);
  };

  if (!isOpen) return null;

  return (
    <div className="book-details-overlay" onClick={onClose}>
      <div className="book-details glass-card" onClick={e => e.stopPropagation()}>
        <div className="book-details-content">
          <div className="book-cover-large">
            {book.coverUrl ? (
              <img src={book.coverUrl} alt={book.title} />
            ) : (
              <div className="book-cover-placeholder">
                <span>{book.title[0]}</span>
              </div>
            )}
          </div>

          <div className="book-info-detailed">
            <div className="header-actions">
              <span className={`status-badge ${book.status}`}>
                {book.status === 'reading' ? 'En lecture' :
                 book.status === 'completed' ? 'Terminé' : 'À lire'}
              </span>
              <button className="close-btn" onClick={onClose}>×</button>
            </div>

            <div className="book-header">
              <div className="book-title-author">
                <h2 className="book-title">{book.title},</h2>
                <p className="book-author">{book.author}</p>
              </div>
            </div>

            <div className="reading-progress">
              <div className="progress-stats">
                <div className="progress-bar-detailed">
                  <div 
                    className="progress-fill"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
                <span>{book.progress} / {book.totalPages} pages</span>
              </div>

              <div className="progress-update">
                <label>Mettre à jour votre progression :</label>
                <input
                  type="range"
                  min="0"
                  max={book.totalPages}
                  value={newProgress}
                  onChange={(e) => setNewProgress(Number(e.target.value))}
                />
                <div className="progress-actions">
                  <input
                    type="number"
                    value={newProgress}
                    onChange={(e) => setNewProgress(Number(e.target.value))}
                    min="0"
                    max={book.totalPages}
                  />
                  <button 
                    className="update-btn"
                    onClick={handleProgressUpdate}
                    disabled={newProgress === book.progress}
                  >
                    Mettre à jour
                  </button>
                </div>
              </div>
            </div>

            <div className="book-metadata">
              {book.startDate && (
                <div className="metadata-item">
                  <span className="label">Commencé le</span>
                  <span>{formatDate(book.startDate)}</span>
                </div>
              )}
              
              {book.completionDate && (
                <div className="metadata-item">
                  <span className="label">Terminé le</span>
                  <span>{formatDate(book.completionDate)}</span>
                </div>
              )}
            </div>

            <div className="reading-stats">
              <div className="stat-card">
                <span className="stat-value">
                  {Math.round((book.progress / book.totalPages) * 100)}%
                </span>
                <span className="stat-label">Complété</span>
              </div>
              
              <div className="stat-card">
                <span className="stat-value">
                  {book.totalPages - book.progress}
                </span>
                <span className="stat-label">Pages restantes</span>
              </div>
              
              <div className="stat-card">
                <span className="stat-value">
                  {Math.round(book.progress / (book.startDate ? 
                    (new Date().getTime() - new Date(book.startDate).getTime()) / (1000 * 60 * 60 * 24) : 1)
                  )}
                </span>
                <span className="stat-label">Pages/jour</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 