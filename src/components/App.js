import React, { useState } from 'react';
import '../styles/App.css';

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function App() {
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const [editYear, setEditYear] = useState(false);

  const handlePrevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(prev => prev - 1);
    } else {
      setMonth(prev => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(prev => prev + 1);
    } else {
      setMonth(prev => prev + 1);
    }
  };

  const handlePrevYear = () => {
    setYear(prev => prev - 1);
  };

  const handleNextYear = () => {
    setYear(prev => prev + 1);
  };

  const handleYearDoubleClick = () => {
    setEditYear(true);
  };

  const handleYearChange = (e) => {
    setYear(Number(e.target.value));
  };

  const handleYearBlur = () => {
    setEditYear(false);
  };

  const getDaysInMonth = (year, month) => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];
    const startDay = firstDay.getDay();

    for (let i = 0; i < startDay; i++) {
      days.push(null);
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(i);
    }

    return days;
  };

  const days = getDaysInMonth(year, month);

  return (
    <div>
      <h1 id="heading">Calendar</h1>

      <div>
        <label htmlFor="month">Month: </label>
        <select
          id="month"
          value={month}
          onChange={(e) => setMonth(Number(e.target.value))}
        >
          {months.map((m, i) => (
            <option key={i} value={i}>{m}</option>
          ))}
        </select>

        {editYear ? (
          <input
            id="year-input"
            type="number"
            value={year}
            onChange={handleYearChange}
            onBlur={handleYearBlur}
          />
        ) : (
          <span
            id="year"
            onDoubleClick={handleYearDoubleClick}
            style={{ marginLeft: '10px', cursor: 'pointer' }}
          >
            {year}
          </span>
        )}
      </div>

      <div style={{ marginTop: '10px' }}>
        <button id="prev-year" onClick={handlePrevYear}>Previous Year</button>
        <button id="prev-month" onClick={handlePrevMonth}>Previous Month</button>
        <button id="next-month" onClick={handleNextMonth}>Next Month</button>
        <button id="next-year" onClick={handleNextYear}>Next Year</button>
      </div>

      <table id="calendar" border="1" style={{ marginTop: '20px', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {daysOfWeek.map((day, idx) => (
              <th key={idx}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: Math.ceil(days.length / 7) }).map((_, rowIdx) => (
            <tr key={rowIdx}>
              {days.slice(rowIdx * 7, rowIdx * 7 + 7).map((day, cellIdx) => (
                <td key={cellIdx}>{day || ''}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
