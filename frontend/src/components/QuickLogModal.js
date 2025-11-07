import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import './QuickLogModal.css';

const QuickLogModal = ({ isOpen, onClose, onSave, showToast }) => {
  const [exercise, setExercise] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!exercise.trim()) {
      showToast('Please enter an exercise', 'warning');
      return;
    }

    setLoading(true);
    try {
      const today = new Date();
      const dateString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
      
      await onSave(dateString, exercise);
      setExercise('');
      showToast('Workout logged successfully! 💪', 'success');
      onClose();
    } catch (err) {
      showToast('Failed to log workout. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return createPortal(
    <div className="quick-log-overlay" onClick={onClose}>
      <div className="quick-log-modal" onClick={(e) => e.stopPropagation()}>
        <button className="quick-log-close" onClick={onClose}>×</button>
        <h2>Quick Log Workout</h2>
        <p className="quick-log-subtitle">Log your workout in seconds</p>
        <form onSubmit={handleSubmit}>
          <div className="quick-log-input-group">
            <label>What did you do?</label>
            <input
              type="text"
              placeholder="e.g., Bench Press - 5 sets x 8 reps"
              value={exercise}
              onChange={(e) => setExercise(e.target.value)}
              autoFocus
              disabled={loading}
            />
          </div>
          <div className="quick-log-suggestions">
            <span className="quick-log-suggestions-label">Quick add:</span>
            {['Cardio - 30 min', 'Push-ups - 3 sets', 'Squats - 4 sets', 'Running - 5km'].map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                className="quick-log-suggestion-btn"
                onClick={() => setExercise(suggestion)}
                disabled={loading}
              >
                {suggestion}
              </button>
            ))}
          </div>
          <div className="quick-log-actions">
            <button type="button" className="quick-log-cancel" onClick={onClose} disabled={loading}>
              Cancel
            </button>
            <button type="submit" className="quick-log-save" disabled={loading}>
              {loading ? 'Saving...' : 'Log Workout'}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default QuickLogModal;


