const STORAGE_KEY = 'library';
import { Book } from '../types/Book';

export const storage = {
  getBooks: (): Book[] => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return [];
      
      const books = JSON.parse(stored);
      // Conversion des dates string en objets Date
      return books.map((book: any) => ({
        ...book,
        startDate: book.startDate ? new Date(book.startDate) : undefined,
        completionDate: book.completionDate ? new Date(book.completionDate) : undefined
      }));
    } catch {
      return [];
    }
  },
  
  saveBooks: (books: Book[]): void => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
  }
}; 