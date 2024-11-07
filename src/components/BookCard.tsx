import type Book from '../types/Book';
import './BookCard.css';

interface BookCardProps {
  book: Book;
  onEdit: () => void;
  onClick: () => void;
}

export default function BookCard({ book, onEdit, onClick }: BookCardProps) {
  return (
    <div className="book-card" onClick={onClick}>
      <div className="book-cover">
        {book.coverUrl ? (
          <img src={book.coverUrl} alt={book.title} />
        ) : (
          <div className="book-cover-placeholder">
            {book.title[0]}
          </div>
        )}
      </div>

      <span className={`status-badge ${book.status}`}>
        {book.status === 'reading' ? 'En lecture' :
         book.status === 'completed' ? 'Terminé' : 'À lire'}
      </span>

      <div className="book-info-overlay">
        <h3 className="book-title">{book.title}</h3>
        <p className="book-author">{book.author}</p>
        
        <div className="book-progress">
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${(book.progress / book.totalPages) * 100}%` }}
            />
          </div>
          <div className="progress-text">
            {book.progress} / {book.totalPages} pages
          </div>
        </div>

        <button 
          className="edit-btn"
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
        >
          Voir
        </button>
      </div>
    </div>
  );
} 