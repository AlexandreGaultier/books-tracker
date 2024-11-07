import type { Achievement } from '../types/Achievement';

export const achievements: Achievement[] = [
  {
    id: 'first-book',
    title: 'Premier Pas',
    description: 'Terminez votre premier livre',
    icon: '📚',
    condition: (stats) => stats.completedBooks >= 1,
    rarity: 'common',
    points: 10
  },
  {
    id: 'bookworm',
    title: 'Dévoreur de Livres',
    description: 'Lisez plus de 1000 pages',
    icon: '🐛',
    condition: (stats) => stats.totalPages >= 1000,
    rarity: 'common',
    points: 20
  },
  {
    id: 'library-master',
    title: 'Maître Bibliothécaire',
    description: 'Complétez 10 livres',
    icon: '🎓',
    condition: (stats) => stats.completedBooks >= 10,
    rarity: 'rare',
    points: 50
  },
  {
    id: 'marathon-reader',
    title: 'Marathon de Lecture',
    description: 'Lisez 5 livres en un mois',
    icon: '🏃',
    condition: (stats) => stats.booksThisMonth >= 5,
    rarity: 'epic',
    points: 100
  },
  {
    id: 'epic-journey',
    title: 'Voyage Épique',
    description: 'Terminez un livre de plus de 500 pages',
    icon: '🗺️',
    condition: (stats) => stats.longestBook >= 500,
    rarity: 'rare',
    points: 30
  },
  {
    id: 'consistent-reader',
    title: 'Lecteur Assidu',
    description: 'Maintenez une série de lecture pendant 7 jours',
    icon: '📅',
    condition: (stats) => stats.readingStreak >= 7,
    rarity: 'epic',
    points: 75
  }
]; 