export interface ICountdown {
    countdown: number | null;
    setCountdown: React.Dispatch<React.SetStateAction<number | null>> | null;
}
