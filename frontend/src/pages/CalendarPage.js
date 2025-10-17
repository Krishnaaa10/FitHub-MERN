import React, { useState } from 'react';
import '../CalendarPage.css'; // Import the upgraded CSS

const CalendarPage = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    // State for the text in the new log input field
    const [newLog, setNewLog] = useState('');
    // We now need setWorkoutLogs to add new entries
    const [workoutLogs, setWorkoutLogs] = useState({
        '2025-10-05': ['Chest Press - 4 sets', 'Incline Dumbbell Fly - 3 sets'],
        '2025-10-08': ['Barbell Squats - 5 sets', 'Leg Press - 4 sets', 'Calf Raises - 4 sets'],
        '2025-10-12': ['5km Run - 30 minutes'],
        '2025-10-17': ['Deadlifts - 5 sets', 'Pull-ups - 4 sets'],
        '2025-11-02': ['Overhead Press - 4 sets', 'Lateral Raises - 3 sets'],
    });

    // --- Function to handle adding a new log ---
    const handleAddLog = (e) => {
        e.preventDefault(); // Prevent page refresh
        if (!newLog.trim() || !selectedDate) return; // Do nothing if input is empty

        const dateString = `${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}-${String(selectedDate.getDate()).padStart(2, '0')}`;
        
        // Get existing logs for the selected day, or an empty array if none exist
        const existingLogs = workoutLogs[dateString] || [];
        // Create the new list of logs
        const updatedLogs = [...existingLogs, newLog];

        // Update the main workoutLogs state
        setWorkoutLogs({
            ...workoutLogs,
            [dateString]: updatedLogs
        });
        
        setNewLog(''); // Clear the input field
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
            const dateString = `${year}-${month + 1}-${String(day).padStart(2, '0')}`;
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

    const selectedDateString = selectedDate ? `${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}-${String(selectedDate.getDate()).padStart(2, '0')}` : null;
    const logsForSelectedDate = selectedDateString ? workoutLogs[selectedDateString] : null;

    return (
        <div className="calendar-page">
            <div className="calendar-container">
                <div className="calendar-header">
                    <button onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))}>‹</button>
                    <h2>{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
                    <button onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))}>›</button>
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

                {/* --- NEW FORM TO ADD WORKOUT LOGS --- */}
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