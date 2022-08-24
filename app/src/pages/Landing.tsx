import { useState } from 'react';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationCrosshairs, faClock, faArrowsRotate} from '@fortawesome/free-solid-svg-icons';
import Chess from 'chess.js';
import { Chessboard } from 'react-chessboard';

import MainContent from '../components/MainContent';
// import PageSection from '../components/PageSection';

function Landing() {
    // const board = new Chess();
    const [game, setGame] = useState();
    const toggleNotation = () => {
        console.log('Testing...')
    };
    return (
        <MainContent>
            <h1 className='font-bold text-3xl mt-6'>Landing Page</h1>
            <div className='flex my-4 gap-4'>
            <button
                className='bg-transparent hover:bg-blue-500 text-blue-700 hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'
                onClick={() => toggleNotation()}
            >
                <FontAwesomeIcon className='mr-2' icon={faLocationCrosshairs} />
                Toggle Notation
            </button>
            <button
                className='bg-transparent hover:bg-blue-500 text-blue-700 hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'
                onClick={() => toggleNotation()}
            >
                <FontAwesomeIcon className='mr-2' icon={faArrowsRotate} />
                Flip Board
            </button>
            <button
                className='bg-transparent hover:bg-blue-500 text-blue-700 hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'
                onClick={() => toggleNotation()}
            >
                <FontAwesomeIcon className='mr-2' icon={faClock} />
                Set Timer
            </button>

            </div>
            <Chessboard position='8/5k2/3p4/1p1Pp2p/pP2Pp1P/P4P1K/8/8 b - - 99 50'/>
        </MainContent>
    );
}

export default Landing;