import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "./CalendarSelector.scss";

export default function CalendarSelector({startDate, endDate, onDateChange}){
    const [dateRange, setDateRange] = useState([startDate, endDate]);

    useEffect(() => {
        setDateRange([startDate, endDate]);
    }, [startDate, endDate]);

    const handleDateChange = (dates) => {
        setDateRange(dates);
        if (onDateChange) {
            onDateChange(dates);
        }
    };

    return (
        <div className="calendar-selector__container">
            <Calendar
                onChange={handleDateChange}
                value={dateRange}
                selectRange={true}
                className="calendar-selector__calendar"
            />
            
            <div className="calendar-selector__date-range">
                <span className="calendar-selector__label">Start:</span>
                <span className="calendar-selector__date">{dateRange[0].toDateString()}</span>
                <span className="calendar-selector__separator">|</span>
                <span className="calendar-selector__label">End:</span>
                <span className="calendar-selector__date">{dateRange[1].toDateString()}</span>
            </div>
        </div>
    );
}
