import { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import BookCard from './components/BookCard';
import BookForm from './components/BookForm';
import BookDetails from './components/BookDetails';
import type Book from './types/Book';
import './App.css';
import Notification from './components/Notification';
import initialBooks from './data/books';

function App() {
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | undefined>();
  const [detailBook, setDetailBook] = useState<Book | undefined>();
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error' | 'info';
  } | null>(null);

  const showNotification = (message: string, type: 'success' | 'error' | 'info') => {
    setNotification({ message, type });
  };

  const handleAddBook = (book: Book) => {
    setBooks(prev => [...prev, book]);
    setIsFormOpen(false);
    showNotification('Livre ajouté avec succès !', 'success');
  };

  const handleEditBook = (book: Book) => {
    setBooks(prev => prev.map(b => b.id === book.id ? book : b));
    setIsFormOpen(false);
    showNotification('Livre modifié avec succès !', 'success');
  };

  const handleUpdateProgress = (bookId: string, progress: number) => {
    setBooks(prev => prev.map(book => {
      if (book.id === bookId) {
        const newStatus = progress === book.totalPages ? 'completed' : 'reading';
        const wasCompleted = newStatus === 'completed' && book.status !== 'completed';
        
        if (wasCompleted) {
          showNotification('Félicitations ! Vous avez terminé ce livre !', 'success');
        } else {
          showNotification('Progression mise à jour !', 'success');
        }

        return {
          ...book,
          progress,
          status: newStatus,
          completionDate: newStatus === 'completed' ? new Date() : undefined
        };
      }
      return book;
    }));
  };

  return (
    <ThemeProvider>
      <div className="app">
        <Navbar onAddClick={() => setIsFormOpen(true)} />
        
        <main className="main-content">
          <Dashboard books={books} userName="Alexandre" />
          
          <section className="books-section">
            <div className="books-grid">
              {books.map(book => (
                <BookCard 
                  key={book.id}
                  book={book}
                  onEdit={() => {
                    setSelectedBook(book);
                    setIsFormOpen(true);
                  }}
                  onClick={() => setDetailBook(book)}
                />
              ))}
            </div>
          </section>
        </main>

        <BookForm
          book={selectedBook}
          isOpen={isFormOpen}
          onClose={() => {
            setIsFormOpen(false);
            setSelectedBook(undefined);
          }}
          onSubmit={selectedBook ? handleEditBook : handleAddBook}
        />

        {detailBook && (
          <BookDetails
            book={detailBook}
            isOpen={!!detailBook}
            onClose={() => setDetailBook(undefined)}
            onUpdateProgress={(progress) => {
              handleUpdateProgress(detailBook.id, progress);
            }}
          />
        )}

        {notification && (
          <Notification
            message={notification.message}
            type={notification.type}
            onClose={() => setNotification(null)}
          />
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
