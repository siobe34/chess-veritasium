import { useState, useEffect } from 'react';

type timerProps = {
    time: number
};

function Timer ({time}: timerProps) {
    const currentTime: number = Date.now();
    
    const [countdown, setCountdown] = useState<number>(currentTime - Date.now());
    
    const targetTime: number = countdown + time;

    // useEffect(() => {
    //     console.log('running')
    //     const interval = setInterval(() => {
    //         setCountdown(currentTime - Date.now());
    //     }, 1000);

    //     return () => clearInterval(interval);
    // }, [currentTime]);

    return (
        <>
        <span className='text-6xl'>
            { time }
        </span>
        <span>
            { countdown }
        </span>
        </>
    );
};

export default Timer;