import { useState, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationCrosshairs, faArrowsRotate, faEraser, faChessBoard, faCheck, faEyeLowVision} from '@fortawesome/free-solid-svg-icons';
import { Chess, Square, Piece, PieceType } from 'chess.js';
import { Chessboard } from 'react-chessboard';

import MainContent from '../components/MainContent';
import BoardEditor from '../components/BoardEditor';
import Notifications, { NotificationItem, NotificationProps } from '../components/Notification';
import Timer from '../components/Timer';
import PieceContext, { PieceContextType } from '../components/PieceContext';
import CountdownContext, { CountdownType } from '../components/CountdownContext';

function Practice() {
    const fens: string[] = [
        '8/5k2/3p4/1p1Pp2p/pP2Pp1P/P4P1K/8/8 b - - 99 50',
        'r6k/pp2r2p/4Rp1Q/3p4/8/1N1P2R1/PqP2bPP/7K b - - 0 24',
        '5rk1/1p3ppp/pq3b2/8/8/1P1Q1N2/P4PPP/3R2K1 w - - 2 27',
        'r2qr1k1/b1p2ppp/pp4n1/P1P1p3/4P1n1/B2P2Pb/3NBP1P/RN1QR1K1 b - - 1 16',
        'r4rk1/pp3ppp/2n1b3/q1pp2B1/8/P1Q2NP1/1PP1PP1P/2KR3R w - - 0 15',
        'r1bqk2r/pp1nbNp1/2p1p2p/8/2BP4/1PN3P1/P3QP1P/3R1RK1 b kq - 0 19',
        '5r1k/5rp1/p7/1b2B2p/1P1P1Pq1/2R1Q3/P3p1P1/2R3K1 w - - 0 41',
        '3R4/8/K7/pB2b3/1p6/1P2k3/3p4/8 w - - 4 58',
        '4r3/5pk1/1p3np1/3p3p/2qQ4/P4N1P/1P3RP1/7K w - - 6 34',
        'r2q1rk1/5ppp/1np5/p1b5/2p1B3/P7/1P3PPP/R1BQ1RK1 b - - 1 17',
        '2kr3r/pp3p2/4p2p/1N1p2p1/3Q4/1P1P4/2q2PPP/5RK1 b - - 1 20',
        '4r1k1/5ppp/r1p5/p1n1RP2/8/2P2N1P/2P3P1/3R2K1 b - - 0 21',
        '1qr2rk1/pb2bppp/8/8/2p1N3/P1Bn2P1/2Q2PBP/1R3RK1 b - - 3 23',
        'r6r/1pNk1ppp/2np4/b3p3/4P1b1/N1Q5/P4PPP/R3KB1R w KQ - 3 18',
        '5r1k/pp4pp/5p2/1BbQp1r1/6K1/7P/1PP3P1/3R3R w - - 2 26',
        '2r3k1/p1q2pp1/Q3p2p/b1Np4/2nP1P2/4P1P1/5K1P/2B1N3 b - - 3 33',
        '1rb2rk1/q5P1/4p2p/3p3p/3P1P2/2P5/2QK3P/3R2R1 b - - 0 29',
        'r3k2r/pb1p1ppp/1b4q1/1Q2P3/8/2NP1Pn1/PP4PP/R1B2R1K w kq - 1 17',
        'r4rk1/p3ppbp/Pp1q1np1/3PpbB1/2B5/2N5/1PPQ1PPP/3RR1K1 w - - 4 18',
        'k1r1b3/p1r1nppp/1p1qpn2/2Np4/1P1P4/PQRBPN2/5PPP/2R3K1 w - - 0 19',
        '8/4R1k1/p5pp/3B4/5q2/8/5P1P/6K1 b - - 5 40',
        'r3kb1r/pppqpn1p/5p2/3p1bpQ/2PP4/4P1B1/PP3PPP/RN2KB1R w KQkq - 1 11',
        'r7/2p2r1k/p2p1q1p/Pp1P4/1P2P3/2PQ4/6R1/R5K1 b - - 2 28',
        '8/8/kpq5/p4pQp/P7/7P/3r2P1/4R2K b - - 10 48',
        'r3brk1/5pp1/p1nqpn1p/P2pN3/2pP4/2P1PN2/5PPP/RB1QK2R b KQ - 4 16',
        'r3kb1r/ppq2ppp/4pn2/2Ppn3/1P4bP/2P2N2/P3BPP1/RNBQ1RK1 b kq - 2 10',
        '3r1rk1/1b1n1pp1/3p4/p4PPQ/4P3/3q1BN1/8/2R2RK1 b - - 1 28',
        'r3kbnr/ppp1qppp/2n5/3pP3/5B2/4PQ2/PPP2PPP/RN2KB1R w KQkq - 1 7',
        'r4rk1/pp3ppp/3p1q2/P1P1p3/2B5/2B2n2/2P2P1P/R2Q1RK1 w - - 0 16',
        '8/6p1/2B1bn2/6k1/3B4/6K1/4P3/8 b - - 4 44',
        'r6k/q1pb1p1p/1b3Pr1/p1ppP2Q/3P2p1/4B3/PP2NRPP/3R2K1 b - - 1 25',
        'r2r2k1/1p2qppp/2n1p3/5n2/p2P4/P2Q1N2/BP3PPP/2R1R1K1 w - - 4 20',
        '2nk4/8/2PBp1n1/1pK1P1p1/1P4P1/8/8/8 b - - 2 42',
        '1r5r/p3kp2/4p2p/4P3/3R1Pp1/6P1/P1P4P/4K2R w K - 1 25',
        '8/3pk3/R7/1R2Pp1p/2PPnKr1/8/8/8 w - - 4 43',
        '6k1/3bqr1p/2rpp1pR/p7/Pp1QP3/1B3P2/1PP3P1/2KR4 w - - 6 22'
    ];

    const [fen, setFen] = useState<string>(fens[0]);
    const [orientation, setOrientation] = useState<'w' | 'b'>('w');
    const [notation, setNotation] = useState<boolean>(true);
    const [draggablePieces, setDraggablePieces] = useState<boolean>(false);
    const [game, setGame] = useState(new Chess(fen));
    const [piece, setPiece] = useState<PieceContextType['piece']>(null);
    const [pieceColor, setPieceColor] = useState<'w' | 'b'>('w');
    const [countdown, setCountdown] = useState<CountdownType['countdown']>(5);
    const defaultNotfication: {message: string|null, type: NotificationProps['notificationType'], timeout: number} = {
        message: null,
        type: 'info',
        timeout: 0
    };
    const [notification, setNotification] = useState(defaultNotfication);

    const flipBoard = () => {
        setOrientation((prevState) => prevState === 'w' ? 'b' : 'w');
    };
    
    const toggleNotation = () => {
        setNotation((prevState) => !prevState);
    };
    
    const changeCountdown = () => {
        const inp: HTMLInputElement | null = document.querySelector('#countdown');
        if (inp) {
            setCountdown(() => Number(inp.value));
            return;
        };
        setCountdown(() => 5);
    };
    
    const startingPosition = () => {
        setGame(() => new Chess());
    };
    
    const clearBoard = () => {
        setGame(() => new Chess('8/8/8/8/8/8/8/8 w KQkq - 0 1'));
    };
    
    const restorePosition = () => {
        setGame(() => new Chess(fen));
        changeCountdown();
    };
    
    const placePiece = (piece: Piece, square: Square) => {
        game.put(piece, square);
    };

    const removePiece = (square: Square) => {
        game.remove(square);
    };
    
    const handlePieceSelection = (square: Square) => {
        if (piece ===  null) return;
        
        if (piece === 'select-tool') {
            setDraggablePieces(() => !draggablePieces);
            return;
        };

        setDraggablePieces(() => false);

        if (piece === 'delete-tool') {
            removePiece(square);
            setGame((prevState) => new Chess(prevState.fen()));
            return;
        };
        
        const pieceMapper: any = {
            King: 'k',
            Queen: 'q',
            Bishop: 'b',
            Knight: 'n',
            Rook: 'r',
            Pawn: 'p',
        };
        const shortPiece: PieceType = pieceMapper[piece];
        placePiece({type: shortPiece, color: pieceColor}, square);
        setGame((prevState) => new Chess(prevState.fen()));
    };

    const checkFen = () => {
        const answer = fen.split(' ')[0];
        const solution = game.fen().split(' ')[0];
        if (solution === answer) {
            setNotification(() => ({
                message: 'Nice, you got it right!',
                type: 'success',
                timeout: 2500
            }));
            
            const randomNumber: number = Math.floor(Math.random() * (fens.length + 1));
            const newFen: string = fens[randomNumber];
            
            setTimeout(() => {
                setGame(() => new Chess(newFen));
                setFen(() => newFen);
                changeCountdown();
            }, 1500);

            setTimeout(() => {
                setNotification(() => defaultNotfication);
            }, 2500);

            return;
        };
        
        setNotification(() => ({
            message: 'Not quite right, try again!!',
            type: 'error',
            timeout: 3000
        }));
        setTimeout(() => {
            setNotification(() => defaultNotfication);
        }, 3000);
    };

    useEffect(() => {
        if (countdown === 0) {
            clearBoard();
        };
    }, [countdown]);

    return (
        <CountdownContext.Provider value = {{countdown: countdown, setCountdown:setCountdown}}>
            <PieceContext.Provider value = {{piece: piece, setPiece: setPiece}}>
                <MainContent>
                    {notification.message && (
                        <Notifications>
                            <NotificationItem notificationType={notification.type} timeout={notification.timeout}>
                                {notification.message}
                            </NotificationItem>
                        </Notifications>
                    )}
                    <div className='flex items-center justify-center h-full gap-4'>
                        <div className='flex flex-col gap-4 self-center px-4'>
                            <button
                                className={`bg-blue-500 hover:bg-transparent text-white hover:text-blue-700 py-2 px-4 border border-blue-500 rounded ${notification.type === 'success' ? 'bg-green-500 hover:text-green-700 border-green-500' : null}`}
                                onClick={() => checkFen()}
                            >
                                <div className='flex items-center justify-between'>
                                    <FontAwesomeIcon className='pr-2' icon={faCheck} />
                                    Check Answer
                                </div>
                            </button>
                            <button
                                className='bg-transparent hover:bg-blue-500 text-blue-700 hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'
                                onClick={() => flipBoard()}
                            >
                                <div className='flex items-center justify-between'>
                                    <FontAwesomeIcon className='pr-2' icon={faArrowsRotate} />
                                    Flip Board
                                </div>
                            </button>
                            <button
                                className='bg-transparent hover:bg-blue-500 text-blue-700 hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'
                                onClick={() => toggleNotation()}
                            >
                                <div className='flex items-center justify-between'>
                                    <FontAwesomeIcon className='pr-2' icon={faLocationCrosshairs} />
                                    Toggle Notation
                                </div>
                            </button>
                            <button
                                className='bg-transparent hover:bg-blue-500 text-blue-700 hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'
                                onClick={() => clearBoard()}
                            >
                                <div className='flex items-center justify-between'>
                                    <FontAwesomeIcon className='pr-2' icon={faEraser} />
                                    Clear Board
                                </div>
                            </button>
                            <button
                                className='bg-transparent hover:bg-blue-500 text-blue-700 hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'
                                onClick={() => startingPosition()}
                            >
                                <div className='flex items-center justify-between'>
                                    <FontAwesomeIcon className='pr-2' icon={faChessBoard} />
                                    Starting Position
                                </div>
                            </button>
                            <button
                                className='bg-blue-500 hover:bg-transparent text-white hover:text-blue-700 py-2 px-4 border border-blue-500 rounded'
                                onClick={() => restorePosition()}
                            >
                                <div className='flex items-center justify-between'>
                                    <FontAwesomeIcon className='pr-2' icon={faEyeLowVision} />
                                    Peek Again
                                </div>
                            </button>
                            <div className='flex flex-col items-center justify-between'>
                                <label className='text-xs font-semibold' htmlFor='countdown'>Change Countdown Timer</label>
                                <input
                                    id='countdown'
                                    name='countdown'
                                    className='bg-transparent outline-none border border-blue-500 hover:border-blue-300 rounded text-blue-700 text-center'
                                    type='number'
                                    defaultValue={countdown ? countdown : ''}
                                />
                            </div>
                        </div>
                        <div className='flex flex-col gap-6'>
                            <BoardEditor
                                color={orientation === 'w' ? 'b' : 'w'}
                                pieceColor={pieceColor}
                                setPieceColor={setPieceColor}
                            />
                            <Chessboard
                                position={game.fen()}
                                arePiecesDraggable={draggablePieces}
                                showBoardNotation={notation}
                                boardOrientation={orientation === 'w' ? 'white' : 'black'}
                                onSquareClick={(square: Square) => handlePieceSelection(square)}
                            />
                            <BoardEditor
                                color={orientation === 'w' ? 'w' : 'b'}
                                pieceColor={pieceColor}
                                setPieceColor={setPieceColor}
                            />
                        </div>
                        <div className='flex items-center justify-center px-4' style={{width: '50px'}}>
                            <Timer />
                        </div>
                    </div>
                </MainContent>
            </PieceContext.Provider>
        </CountdownContext.Provider>
    );
}

export default Practice;