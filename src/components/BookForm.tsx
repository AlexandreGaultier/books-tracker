import { useState, useEffect } from 'react';
import './BookForm.css';
import Book from '../types/Book';

interface BookFormProps {
  book?: Book;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (book: Book) => void;
}

export default function BookForm({ book, isOpen, onClose, onSubmit }: BookFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    totalPages: 0,
    progress: 0,
    status: 'to-read',
    coverUrl: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (book) {
      setFormData(book);
    }
  }, [book]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Le titre est requis';
    }
    
    if (!formData.author.trim()) {
      newErrors.author = "L'auteur est requis";
    }
    
    if (formData.totalPages <= 0) {
      newErrors.totalPages = 'Le nombre de pages doit être supérieur à 0';
    }
    
    if (formData.progress < 0) {
      newErrors.progress = 'La progression ne peut pas être négative';
    }
    
    if (formData.progress > formData.totalPages) {
      newErrors.progress = 'La progression ne peut pas dépasser le nombre total de pages';
    }
    
    if (formData.coverUrl && !formData.coverUrl.match(/^https?:\/\/.+\/.+$/)) {
      newErrors.coverUrl = "L'URL de l'image n'est pas valide";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({
        id: book?.id || crypto.randomUUID(),
        ...formData
      });
    }
  };

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <h2>{book ? 'Modifier' : 'Ajouter'} un livre</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Titre</label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className={errors.title ? 'error' : ''}
            />
            {errors.title && <span className="error-message">{errors.title}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="author">Auteur</label>
            <input
              type="text"
              id="author"
              value={formData.author}
              onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
              className={errors.author ? 'error' : ''}
            />
            {errors.author && <span className="error-message">{errors.author}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="totalPages">Nombre de pages</label>
              <input
                type="number"
                id="totalPages"
                min="1"
                value={formData.totalPages}
                onChange={(e) => setFormData(prev => ({ ...prev, totalPages: parseInt(e.target.value) || 0 }))}
                className={errors.totalPages ? 'error' : ''}
              />
              {errors.totalPages && <span className="error-message">{errors.totalPages}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="progress">Pages lues</label>
              <input
                type="number"
                id="progress"
                min="0"
                max={formData.totalPages}
                value={formData.progress}
                onChange={(e) => setFormData(prev => ({ ...prev, progress: parseInt(e.target.value) || 0 }))}
                className={errors.progress ? 'error' : ''}
              />
              {errors.progress && <span className="error-message">{errors.progress}</span>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="status">Statut</label>
            <select
              id="status"
              value={formData.status}
              onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as Book['status'] }))}
            >
              <option value="to-read">À lire</option>
              <option value="reading">En lecture</option>
              <option value="completed">Terminé</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="coverUrl">URL de la couverture</label>
            <input
              type="url"
              id="coverUrl"
              value={formData.coverUrl}
              onChange={(e) => setFormData(prev => ({ ...prev, coverUrl: e.target.value }))}
              className={errors.coverUrl ? 'error' : ''}
            />
            {errors.coverUrl && <span className="error-message">{errors.coverUrl}</span>}
          </div>

          <div className="form-actions">
            <button type="button" onClick={onClose}>Annuler</button>
            <button type="submit" className="primary">
              {book ? 'Modifier' : 'Ajouter'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 