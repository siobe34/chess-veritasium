import { useState, useContext } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowPointer, faTrashCan } from '@fortawesome/free-solid-svg-icons';

import PieceContext from './PieceContext';
import King from './ChessPieces/King';
import Queen from './ChessPieces/Queen';
import Bishop from './ChessPieces/Bishop';
import Knight from './ChessPieces/Knight';
import Rook from './ChessPieces/Rook';
import Pawn from './ChessPieces/Pawn';

type ComponentProps = {
    color: 'white' | 'black';
};

function BoardEditor({ color }: ComponentProps) {
    const { piece, setPiece } = useContext(PieceContext);
    if (!setPiece) return null;

    const selectPiece = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        const selectedPiece: any = e.currentTarget.getAttribute('data-piece');
        setPiece((prevState) => {
            console.log(color);
            if (prevState === selectedPiece) return null;
            return selectedPiece;
        });
    };
    
    return (
        <div className='flex bg-gray-500' style={{height: '70px', width: '560px'}}>
            <div
                className={`${color === 'white' ? 'text-white' : null} flex items-center justify-center ${piece === 'select-tool' ? 'bg-blue-500' : null}`}
                style={{height: '70px', width:'70px'}}
                onClick={selectPiece}
                data-piece='select-tool'
            >
                <FontAwesomeIcon icon={faArrowPointer} fontSize='45px'/>
            </div>
            <div
                className={`flex items-center justify-center ${piece === 'King' ? 'bg-blue-500' : null}`}
                style={{height: '70px', width:'70px'}}
                onClick={selectPiece}
                data-piece='King'
            >
                <King color={ color }/>
            </div>
            <div
                className={`flex items-center justify-center ${piece === 'Queen' ? 'bg-blue-500' : null}`}
                style={{height: '70px', width:'70px'}}
                onClick={selectPiece}
                data-piece='Queen'
            >
                <Queen color={ color }/>
            </div>
            <div
                className={`flex items-center justify-center ${piece === 'Bishop' ? 'bg-blue-500' : null}`}
                style={{height: '70px', width:'70px'}}
                onClick={selectPiece}
                data-piece='Bishop'
            >
                <Bishop color={ color }/>
            </div>
            <div
                className={`flex items-center justify-center ${piece === 'Knight' ? 'bg-blue-500' : null}`}
                style={{height: '70px', width:'70px'}}
                onClick={selectPiece}
                data-piece='Knight'
            >
                <Knight color={ color }/>
            </div>
            <div
                className={`flex items-center justify-center ${piece === 'Rook' ? 'bg-blue-500' : null}`}
                style={{height: '70px', width:'70px'}}
                onClick={selectPiece}
                data-piece='Rook'
            >
                <Rook color={ color }/>
            </div>
            <div
                className={`flex items-center justify-center ${piece === 'Pawn' ? 'bg-blue-500' : null}`}
                style={{height: '70px', width:'70px'}}
                onClick={selectPiece}
                data-piece='Pawn'
            >
                <Pawn color={ color }/>
            </div>
            <div
                className={`${color === 'white' ? 'text-white' : null} flex items-center justify-center ${piece === 'delete-tool' ? 'bg-blue-500' : null}`}
                style={{height: '70px', width:'70px'}}
                onClick={selectPiece}
                data-piece='delete-tool'
            >
                <FontAwesomeIcon icon={faTrashCan} fontSize='45px'/>
            </div>
        </div>
    );
};

export default BoardEditor;