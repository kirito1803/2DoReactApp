// Set up
import React, {useState, useEffect} from "react"

export default function CounterComponent(props) {
    // declare state
    const [secondsLeft, setSecondsLeft] = useState((new Date(props.deadline).getTime()) - (new Date().getTime())) // time left in second
    const [timeLeft, setTimeLeft] = useState(null);
    const [type, setType] = useState(false) // out is on

    // calculate and set the second left
    const CalculateAndSetTime = (secondsLeft)=>{
        // Calculate
        let sec = Math.floor(Math.abs(secondsLeft / 1000))
        let min = Math.floor(sec / 60) 
        let hr = Math.floor(min / 60) 
        let day = Math.floor(hr / 24) 
        let year = Math.floor(day / 365.24)
        let month = Math.floor((day - year*365.24) / 30.4367)
        let week = Math.floor((day - (year*365.24 + month*30.4367))/ 7)
        day = Math.floor(day - (year*365.24 + month*30.4367 + week*7))
        hr = hr % 24
        min = min % 60
        sec = sec % 60
        // Set
        setTimeLeft({
            years: year,
            months: month,
            weeks: week,
            days: day,
            hours: hr,
            minutes: min,
            seconds: sec
        });
    }

    // keep track on every second
    useEffect(() => {
        const intervalId = setInterval(() => {
            if(secondsLeft > 1000 || secondsLeft < -1000) { // the approximately +- 2000ms
                CalculateAndSetTime(secondsLeft) // update the new time
            }
            else { // at the moment time is approaching 0
                props.TodoPage_updateTaskAttribute(props.id, "timeOut", true)
            }
            setSecondsLeft(prev=>prev-1000) // set new time
        }, 1000);
        // keep track and change type of counter (similar to task type)
        setType( !((new Date(props.deadline).getTime()) > (new Date().getTime())) )
        // clear when component unmounted
        return () => clearInterval(intervalId);
    }, [secondsLeft, props.deadline]);

    return (<React.Fragment>
        {timeLeft &&
        <div className="TodoTime-timeCount">
            <p className="TodoTime-timeCount__announcement">
                {!(type)?'Thời gian còn lại:':'Đã quá hạn:'}
            </p>
            {(timeLeft.years>0||timeLeft.months>0||timeLeft.weeks>0||timeLeft.days>7) ? (<div className="TodoTime-timeCount__timeLeft">
                {timeLeft.years>0?`${timeLeft.years} năm`:''} {timeLeft.months>0?`${timeLeft.months} tháng`:''}
                {(timeLeft.years>0||timeLeft.months>0)? <br/>:''}
                {timeLeft.weeks>0?`${timeLeft.weeks} tuần`:''} {timeLeft.days>0?`${timeLeft.days} ngày`:''}
            </div>)
            : (<div className="TodoTime-timeCount__timeLeft">
                {timeLeft.days>0?`${timeLeft.days} ngày`:''} {timeLeft.hours>0?`${timeLeft.hours}h:`:''}{timeLeft.minutes>0?`${timeLeft.minutes}'`:''}{timeLeft.seconds>0?`${timeLeft.seconds}s`:''}
            </div>)}
        </div> 
        }
    </React.Fragment>)
}