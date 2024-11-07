import { useState } from 'react';
import { achievements } from '../data/achievements';
import './Achievements.css';
import { UserStats } from '../types/Achievement';
import { Achievement } from '../types/Achievement';

interface AchievementsProps {
  unlockedAchievements: Set<string>;
  userStats: UserStats;
}

export default function Achievements({ unlockedAchievements, userStats }: AchievementsProps) {
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);

  const totalPoints = Array.from(unlockedAchievements).reduce((total, id) => {
    const achievement = achievements.find(a => a.id === id);
    return total + (achievement?.points || 0);
  }, 0);

  return (
    <div className="achievements-container glass-card">
      <div className="achievements-header">
        <h2>Achievements</h2>
        <div className="total-points">
          <span className="points-icon">⭐</span>
          {totalPoints} points
        </div>
      </div>

      <div className="achievements-grid">
        {achievements.map(achievement => {
          const isUnlocked = unlockedAchievements.has(achievement.id);
          const isAvailable = achievement.condition(userStats);

          return (
            <div
              key={achievement.id}
              className={`achievement-card ${isUnlocked ? 'unlocked' : ''} ${isAvailable ? 'available' : ''}`}
              onClick={() => setSelectedAchievement(achievement)}
            >
              <div className="achievement-icon">
                {achievement.icon}
                {isUnlocked && <div className="check-mark">✓</div>}
              </div>
              <div className="achievement-info">
                <h3>{achievement.title}</h3>
                <span className={`rarity-badge ${achievement.rarity}`}>
                  {achievement.rarity}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {selectedAchievement && (
        <div className="achievement-modal" onClick={() => setSelectedAchievement(null)}>
          <div className="achievement-details glass-card" onClick={e => e.stopPropagation()}>
            <div className="achievement-header">
              <div className="achievement-icon large">
                {selectedAchievement.icon}
              </div>
              <div>
                <h2>{selectedAchievement.title}</h2>
                <span className={`rarity-badge ${selectedAchievement.rarity}`}>
                  {selectedAchievement.rarity}
                </span>
              </div>
            </div>
            <p>{selectedAchievement.description}</p>
            <div className="achievement-points">
              <span className="points-icon">⭐</span>
              {selectedAchievement.points} points
            </div>
            {unlockedAchievements.has(selectedAchievement.id) && (
              <div className="unlock-date">
                Débloqué le {new Date(selectedAchievement.unlockedAt!).toLocaleDateString()}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 