import { useState, useEffect } from 'react';
import type Book from '../types/Book';
import './BookForm.css';

interface BookFormProps {
  book?: Book;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (book: Book) => void;
}

export default function BookForm({ book, isOpen, onClose, onSubmit }: BookFormProps) {
  const [formData, setFormData] = useState<Partial<Book>>({
    title: '',
    author: '',
    totalPages: 0,
    status: 'to-read',
    progress: 0,
    coverUrl: ''
  });

  useEffect(() => {
    if (book) {
      setFormData(book);
    }
  }, [book]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      id: book?.id || crypto.randomUUID(),
      ...formData as Book
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content glass-card">
        <button className="close-button" onClick={onClose}>×</button>
        
        <h2>{book ? 'Modifier' : 'Ajouter'} un livre</h2>
        
        <form onSubmit={handleSubmit} className="book-form">
          <div className="form-group">
            <label htmlFor="title">Titre</label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="author">Auteur</label>
            <input
              type="text"
              id="author"
              value={formData.author}
              onChange={e => setFormData(prev => ({ ...prev, author: e.target.value }))}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="totalPages">Nombre de pages</label>
              <input
                type="number"
                id="totalPages"
                value={formData.totalPages}
                onChange={e => setFormData(prev => ({ ...prev, totalPages: parseInt(e.target.value) }))}
                required
                min="1"
              />
            </div>

            <div className="form-group">
              <label htmlFor="progress">Pages lues</label>
              <input
                type="number"
                id="progress"
                value={formData.progress}
                onChange={e => setFormData(prev => ({ ...prev, progress: parseInt(e.target.value) }))}
                max={formData.totalPages}
                min="0"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="status">Statut</label>
            <select
              id="status"
              value={formData.status}
              onChange={e => setFormData(prev => ({ ...prev, status: e.target.value as Book['status'] }))}
            >
              <option value="to-read">À lire</option>
              <option value="reading">En cours</option>
              <option value="completed">Terminé</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="coverUrl">URL de la couverture</label>
            <input
              type="url"
              id="coverUrl"
              value={formData.coverUrl}
              onChange={e => setFormData(prev => ({ ...prev, coverUrl: e.target.value }))}
              placeholder="https://..."
            />
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Annuler
            </button>
            <button type="submit" className="submit-btn">
              {book ? 'Modifier' : 'Ajouter'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 