export function formatDate(date: Date | string): string {
  const d = new Date(date);
  return new Intl.DateTimeFormat('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(d);
}

export function getDaysBetween(start: Date | string, end: Date | string = new Date()): number {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

export function isToday(date: Date | string): boolean {
  const d = new Date(date);
  const today = new Date();
  return d.getDate() === today.getDate() &&
    d.getMonth() === today.getMonth() &&
    d.getFullYear() === today.getFullYear();
}

export function getMonthName(date: Date | string): string {
  return new Intl.DateTimeFormat('fr-FR', { month: 'long' }).format(new Date(date));
}

export function getReadingStreak(readingDates: Date[]): number {
  if (!readingDates.length) return 0;

  let streak = 0;
  let currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  // Trie les dates par ordre décroissant
  const sortedDates = readingDates
    .map(d => new Date(d))
    .sort((a, b) => b.getTime() - a.getTime());

  // Vérifie si l'utilisateur a lu aujourd'hui
  const lastReadDate = new Date(sortedDates[0]);
  lastReadDate.setHours(0, 0, 0, 0);

  if (lastReadDate.getTime() !== currentDate.getTime()) {
    return 0;
  }

  // Compte les jours consécutifs
  for (let i = 0; i < sortedDates.length - 1; i++) {
    const current = new Date(sortedDates[i]);
    const next = new Date(sortedDates[i + 1]);
    current.setHours(0, 0, 0, 0);
    next.setHours(0, 0, 0, 0);

    const diffDays = (current.getTime() - next.getTime()) / (1000 * 60 * 60 * 24);

    if (diffDays === 1) {
      streak++;
    } else {
      break;
    }
  }

  return streak + 1; // +1 pour inclure aujourd'hui
} 