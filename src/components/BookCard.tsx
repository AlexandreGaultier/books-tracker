import type Book from '../types/Book';
import './BookCard.css';

interface BookCardProps {
  book: Book;
  onEdit: (book: Book) => void;
}

export default function BookCard({ book, onEdit }: BookCardProps) {
  const progressPercentage = (book.progress / book.totalPages) * 100;

  return (
    <div className="book-card glass-card">
      <div className="book-cover">
        {book.coverUrl ? (
          <img src={book.coverUrl} alt={book.title} />
        ) : (
          <div className="book-cover-placeholder">
            <span>{book.title[0]}</span>
          </div>
        )}
      </div>

      <div className="book-info">
        <h3>{book.title}</h3>
        <p className="book-author">{book.author}</p>
        
        <div className="book-progress">
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <span className="progress-text">
            {book.progress} / {book.totalPages} pages
          </span>
        </div>

        <div className="book-status">
          <span className={`status-badge ${book.status}`}>
            {book.status}
          </span>
        </div>

        <button className="edit-btn" onClick={() => onEdit(book)}>
          Modifier
        </button>
      </div>
    </div>
  );
} 