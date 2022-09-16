import { useState, useEffect } from 'react';

import { faLocationCrosshairs, faArrowsRotate, faEraser, faChessBoard, faCheck, faEyeLowVision } from '@fortawesome/free-solid-svg-icons';
import { Chess, Square, Piece, PieceType } from 'chess.js';
import { Chessboard } from 'react-chessboard';

import MainContent from '../components/MainContent';
import Button from '../components/Button';
import Loading from '../components/Loading';
import ButtonIcon from '../components/ButtonIcon';
import BoardEditor from '../components/BoardEditor';
import Notifications, { NotificationItem, NotificationProps } from '../components/Notification';
import Timer from '../components/Timer';
import PieceContext, { PieceContextType } from '../components/PieceContext';
import CountdownContext, { CountdownType } from '../components/CountdownContext';

type gameType = {
    status: string,
    player: string,
    gamePosition: string
};

type playersType = {
    name: string,
    lichessUsername: string
};

type notificationType = {
    message: string | null,
    type: NotificationProps['notificationType'],
    timeout: number
};

const PLAYERS: playersType[] = [
    {
        name: 'Eric Rosen',
        lichessUsername: 'EricRosen'
    },
    {
        name: 'Lefong Hua',
        lichessUsername: 'LefongHua'
    },
    {
        name: 'Zhigalko Sergei',
        lichessUsername: 'Zhigalko_Sergei'
    },
    {
        name: 'Daniel Naroditsky',
        lichessUsername: 'RebeccaHarris'
    },
];

const DEFAULT_NOTIFICATION: notificationType = {
    message: null,
    type: 'info',
    timeout: 0
};

const CORRECT_NOTIFICATION: notificationType = {
    message: 'Nice, you got it right!',
    type: 'success',
    timeout: 2500
};

const INCORRECT_NOTIFICATION: notificationType = {
    message: 'Not quite right, try again!!',
    type: 'error',
    timeout: 2500
};

const DEFAULT_GAME: gameType = {
    status: 'null',
    player: 'null',
    gamePosition: '8/8/8/8/8/8/8/8 w KQkq - 0 1'
};

function Practice() {
    const [apiCallCount, setApiCallCount] = useState<number>(0);
    const [games, setGames] = useState<gameType[]>([]);
    const [game, setGame] = useState<gameType>(() => games.length === 0 ? DEFAULT_GAME : games[0]);
    const [position, setPosition] = useState(new Chess(game.gamePosition));
    const [orientation, setOrientation] = useState<'w' | 'b'>('w');
    const [notation, setNotation] = useState<boolean>(true);
    const [draggablePieces, setDraggablePieces] = useState<boolean>(false);
    const [piece, setPiece] = useState<PieceContextType['piece']>(null);
    const [pieceColor, setPieceColor] = useState<'w' | 'b'>('w');
    const [countdown, setCountdown] = useState<CountdownType['countdown']>(5);
    const [notification, setNotification] = useState(DEFAULT_NOTIFICATION);

    const flipBoard = () => {
        setOrientation((prevState) => prevState === 'w' ? 'b' : 'w');
    };
    
    const toggleNotation = () => {
        setNotation((prevState) => !prevState);
    };
    
    const changeCountdown = () => {
        const inp: HTMLInputElement | null = document.querySelector('#countdown');
        if (!inp) return setCountdown(() => 5);
        setCountdown(() => Number(inp.value));
    };
    
    const startingPosition = () => {
        setPosition(() => new Chess());
    };
    
    const clearBoard = () => {
        setPosition(() => new Chess(DEFAULT_GAME.gamePosition));
    };
    
    const restorePosition = () => {
        setPosition(() => new Chess(game.gamePosition));
        changeCountdown();
    };
    
    const placePiece = (piece: Piece, square: Square) => {
        position.put(piece, square);
    };

    const removePiece = (square: Square) => {
        position.remove(square);
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
            setPosition((prevState) => new Chess(prevState.fen()));
            return;
        };
        
        const pieceMapper: {[key: string]: PieceType} = {
            King: 'k',
            Queen: 'q',
            Bishop: 'b',
            Knight: 'n',
            Rook: 'r',
            Pawn: 'p',
        };
        const shortPiece: PieceType = pieceMapper[piece];
        placePiece({type: shortPiece, color: pieceColor}, square);
        setPosition((prevState) => new Chess(prevState.fen()));
    };

    const setNextGame = () => {
        const gameIndex: number = games.indexOf(game);
        if (gameIndex === -1 || gameIndex === games.length - 1) return setGame(() => DEFAULT_GAME);
        if (games[gameIndex].status === 'correct') {
            setGame(() => games[games.indexOf(game) + 1]);
        };
    };

    const checkAnswer = () => {
        if (games.length === 0) return;
        const answer: string = game.gamePosition.split(' ')[0];
        const solution: string = position.fen().split(' ')[0];
        if (solution === answer) {
            if (games.indexOf(game) === games.length -1) {
                setGames(() => []);
            } else {
                setGames((prevState) => {
                    const newState = [...prevState];
                    const prevGame = newState[prevState.indexOf(game)];
                    if (prevGame) prevGame.status = 'correct';
                    return newState;
                });
            };

            setNotification(() => CORRECT_NOTIFICATION);

            setNextGame();
            changeCountdown();

            setTimeout(() => {
                setNotification(() => DEFAULT_NOTIFICATION);
            }, 2500);

            return;
        };
        
        setNotification(() => INCORRECT_NOTIFICATION);

        setTimeout(() => {
            setNotification(() => DEFAULT_NOTIFICATION);
        }, 2500);
    };

    useEffect(() => {
        if (countdown === 0) {
            clearBoard();
        };
    }, [countdown]);

    useEffect(() => {
        if (games.length === 0) {
            setApiCallCount((prevState) => prevState + 1);
            getLichessGames();
            return;
        };
        //! This line doesn't make sense because if the game doesn't exist in the games list then why would you set the game to be the first game in the games list?
        //! Maybe because if the game is set to DEFAULT_GAME then it wouldn't exist in the games list so once you load the new games list you would set it to the first game?
        if (games.indexOf(game) === -1) return setGame(() => games[0]);

        //* If the current game the last game in the games list then setGame to DEFAULT_GAME in order to make a new API call
        //! Even the above explanation doesn't make sense because there's no UseEffect monitoring to see if game is set to DEFAULT_GAME in order to make the API call
        if (games.indexOf(game) === games.length) return setGame(() => DEFAULT_GAME);
        setNextGame();
    }, [games]);

    // * Monitor every time the game changes to update the position shown on the Chessboard component
    useEffect(() => {
        //* Position is what is shown in the Chessboard component
        setPosition(() => new Chess(game.gamePosition));
    }, [game]);

    async function getLichessGames() {
        //* If the games of all players in PLAYERS list have already been retrieved then loop through the list of players again
        if (apiCallCount === PLAYERS.length - 1) setApiCallCount(() => 0);
        //* Get lichessUsername of a player to retrieve their games
        const player = PLAYERS[apiCallCount];

        //* Retrieve games with following parameters:
        //*     Rated Games
        //*     3 Most Recent Games
        const response = await fetch(`https://lichess.org/api/games/user/${player.lichessUsername}?max=20&rated=true&pgnInJson=true`);
        const responseText = await response.text();
        
        //* Parse the response text line by line to find all the PGNS
        const responseLines = responseText.split('\n');

        //* Loop through parsed lines to store all the game fens in array
        responseLines.forEach((line) => {
            //* If the line of the response contains a pgn then convert it to fen and store the position in array
            //! The current logic assumes all lines beginning with '1' will be a valid pgn but this isn't necessary.
            //TODO No error handling: lines could be invalid PGNS
            if (line[0] === '1') {
                const fenConverter = new Chess();
                fenConverter.load_pgn(line);
                setGames((prevState) => {
                    const newState = [...prevState];
                    newState.push({
                        status: 'incomplete',
                        player: player.name,
                        gamePosition: fenConverter.fen()
                    });
                    return newState;
                });
            };
        });
    };
    
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
                    {games.length === 0 ? <Loading /> :
                        <>
                        <div className='flex flex-col gap-4 self-center px-4'>
                            <Button
                                onClick={() => checkAnswer()}
                                buttonStyle={
                                    notification.type === 'success' || notification.type === 'error' ? notification.type : 'primary'
                                }
                            >
                                <ButtonIcon icon={faCheck}>Check Answer</ButtonIcon>
                            </Button>
                            <Button onClick={() => flipBoard()}>
                                <ButtonIcon icon={faArrowsRotate}>Flip Board</ButtonIcon>
                            </Button>
                            <Button onClick={() => toggleNotation()}>
                                <ButtonIcon icon={faLocationCrosshairs}>Toggle Notation</ButtonIcon>
                            </Button>
                            <Button onClick={() => clearBoard()}>
                                <ButtonIcon icon={faEraser}>Clear Board</ButtonIcon>
                            </Button>
                            <Button onClick={() => startingPosition()}>
                                <ButtonIcon icon={faChessBoard}>Starting Position</ButtonIcon>
                            </Button>
                            <Button onClick={() => restorePosition()} buttonStyle='primary'>
                                <ButtonIcon icon={faEyeLowVision}>Peek Again</ButtonIcon>
                            </Button>
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
                                position={position.fen()}
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
                        </>
                        }
                    </div>
                </MainContent>
            </PieceContext.Provider>
        </CountdownContext.Provider>
    );
}

export default Practice;