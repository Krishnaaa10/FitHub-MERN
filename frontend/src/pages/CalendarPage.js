import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import '../CalendarPage.css';

const CalendarPage = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [newLog, setNewLog] = useState('');
    const [workoutLogs, setWorkoutLogs] = useState({});
    const [loading, setLoading] = useState(true);

    // Load workout logs from backend on component mount
    useEffect(() => {
        const fetchWorkoutLogs = async () => {
            try {
                const res = await api.get('/workouts');
                setWorkoutLogs(res.data);
            } catch (err) {
                console.error('Error fetching workout logs:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchWorkoutLogs();
    }, []);

    // Function to handle adding a new log
    const handleAddLog = async (e) => {
        e.preventDefault();
        if (!newLog.trim() || !selectedDate) return;

        const dateString = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;
        
        const existingLogs = workoutLogs[dateString] || [];
        const updatedLogs = [...existingLogs, newLog];

        // Optimistically update UI
        setWorkoutLogs({
            ...workoutLogs,
            [dateString]: updatedLogs
        });
        
        setNewLog('');

        // Save to backend
        try {
            await api.post('/workouts', {
                date: dateString,
                logs: updatedLogs
            });
        } catch (err) {
            console.error('Error saving workout log:', err);
            // Revert on error
            setWorkoutLogs({
                ...workoutLogs,
                [dateString]: existingLogs
            });
            alert('Failed to save workout log. Please try again.');
        }
    };

    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const generateCalendarDays = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        let calendarDays = [];

        for (let i = 0; i < firstDayOfMonth; i++) {
            calendarDays.push({ key: `empty-${i}`, day: null });
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day);
            const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            calendarDays.push({
                key: dateString, day, date,
                isToday: date.toDateString() === new Date().toDateString(),
                isSelected: selectedDate && date.toDateString() === selectedDate.toDateString(),
                hasLog: !!workoutLogs[dateString],
            });
        }
        return calendarDays;
    };

    const handleDateClick = (day) => {
        if (day.date) {
            setSelectedDate(day.date);
        }
    };

    const handleMonthChange = (direction) => {
        setCurrentDate(prev => {
            const newDate = new Date(prev);
            newDate.setMonth(prev.getMonth() + direction);
            return newDate;
        });
    };

    const selectedDateString = selectedDate ? `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}` : null;
    const logsForSelectedDate = selectedDateString ? workoutLogs[selectedDateString] : null;

    if (loading) {
        return <div className="calendar-page"><div style={{ padding: '20px', textAlign: 'center' }}>Loading...</div></div>;
    }

    return (
        <div className="calendar-page">
            <div className="calendar-container">
                <div className="calendar-header">
                    <button onClick={() => handleMonthChange(-1)}>‹</button>
                    <h2>{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
                    <button onClick={() => handleMonthChange(1)}>›</button>
                </div>
                <div className="calendar-grid">
                    {daysOfWeek.map(day => <div key={day} className="day-name">{day}</div>)}
                    {generateCalendarDays().map(day => (
                        <div
                            key={day.key}
                            className={`day-cell ${!day.day ? 'not-current-month' : ''} ${day.isToday ? 'today' : ''} ${day.isSelected ? 'selected' : ''} ${day.hasLog ? 'has-log' : ''}`}
                            onClick={() => handleDateClick(day)}
                        >
                            {day.day}
                        </div>
                    ))}
                </div>
            </div>
            <div className="log-details-container">
                <h3>Workout Log for {selectedDate.toLocaleDateString()}</h3>
                {logsForSelectedDate ? (
                    <ul className="log-list">
                        {logsForSelectedDate.map((log, index) => <li key={index} className="log-item">{log}</li>)}
                    </ul>
                ) : (
                    <p className="no-log-message">No workout logged for this day.</p>
                )}

                {/* Form to add workout logs */}
                <form className="add-log-form" onSubmit={handleAddLog}>
                    <input
                        type="text"
                        className="log-input"
                        placeholder="e.g., Bench Press - 5 sets"
                        value={newLog}
                        onChange={(e) => setNewLog(e.target.value)}
                    />
                    <button type="submit" className="add-log-btn">Add Log</button>
                </form>
            </div>
        </div>
    );
};

export default CalendarPage;