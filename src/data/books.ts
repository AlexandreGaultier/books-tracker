import Book from "../types/Book";

const books: Book[] = [
  {
    id: crypto.randomUUID(),
    title: "Dune",
    author: "Frank Herbert",
    totalPages: 412,
    progress: 0,
    status: "to-read",
    coverUrl: "https://m.media-amazon.com/images/I/61HLU-TCZ8L._SY425_.jpg"
  },
  {
    id: crypto.randomUUID(),
    title: "Six of Crows",
    author: "Leigh Bardugo",
    totalPages: 465,
    progress: 357,
    status: "reading",
    coverUrl: "https://m.media-amazon.com/images/I/71vlAhOfuOL._SY342_.jpg"
  },
  {
    id: crypto.randomUUID(),
    title: "Harry Potter à l'école des sorciers",
    author: "J.K. Rowling",
    totalPages: 309,
    progress: 309,
    status: "completed",
    startDate: new Date('2024-01-01'),
    completionDate: new Date('2024-01-25'),
    coverUrl: "https://m.media-amazon.com/images/I/81smq5GDvvL._SY425_.jpg"
  },
  {
    id: crypto.randomUUID(),
    title: "Harry Potter et la Chambre des Secrets",
    author: "J.K. Rowling",
    totalPages: 358,
    progress: 0,
    status: "to-read",
    coverUrl: "https://m.media-amazon.com/images/I/81zKAFxMtzL._SY425_.jpg"
  },
  {
    id: crypto.randomUUID(),
    title: "La harpe des quatres saisons",
    author: "Fabien Olicard",
    totalPages: 350,
    progress: 0,
    status: "to-read",
    coverUrl: "https://m.media-amazon.com/images/I/91T6qQJuOzL._SY425_.jpg"
  },
  {
    id: crypto.randomUUID(),
    title: "1984",
    author: "George Orwell",
    totalPages: 328,
    progress: 0,
    status: "to-read",
    coverUrl: "https://m.media-amazon.com/images/I/71kxa1-0mfL._AC_UY327_FMwebp_QL65_.jpg"
  },
  {
    id: crypto.randomUUID(),
    title: "Le Seigneur des Anneaux",
    author: "J.R.R. Tolkien",
    totalPages: 1178,
    progress: 0,
    status: "to-read",
    coverUrl: "https://m.media-amazon.com/images/I/71jLBXtWJWL._AC_UY327_FMwebp_QL65_.jpg"
  },
  {
    id: crypto.randomUUID(),
    title: "Fondation",
    author: "Isaac Asimov",
    totalPages: 256,
    progress: 0,
    status: "to-read",
    coverUrl: "https://m.media-amazon.com/images/I/81h21w5OEFL._SY425_.jpg"
  },
  {
    id: crypto.randomUUID(),
    title: "Fahrenheit 451",
    author: "Ray Bradbury",
    totalPages: 208,
    progress: 0,
    status: "to-read",
    coverUrl: "https://m.media-amazon.com/images/I/71OFqSRFDgL._AC_UY327_FMwebp_QL65_.jpg"
  },
  {
    id: crypto.randomUUID(),
    title: "Le Meilleur des mondes",
    author: "Aldous Huxley",
    totalPages: 320,
    progress: 0,
    status: "to-read",
    coverUrl: "https://m.media-amazon.com/images/I/71iZzLwuZML._SY425_.jpg"
  }
];

export default books; 