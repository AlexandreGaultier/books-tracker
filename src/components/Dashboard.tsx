import { useMemo } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import encouragements from '../data/encouragements.json';
import titles from '../data/titles.json';
import 'react-circular-progressbar/dist/styles.css';
import './Dashboard.css';

interface DashboardProps {
  books: Book[];
  userName?: string;
}

export default function Dashboard({ books, userName = 'Alexandre' }: DashboardProps) {
  const stats = useMemo(() => {
    const completed = books.filter(b => b.status === 'completed').length;
    const reading = books.filter(b => b.status === 'reading').length;
    const totalBooks = books.length;
    const totalPages = books.reduce((acc, book) => acc + book.progress, 0);
    const level = Math.floor(totalPages / 100) + 1;
    const nextLevel = (level * 100) - totalPages;
    const completionRate = totalBooks ? (completed / totalBooks) * 100 : 0;
    
    // Obtenir le titre actuel
    const currentTitle = titles.titles
      .filter(t => t.level <= level)
      .slice(-1)[0]?.title || titles.titles[0].title;
    
    // Message d'encouragement aléatoire
    const encouragement = encouragements.messages[
      Math.floor(Math.random() * encouragements.messages.length)
    ];
    
    return { 
      completed, 
      reading, 
      totalBooks,
      totalPages, 
      level, 
      nextLevel,
      completionRate,
      currentTitle,
      encouragement
    };
  }, [books]);

  return (
    <div className="dashboard glass-card">
      <div className="dashboard-header">
        <div className="user-info">
          <h2>Bonjour, {userName}</h2>
          <div className="title-badge">{stats.currentTitle}</div>
          <p className="encouragement">{stats.encouragement}</p>
        </div>
        <div className="level-info">
          <div className="level-number">Niveau {stats.level}</div>
          <p className="next-level">Plus que {stats.nextLevel} pages pour le niveau {stats.level + 1}</p>
          <div className="xp-progress">
            <CircularProgressbar
              value={((100 - stats.nextLevel) / 100) * 100}
              text={`${stats.level}`}
              styles={buildStyles({
                pathColor: 'var(--color-primary)',
                textColor: 'var(--color-text)',
                trailColor: 'rgba(255, 255, 255, 0.1)',
              })}
            />
          </div>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card reading-now">
          <div className="stat-icon">📖</div>
          <div className="stat-content">
            <h3>En lecture</h3>
            <div className="stat-value">{stats.reading}</div>
            <div className="stat-books">
              {books
                .filter(b => b.status === 'reading')
                .slice(0, 2)
                .map(book => (
                  <div key={book.id} className="mini-book">
                    <div className="mini-progress">
                      <div 
                        className="mini-progress-fill"
                        style={{ width: `${(book.progress / book.totalPages) * 100}%` }}
                      />
                    </div>
                    <span>{book.title}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className="stat-card completion">
          <div className="stat-icon">🎯</div>
          <div className="stat-content">
            <h3>Taux de complétion</h3>
            <div className="completion-chart">
              <CircularProgressbar
                value={stats.completionRate}
                text={`${Math.round(stats.completionRate)}%`}
                styles={buildStyles({
                  pathColor: 'var(--color-accent)',
                  textColor: 'var(--color-text)',
                  trailColor: 'rgba(255, 255, 255, 0.1)',
                })}
              />
            </div>
          </div>
        </div>

        <div className="stat-card pages">
          <div className="stat-icon">📚</div>
          <div className="stat-content">
            <h3>Pages lues</h3>
            <div className="stat-value">{stats.totalPages}</div>
            <div className="pages-bar">
              <div className="pages-segments">
                {books.map(book => (
                  <div
                    key={book.id}
                    className="page-segment"
                    style={{
                      width: `${(book.progress / stats.totalPages) * 100}%`,
                      backgroundColor: book.status === 'completed' ? 'var(--color-primary)' : 'var(--color-accent)'
                    }}
                    title={`${book.title}: ${book.progress} pages`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 