import { useState } from "react";
import Calendar from "react-calendar";
import "./CalendarSelector.scss";

export default function CalendarSelector({onDateChange}){
    // const [date, setDate] = useState(new Date());

    // const handleDateChange = (newDate) => {
    //     setDate(newDate);
    //     onDateChange(newDate);
    // }

    // return(
    //     <>
    //         <Calendar onChange={handleDateChange} value={date} selectRange={true}/>
    //     </>
    // )
    // return (
    //     <div className='react-calendar'>
    //         <div className='react-calendar__navigation button'>
    //             <Calendar
    //                 onChange={setDate}
    //                 value={date}
    //                 selectRange={true}
    //             />
    //         </div>
    //         {date.length > 0 ? (
    //             <p className='text-center'>
    //                 <span className='bold'>Start:</span>{' '}
    //                 {date[0].toDateString()}
    //                 &nbsp;|&nbsp;
    //                 <span className='bold'>End:</span> {date[1].toDateString()}
    //             </p>
    //         ) : (
    //             <p className='text-center'>
    //                 <span className='bold'>Default selected date:</span>{' '}
    //                 {date.toDateString()}
    //             </p>
    //         )}
    //     </div>
    // );


    const [dateRange, setDateRange] = useState([new Date(), new Date()]);

    const handleDateChange = (dates) => {
        setDateRange(dates);
        if (onDateChange) {
            onDateChange(dates);
        }
    };

    return (
        <div className="calendar-container">
            <Calendar
                onChange={handleDateChange}
                value={dateRange}
                selectRange={true}
            />
            <div className="date-range">
                <span>Start: {dateRange[0].toDateString()}</span> | <span>End: {dateRange[1].toDateString()}</span>
            </div>
        </div>
    );
}
