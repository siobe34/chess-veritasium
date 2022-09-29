import { createContext } from "react";

import { ICountdown } from "../types/ICountdown";

const CountdownContext = createContext<ICountdown>({ countdown: null, setCountdown: null });

export default CountdownContext;
