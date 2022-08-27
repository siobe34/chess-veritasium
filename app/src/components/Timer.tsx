import { useEffect, useContext } from 'react';

import CountdownContext from './CountdownContext';

function Timer () {
    const { countdown, setCountdown } = useContext(CountdownContext);
    if (!setCountdown) return null;

    useEffect(() => {
        const interval = setInterval(() => {
            if (countdown === 0) {
                clearInterval(interval);
                return;
            };
            
            setCountdown((prevState) => {
                if (prevState === null) return 5;
                if (prevState < 0) return 5;
                return prevState - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [countdown]);


    return (
        <>
        <span className='text-6xl font-bold text-red-700'>
            { countdown }
        </span>
        </>
    );
};

export default Timer;