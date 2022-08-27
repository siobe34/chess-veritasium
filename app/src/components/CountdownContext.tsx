import React, { createContext } from 'react';

export type CountdownType = {
    countdown: number | null,
    setCountdown: React.Dispatch<React.SetStateAction<number| null>> | null
};

const CountdownContext = createContext<CountdownType>({ countdown: null, setCountdown: null });

export default CountdownContext;