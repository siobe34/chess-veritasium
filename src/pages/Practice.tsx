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

const DEFAULT_COUNTDOWN: CountdownType['countdown'] = 5;

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
    const [countdown, setCountdown] = useState<CountdownType['countdown']>(DEFAULT_COUNTDOWN);
    const [notification, setNotification] = useState(DEFAULT_NOTIFICATION);

    const flipBoard = () => {
        setOrientation((prevState) => prevState === 'w' ? 'b' : 'w');
    };
    
    const toggleNotation = () => {
        setNotation((prevState) => !prevState);
    };
    
    //* Default countdown may be changed by the user by using an input element
    const changeCountdown = () => {
        //* Get the dom element of the countdown input
        const inp: HTMLInputElement | null = document.querySelector('#countdown');
        //* If there's an error and the dom element can't be found then setCountdown to default
        if (!inp) return setCountdown(() => DEFAULT_COUNTDOWN);
        setCountdown(() => Number(inp.value));
    };
    
    //* Display the basic starting position of a chess game
    const startingPosition = () => {
        setPosition(() => new Chess());
    };
    
    const clearBoard = () => {
        setPosition(() => new Chess(DEFAULT_GAME.gamePosition));
    };
    
    //* Show the chess position of the game allowing the user to view all the pieces again
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
    
    //* Process logic for every time a square on the Chessboard is clicked
    const handlePieceSelection = (square: Square) => {
        if (piece ===  null) return;
        
        //* Allow pieces on the board to be draggable if the selection-tool is clicked
        if (piece === 'select-tool') {
            setDraggablePieces(() => !draggablePieces);
            return;
        };

        setDraggablePieces(() => false);

        //* Remove pieces from the board if the delete tool is selected
        if (piece === 'delete-tool') {
            removePiece(square);
            //* Refresh the position shown on the Chessboard
            setPosition((prevState) => new Chess(prevState.fen()));
            return;
        };
        
        //* Dictionary to map the selected piece to the terminology used by Chess.js's 'put' method
        const pieceMapper: {[key: string]: PieceType} = {
            King: 'k',
            Queen: 'q',
            Bishop: 'b',
            Knight: 'n',
            Rook: 'r',
            Pawn: 'p',
        };
        const shortPiece: PieceType = pieceMapper[piece];
        //* Pass the logic to place a piece to the 'placePiece' function which uses Chess.js's 'put' method
        placePiece({type: shortPiece, color: pieceColor}, square);
        //* Refresh the position shown on the Chessboard
        setPosition((prevState) => new Chess(prevState.fen()));
    };

    //* Change the game to the next unsolved game in the games list
    const setNextGame = () => {
        //* Get index of the current game shown on the Chessboard
        const gameIndex: number = games.indexOf(game);
        
        //* If the current game doesn't exist in the games list or the current game is the last game in the games list,
        //* then setGame to default
        if (gameIndex === -1 || gameIndex === games.length - 1) return setGame(() => DEFAULT_GAME);
        
        //* If the current game has been solved then change the game to the next game in the games list
        if (games[gameIndex].status === 'correct') {
            setGame(() => games[games.indexOf(game) + 1]);
        };
    };

    const checkAnswer = () => {
        //* If the games list is empty, then there should be no need to check for an answer
        if (games.length === 0) return;

        //* Get the answer which would be the fen of the current game
        //* '[0]' is used because you only care about the first part of the fen which has the position of the board
        const answer: string = game.gamePosition.split(' ')[0];
        //* The solution is obtained using the position shown on the Chessboard's fen
        const solution: string = position.fen().split(' ')[0];
        
        if (solution === answer) {
            //* If the current game is the last game in the games list then set the games list to be empty
            //* there's a useEffect that will trigger a new api call if the games list is empty
            //* Otherwise, if the current game isn't the last game then update the current game's status to 'correct'
            if (games.indexOf(game) === games.length - 1) {
                setGames(() => []);
            } else {
                setGames((prevState) => {
                    const newState = [...prevState];
                    const prevGame = newState[prevState.indexOf(game)];
                    if (prevGame) prevGame.status = 'correct';
                    return newState;
                });
            };

            //* Show a notification message saying the solution was correct
            setNotification(() => CORRECT_NOTIFICATION);

            //* Since the current game has been solved, move on to the next game
            setNextGame();
            
            //* Reset the countdown
            changeCountdown();

            //* The notification component has a timeout property to remove the notification but the notification
            //* should also be changed back to default
            setTimeout(() => {
                setNotification(() => DEFAULT_NOTIFICATION);
            }, CORRECT_NOTIFICATION.timeout);

            return;
        };
        
        //* If the solution is not correct, then show an 'incorrect' notification message
        setNotification(() => INCORRECT_NOTIFICATION);
        
        //* The notification component has a timeout property to remove the notification but the notification
        //* should also be changed back to default
        setTimeout(() => {
            setNotification(() => DEFAULT_NOTIFICATION);
        }, INCORRECT_NOTIFICATION.timeout);
    };

    //* Monitor every time the countdown changes, if the countdown is 0 then clear all the pieces from the board
    useEffect(() => {
        if (countdown === 0) {
            clearBoard();
        };
    }, [countdown]);

    //* Monitor every time the games list changes to handle various scenarios
    useEffect(() => {
        //* If the games list is empty then an api call is made
        if (games.length === 0) {
            setApiCallCount((prevState) => prevState + 1);
            getLichessGames();
            return;
        };

        //* If the current game doesn't exist in the games list then the games should be set to the first game in the games list
        if (games.indexOf(game) === -1) return setGame(() => games[0]);

        //* The only other scenarios in which the games list changes would be if the current game status has been changed
        //* to be 'correct' so then the next game in the games list can be set
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
            //! The current logic assumes all lines beginning with '1' will be a valid pgn but this isn't necessarily true.
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