import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import QuickLogModal from '../components/QuickLogModal';
import { getUser } from '../utils/auth';
import api from '../utils/api';
import { useToast, ToastContainer } from '../components/Toast';
import '../HomePage.css';

const HomePage = () => {
  const user = getUser();
  const navigate = useNavigate();
  const { toasts, showToast, removeToast } = useToast();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [showQuickLog, setShowQuickLog] = useState(false);
  const [workoutStats, setWorkoutStats] = useState({
    totalWorkouts: 0,
    daysActive: 0,
    currentStreak: 0,
    thisWeekWorkouts: 0,
  });
  const [recentWorkouts, setRecentWorkouts] = useState([]);
  const [achievements, setAchievements] = useState({
    firstWorkout: { unlocked: false, progress: 0 },
    weekWarrior: { unlocked: false, progress: 0, target: 7 },
    consistencyKing: { unlocked: false, progress: 0, target: 30 },
    videoMaster: { unlocked: false, progress: 0, target: 50 },
  });
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const homeRef = useRef(null);
  const scrollIndicatorRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);
    
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    fetchWorkoutData();

    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
      const progressValue = Math.min(progress, 100);
      setScrollProgress(progressValue);
      
      if (scrollIndicatorRef.current) {
        scrollIndicatorRef.current.style.setProperty('--scroll-progress', `${progressValue}%`);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      clearInterval(timeInterval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const fetchWorkoutData = async () => {
    try {
      setLoading(true);
      const res = await api.get('/workouts');
      const workoutLogs = res.data;
      
      const stats = calculateStats(workoutLogs);
      setWorkoutStats(stats);
      
      const achievementData = calculateAchievements(workoutLogs, stats);
      setAchievements(achievementData);

      // Get recent workouts (last 5)
      const recent = getRecentWorkouts(workoutLogs);
      setRecentWorkouts(recent);
    } catch (err) {
      console.error('Error fetching workout data:', err);
      showToast('Unable to load workout data', 'warning');
    } finally {
      setLoading(false);
    }
  };

  const getRecentWorkouts = (workoutLogs) => {
    const dates = Object.keys(workoutLogs).sort((a, b) => new Date(b) - new Date(a));
    return dates.slice(0, 5).map(date => ({
      date,
      logs: workoutLogs[date],
      displayDate: formatDate(date),
    }));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  const handleQuickLogSave = async (date, exercise) => {
    try {
      const res = await api.get('/workouts');
      const existingLogs = res.data[date] || [];
      const updatedLogs = [...existingLogs, exercise];

      await api.post('/workouts', {
        date,
        logs: updatedLogs,
      });

      // Refresh data
      await fetchWorkoutData();
    } catch (err) {
      console.error('Error saving workout:', err);
      throw err;
    }
  };

  const calculateStats = (workoutLogs) => {
    const dates = Object.keys(workoutLogs);
    const totalWorkouts = dates.reduce((sum, date) => sum + (workoutLogs[date]?.length || 0), 0);
    const daysActive = dates.length;
    
    const sortedDates = dates.sort((a, b) => new Date(b) - new Date(a));
    let currentStreak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    for (let i = 0; i < sortedDates.length; i++) {
      const logDate = new Date(sortedDates[i]);
      logDate.setHours(0, 0, 0, 0);
      const daysDiff = Math.floor((today - logDate) / (1000 * 60 * 60 * 24));
      
      if (daysDiff === currentStreak) {
        currentStreak++;
      } else {
        break;
      }
    }
    
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);
    const thisWeekWorkouts = dates.filter(date => {
      const logDate = new Date(date);
      return logDate >= weekAgo;
    }).length;
    
    return {
      totalWorkouts,
      daysActive,
      currentStreak,
      thisWeekWorkouts,
    };
  };

  const calculateAchievements = (workoutLogs, stats) => {
    return {
      firstWorkout: {
        unlocked: stats.totalWorkouts > 0,
        progress: Math.min(stats.totalWorkouts, 1),
      },
      weekWarrior: {
        unlocked: stats.thisWeekWorkouts >= 7,
        progress: stats.thisWeekWorkouts,
        target: 7,
      },
      consistencyKing: {
        unlocked: stats.currentStreak >= 30,
        progress: stats.currentStreak,
        target: 30,
      },
      videoMaster: {
        unlocked: false,
        progress: 0,
        target: 50,
      },
    };
  };

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  // Available exercises from exercise library
  const availableExercises = [
    { id: 1, name: 'Bicep Curl', icon: '💪', duration: '15 min', type: 'Arms', videoId: 'kwG2Z2_vX_c' },
    { id: 2, name: 'Barbell Squats', icon: '🦵', duration: '20 min', type: 'Legs', videoId: 'ultWZbUMPL8' },
    { id: 3, name: 'Bench Press', icon: '💪', duration: '15 min', type: 'Chest', videoId: 'rxD321l2svE' },
    { id: 4, name: 'Cable Cross', icon: '💪', duration: '15 min', type: 'Chest', videoId: 'Iwe6AmxVf7o' },
    { id: 5, name: 'Chest Fly', icon: '💪', duration: '15 min', type: 'Chest', videoId: 'Z57LliR2O4I' },
    { id: 6, name: 'Seated Row', icon: '💪', duration: '15 min', type: 'Back', videoId: 'GZbfZ033f74' },
    { id: 7, name: 'Pull-ups', icon: '💪', duration: '15 min', type: 'Back', videoId: 'eGo4IYlbE5g' },
    { id: 8, name: 'Abs', icon: '🔥', duration: '10 min', type: 'Core', videoId: '5ER5Of4MOPI' },
    { id: 9, name: 'Push-ups', icon: '💪', duration: '15 min', type: 'Chest', videoId: 'P7GqF_V1M7g' },
  ];

  const getTodaysWorkoutSuggestion = () => {
    const dayOfWeek = currentTime.getDay();
    // Cycle through the 9 exercises based on day of week
    const exerciseIndex = dayOfWeek % availableExercises.length;
    return availableExercises[exerciseIndex];
  };

  const handleQuickStart = (exercise) => {
    // Find the exercise by name or use the exercise object directly
    const selectedExercise = typeof exercise === 'string' 
      ? availableExercises.find(ex => ex.name === exercise) || availableExercises[0]
      : exercise;
    
    showToast(`Starting ${selectedExercise.name}...`, 'info');
    setTimeout(() => {
      // Navigate to video page with the specific video ID
      navigate(`/video?videoId=${selectedExercise.videoId}&exercise=${encodeURIComponent(selectedExercise.name)}`);
    }, 500);
  };

  const handleProgramStart = (programName) => {
    showToast('Stay tuned... This action would be available soon with us', 'info');
  };

  const features = [
    {
      id: 1,
      title: 'Fitness Store',
      description: 'Shop premium supplements, equipment & gear',
      icon: '🛒',
      link: '/ekart',
      color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      adText: '🔥 Premium Quality • ⚡ Fast Delivery • 💰 Best Prices',
      promoText: 'Transform your fitness with our curated selection of supplements and equipment',
    },
  ];

  const quotes = [
    "HUSTLE FOR THE MUSCLE",
    "STRENGTH COMES FROM WITHIN",
    "YOUR BODY CAN DO IT, IT'S YOUR MIND YOU NEED TO CONVINCE",
    "TRAIN LIKE A BEAST, LOOK LIKE A BEAUTY",
  ];

  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setCurrentQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(quoteInterval);
  }, []);

  const todaysSuggestion = getTodaysWorkoutSuggestion();

  return (
    <div className={`home-main ${isVisible ? 'visible' : ''}`} ref={homeRef}>
      <div 
        className="scroll-indicator" 
        ref={scrollIndicatorRef}
      ></div>
      <Navbar />
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      <QuickLogModal 
        isOpen={showQuickLog} 
        onClose={() => setShowQuickLog(false)}
        onSave={handleQuickLogSave}
        showToast={showToast}
      />
      
      {/* Floating Action Button */}
      <button 
        className="fab-button"
        onClick={() => setShowQuickLog(true)}
        title="Quick Log Workout"
      >
        <span className="fab-icon">+</span>
      </button>
      
      <div className="home-container">
        {/* Hero Section */}
        <section className="home-hero">
          <div className="hero-content">
            <div className="greeting-section">
              <h1 className="greeting-text">
                {getGreeting()}, <span className="user-name">{user?.name || 'Champion'}</span>! 👋
              </h1>
              <p className="hero-subtitle">Ready to crush your fitness goals today?</p>
            </div>
            <div className="time-display">
              <div className="time-icon">🕐</div>
              <div className="time-text">
                {currentTime.toLocaleTimeString('en-US', { 
                  hour: '2-digit', 
                  minute: '2-digit',
                  hour12: true 
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Today's Workout Suggestion */}
        <section className="todays-workout-section">
          <div className="todays-workout-card">
            <div className="todays-workout-header">
              <h3>Today's Workout</h3>
              <span className="todays-workout-badge">{todaysSuggestion.type}</span>
            </div>
            <div className="todays-workout-content">
              <div className="todays-workout-icon">{todaysSuggestion.icon}</div>
              <div className="todays-workout-info">
                <h4>{todaysSuggestion.name}</h4>
                <p>{todaysSuggestion.duration}</p>
              </div>
            </div>
            <button 
              className="todays-workout-button"
              onClick={() => handleQuickStart(todaysSuggestion)}
            >
              Start Now →
            </button>
          </div>
        </section>

        {/* Real Stats Section */}
        {!loading && workoutStats.totalWorkouts > 0 && (
          <section className="real-stats-section">
            <h2 className="section-title">Your Progress</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">💪</div>
                <div className="stat-content">
                  <div className="stat-value">{workoutStats.totalWorkouts}</div>
                  <div className="stat-label">Total Workouts</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">🔥</div>
                <div className="stat-content">
                  <div className="stat-value">{workoutStats.currentStreak}</div>
                  <div className="stat-label">Day Streak</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">📊</div>
                <div className="stat-content">
                  <div className="stat-value">{workoutStats.daysActive}</div>
                  <div className="stat-label">Days Active</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">⭐</div>
                <div className="stat-content">
                  <div className="stat-value">{workoutStats.thisWeekWorkouts}</div>
                  <div className="stat-label">This Week</div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Recent Activity Feed */}
        {!loading && recentWorkouts.length > 0 && (
          <section className="recent-activity-section">
            <h2 className="section-title">Recent Activity</h2>
            <div className="activity-feed">
              {recentWorkouts.map((workout, index) => (
                <div key={index} className="activity-item">
                  <div className="activity-icon">💪</div>
                  <div className="activity-content">
                    <div className="activity-date">{workout.displayDate}</div>
                    <div className="activity-exercises">
                      {workout.logs.slice(0, 2).map((log, i) => (
                        <span key={i} className="activity-exercise">{log}</span>
                      ))}
                      {workout.logs.length > 2 && (
                        <span className="activity-more">+{workout.logs.length - 2} more</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Getting Started Section */}
        <section className="getting-started-section">
          <div className="getting-started-header">
            <h2 className="section-title">Start Your Journey</h2>
            <p className="section-subtitle">Your fitness transformation begins here</p>
          </div>
          <div className="getting-started-grid">
            <Link 
              to="/calender" 
              className="getting-started-card primary"
              onClick={() => showToast('Opening workout calendar...', 'info')}
            >
              <div className="gs-icon-wrapper">
                <span className="gs-icon">📅</span>
              </div>
              <h3>Plan Your First Workout</h3>
              <p>Schedule your training sessions and build consistency</p>
              <div className="gs-action">Get Started →</div>
            </Link>
            <Link 
              to="/video" 
              className="getting-started-card"
              onClick={() => showToast('Loading workout videos...', 'info')}
            >
              <div className="gs-icon-wrapper">
                <span className="gs-icon">🎥</span>
              </div>
              <h3>Explore Workout Videos</h3>
              <p>Learn from expert trainers and follow guided routines</p>
              <div className="gs-action">Watch Now →</div>
            </Link>
            <Link 
              to="/subscription" 
              className="getting-started-card"
              onClick={() => showToast('Viewing membership plans...', 'info')}
            >
              <div className="gs-icon-wrapper">
                <span className="gs-icon">💎</span>
              </div>
              <h3>Choose Your Plan</h3>
              <p>Select a membership that fits your fitness goals</p>
              <div className="gs-action">View Plans →</div>
            </Link>
          </div>
        </section>

        {/* Featured Programs Section */}
        <section className="programs-section">
          <h2 className="section-title">Featured Programs</h2>
          <div className="programs-grid">
            <div className="program-card">
              <div className="program-badge">🔥 Popular</div>
              <div className="program-icon">💪</div>
              <h3 className="program-title">Beginner's Strength</h3>
              <p className="program-description">Perfect for starting your strength training journey</p>
              <div className="program-details">
                <span className="program-detail">⏱️ 30 min</span>
                <span className="program-detail">📊 3x/week</span>
              </div>
              <button 
                className="program-button"
                onClick={() => handleProgramStart("Beginner's Strength")}
              >
                Start Program
              </button>
            </div>
            <div className="program-card">
              <div className="program-badge">⭐ Recommended</div>
              <div className="program-icon">🏃</div>
              <h3 className="program-title">Cardio Blast</h3>
              <p className="program-description">High-intensity cardio to boost your endurance</p>
              <div className="program-details">
                <span className="program-detail">⏱️ 25 min</span>
                <span className="program-detail">📊 4x/week</span>
              </div>
              <button 
                className="program-button"
                onClick={() => handleProgramStart("Cardio Blast")}
              >
                Start Program
              </button>
            </div>
            <div className="program-card">
              <div className="program-badge">✨ New</div>
              <div className="program-icon">🧘</div>
              <h3 className="program-title">Flexibility & Recovery</h3>
              <p className="program-description">Yoga and stretching for better mobility</p>
              <div className="program-details">
                <span className="program-detail">⏱️ 20 min</span>
                <span className="program-detail">📊 Daily</span>
              </div>
              <button 
                className="program-button"
                onClick={() => handleProgramStart("Flexibility & Recovery")}
              >
                Start Program
              </button>
            </div>
          </div>
        </section>

        {/* Achievements Section */}
        <section className="achievements-section">
          <h2 className="section-title">Unlock Achievements</h2>
          <p className="section-subtitle">Complete challenges and earn badges as you progress</p>
          <div className="achievements-grid">
            <div className={`achievement-card ${achievements.firstWorkout.unlocked ? 'unlocked' : 'locked'}`}>
              <div className="achievement-icon">🏆</div>
              <h3>First Workout</h3>
              <p>Complete your first workout session</p>
              <div className="achievement-progress">
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${Math.min((achievements.firstWorkout.progress / 1) * 100, 100)}%` }}
                  ></div>
                </div>
                <span className="progress-text">
                  {achievements.firstWorkout.unlocked ? '✓ Unlocked' : `${Math.min(achievements.firstWorkout.progress, 1)}/1`}
                </span>
              </div>
            </div>
            <div className={`achievement-card ${achievements.weekWarrior.unlocked ? 'unlocked' : 'locked'}`}>
              <div className="achievement-icon">🔥</div>
              <h3>Week Warrior</h3>
              <p>Complete 7 workouts in a week</p>
              <div className="achievement-progress">
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${Math.min((achievements.weekWarrior.progress / achievements.weekWarrior.target) * 100, 100)}%` }}
                  ></div>
                </div>
                <span className="progress-text">
                  {achievements.weekWarrior.unlocked ? '✓ Unlocked' : `${achievements.weekWarrior.progress}/${achievements.weekWarrior.target}`}
                </span>
              </div>
            </div>
            <div className={`achievement-card ${achievements.consistencyKing.unlocked ? 'unlocked' : 'locked'}`}>
              <div className="achievement-icon">💪</div>
              <h3>Consistency King</h3>
              <p>Workout for 30 consecutive days</p>
              <div className="achievement-progress">
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${Math.min((achievements.consistencyKing.progress / achievements.consistencyKing.target) * 100, 100)}%` }}
                  ></div>
                </div>
                <span className="progress-text">
                  {achievements.consistencyKing.unlocked ? '✓ Unlocked' : `${achievements.consistencyKing.progress}/${achievements.consistencyKing.target}`}
                </span>
              </div>
            </div>
            <div className={`achievement-card ${achievements.videoMaster.unlocked ? 'unlocked' : 'locked'}`}>
              <div className="achievement-icon">⭐</div>
              <h3>Video Master</h3>
              <p>Complete 50 workout videos</p>
              <div className="achievement-progress">
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${Math.min((achievements.videoMaster.progress / achievements.videoMaster.target) * 100, 100)}%` }}
                  ></div>
                </div>
                <span className="progress-text">
                  {achievements.videoMaster.unlocked ? '✓ Unlocked' : `${achievements.videoMaster.progress}/${achievements.videoMaster.target}`}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Fitness Store Section */}
        <section className="features-section">
          <h2 className="section-title">Quick Access</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <Link 
                key={feature.id} 
                to={feature.link} 
                className="feature-card store-card"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => showToast(`Opening ${feature.title}...`, 'info')}
              >
                <div className="feature-icon-wrapper" style={{ background: feature.color }}>
                  <span className="feature-icon">{feature.icon}</span>
                </div>
                <div className="feature-content">
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-description">{feature.description}</p>
                  {feature.adText && (
                    <div className="store-ad-text">{feature.adText}</div>
                  )}
                  {feature.promoText && (
                    <div className="store-promo-text">{feature.promoText}</div>
                  )}
                </div>
                <div className="feature-arrow">→</div>
              </Link>
            ))}
          </div>
        </section>

        {/* Motivational Quote Section */}
        <section className="quote-section">
          <div className="quote-container">
            <div className="quote-icon">💬</div>
            <h1 className="quote-text" key={currentQuoteIndex}>
              "{quotes[currentQuoteIndex]}"
            </h1>
            <div className="quote-dots">
              {quotes.map((_, index) => (
                <span
                  key={index}
                  className={`quote-dot ${index === currentQuoteIndex ? 'active' : ''}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Recent Activity / Quick Tips */}
        <section className="tips-section">
          <h2 className="section-title">Today's Tips</h2>
          <div className="tips-grid">
            <div className="tip-card">
              <div className="tip-icon">💧</div>
              <h3>Stay Hydrated</h3>
              <p>Drink at least 8 glasses of water today to optimize your performance.</p>
            </div>
            <div className="tip-card">
              <div className="tip-icon">🍎</div>
              <h3>Nutrition Matters</h3>
              <p>Fuel your body with balanced meals rich in protein and complex carbs.</p>
            </div>
            <div className="tip-card">
              <div className="tip-icon">😴</div>
              <h3>Rest & Recovery</h3>
              <p>Get 7-9 hours of quality sleep for optimal muscle recovery.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
