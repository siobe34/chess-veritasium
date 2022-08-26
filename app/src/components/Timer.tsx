import { useState, useEffect } from 'react';

type timerProps = {
    time: number;
    clearBoard: any;
};

function Timer ({time, clearBoard}: timerProps) {
    const [seconds, setSeconds] = useState<number>(time);

    useEffect(() => {
        const interval = setInterval(() => {
            if (seconds === 0) {
                clearInterval(interval);
                return;
            };

            if (seconds === 1) {
                clearBoard();
            };

            setSeconds((prevState) => prevState - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [seconds]);


    return (
        <>
        <span className='text-6xl font-bold text-red-700'>
            { seconds }
        </span>
        </>
    );
};

export default Timer;