export interface Book {
  id: string;
  title: string;
  author: string;
  status: 'reading' | 'completed' | 'to-read';
  progress: number;
  totalPages: number;
  startDate?: Date;
  completionDate?: Date;
  coverUrl?: string;
}