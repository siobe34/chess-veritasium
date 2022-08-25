import { useState, useContext } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationCrosshairs, faClock, faArrowsRotate, faEraser, faRotateLeft, faChessBoard} from '@fortawesome/free-solid-svg-icons';
import { Chess, Square, Piece, PieceType } from 'chess.js';
import { Chessboard } from 'react-chessboard';

import MainContent from '../components/MainContent';
import BoardEditor from '../components/BoardEditor';
import Timer from '../components/Timer';
import PieceContext, { PieceContextType } from '../components/PieceContext';

function Landing() {   
    const fen: string = '8/5k2/3p4/1p1Pp2p/pP2Pp1P/P4P1K/8/8 b - - 99 50';

    const [orientation, setOrientation] = useState<'w' | 'b'>('w');
    const [notation, setNotation] = useState<boolean>(true);
    const [game, setGame] = useState(new Chess(fen));
    const [piece, setPiece] = useState<PieceContextType['piece']>(null);

    const flipBoard = () => {
        setOrientation((prevState) => prevState === 'w' ? 'b' : 'w');
    };
    
    const toggleNotation = () => {
        setNotation((prevState) => !prevState);
    };
    
    const startingPosition = () => {
        setGame(() => new Chess());
    };
    
    const clearBoard = () => {
        setGame(() => new Chess('8/8/8/8/8/8/8/8 w KQkq - 0 1'));
    };
    
    const restorePosition = () => {
        setGame(() => new Chess(fen));
    };
    
    const placePiece = (piece: Piece, square: Square) => {
        game.put(piece, square);
    };
    const removePiece = (square: Square) => {
        game.remove(square);
    };
    const handlePieceSelection = (square: Square) => {
        if (piece ===  null || piece === 'select-tool') return;

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
        placePiece({type: shortPiece, color: 'w'}, square);
        setGame((prevState) => new Chess(prevState.fen()));
    };
    
    return (
        <PieceContext.Provider value = {{piece: piece, setPiece: setPiece}}>
            <MainContent>
                <h1 className='font-bold text-3xl mt-6'>Landing Page</h1>
                <div className='flex'>
                    <div className='flex flex-col gap-4 self-center mr-4'>
                        <button
                            className='bg-transparent hover:bg-blue-500 text-blue-700 hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'
                            onClick={() => flipBoard()}
                        >
                            <FontAwesomeIcon className='mr-2' icon={faArrowsRotate} />
                            Flip Board
                        </button>
                        <button
                            className='bg-transparent hover:bg-blue-500 text-blue-700 hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'
                            onClick={() => toggleNotation()}
                        >
                            <FontAwesomeIcon className='mr-2' icon={faLocationCrosshairs} />
                            Toggle Notation
                        </button>
                        <button
                            className='bg-transparent hover:bg-blue-500 text-blue-700 hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'
                            onClick={() => clearBoard()}
                        >
                            <FontAwesomeIcon className='mr-2' icon={faEraser} />
                            Clear Board
                        </button>
                        <button
                            className='bg-transparent hover:bg-blue-500 text-blue-700 hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'
                            onClick={() => restorePosition()}
                        >
                            <FontAwesomeIcon className='mr-2' icon={faRotateLeft} />
                            Restore Position
                        </button>
                        <button
                            className='bg-transparent hover:bg-blue-500 text-blue-700 hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'
                            onClick={() => startingPosition()}
                        >
                            <FontAwesomeIcon className='mr-2' icon={faChessBoard} />
                            Starting Position
                        </button>
                        <button
                            className='bg-transparent hover:bg-blue-500 text-blue-700 hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'
                            onClick={() => clearBoard()}
                        >
                            <FontAwesomeIcon className='mr-2' icon={faClock} />
                            Set Timer
                        </button>
                    </div>
                    <div className='flex flex-col gap-6'>
                        <BoardEditor color={orientation === 'w' ? 'black' : 'white'}/>
                        <Chessboard
                            position={game.fen()}
                            arePiecesDraggable={false}
                            showBoardNotation={notation}
                            boardOrientation={orientation === 'w' ? 'white' : 'black'}
                            onSquareClick={(square: Square) => handlePieceSelection(square)}
                        />
                        <BoardEditor color={orientation === 'w' ? 'white' : 'black'}/>
                    </div>
                    <div className='flex items-center justify-center ml-4'>
                        <Timer time={2000}/>
                    </div>
                </div>
            </MainContent>
        </PieceContext.Provider>
    );
}

export default Landing;