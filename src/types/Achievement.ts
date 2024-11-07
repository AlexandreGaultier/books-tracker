export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  condition: (stats: UserStats) => boolean;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  points: number;
  unlockedAt?: Date;
}

export interface UserStats {
  totalBooks: number;
  completedBooks: number;
  totalPages: number;
  readingStreak: number;
  genresRead: Set<string>;
  longestBook: number;
  booksThisMonth: number;
} 