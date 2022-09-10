// * For Test Route
import { Request, Response } from 'express';

// * Import 3rd party middleware
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

// * Import config for db connection
import config from './config/config';

// * Intialize application
const app = express();

// * Initialize 3rd party middleware for http headers, CORS, and JSON
app.use(helmet());
app.use(cors());
app.use(express.json());

// * Test Routes
app.get('/', (req: Request, res: Response) => {
    async function getPlayers() {
        const opts = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        };
        const players = await fetch('https://lichess.org/player/top/10/rapid', opts);
        const json = await players.json();
        console.log(json);
    };
    getPlayers();
    res.send({fen: '8/5k2/3p4/1p1Pp2p/pP2Pp1P/P4P1K/8/8 b - - 99 50'});
});

// * Start application
app.listen(config.port, async () => {
    console.log(`[INFO]: Server listening on port ${config.port}`);
});