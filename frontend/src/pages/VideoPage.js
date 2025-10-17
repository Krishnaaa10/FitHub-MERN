import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../VideoPage.css';

// --- FINAL, TRIPLE-CHECKED & WORKING YOUTUBE LINKS ---
const shreeExercises = [
    { id: 1, name: 'Bicep Curl', thumb: '/images/ex-bicep.jpg', videoId: 'kwG2Z2_vX_c' },
    { id: 2, name: 'Barbell Squats', thumb: '/images/ex-squat.jpg', videoId: 'ultWZbUMPL8' },
    { id: 3, name: 'Bench Press', thumb: '/images/ex-bench.jpeg', videoId: 'rxD321l2svE' },
    { id: 4, name: 'Cable Cross', thumb: '/images/ex-cable.jpg', videoId: 'Iwe6AmxVf7o' },
    { id: 5, name: 'Chest Fly', thumb: '/images/ex-fly.jpg', videoId: 'Z57LliR2O4I' },
    { id: 6, name: 'Seated Row', thumb: '/images/ex-row.jpg', videoId: 'GZbfZ033f74' },
    { id: 7, name: 'Pull-ups', thumb: '/images/ex-pullup.jpg', videoId: 'eGo4IYlbE5g' },
    { id: 8, name: 'Abs', thumb: '/images/ex-abs.jpg', videoId: '5ER5Of4MOPI' },
    { id: 9, name: 'Push-ups', thumb: '/images/ex-pushup.jpg', videoId: 'P7GqF_V1M7g' },
];

const VideoPage = () => {
    const [selectedVideo, setSelectedVideo] = useState(null);

    return (
        <div className="exercise-page">
            <div className="exercise-header">
                <h1>Exercise Library</h1>
                <Link to="/home" className="back-to-home-btn">← Back to Home</Link>
            </div>
            <div className="exercise-grid">
                {shreeExercises.map((exercise) => (
                    <div key={exercise.id} className="video-card" onClick={() => setSelectedVideo(exercise)}>
                        <div className="thumbnail-container">
                            <img src={exercise.thumb} alt={exercise.name} />
                            <div className="play-icon">▶</div>
                        </div>
                        <div className="video-title">{exercise.name}</div>
                    </div>
                ))}
            </div>

            {selectedVideo && (
                <div className="video-modal-overlay" onClick={() => setSelectedVideo(null)}>
                    <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-modal-btn" onClick={() => setSelectedVideo(null)}>×</button>
                        <iframe
                            src={`https://www.youtube.com/embed/${selectedVideo.videoId}?autoplay=1`}
                            title={selectedVideo.name}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VideoPage;