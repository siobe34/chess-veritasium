import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowPointer, faTrashCan } from "@fortawesome/free-solid-svg-icons";

import { IBoardEditor } from "../types/IBoardEditor";

import PieceContext from "./PieceContext";
import King from "./ChessPieces/King";
import Queen from "./ChessPieces/Queen";
import Bishop from "./ChessPieces/Bishop";
import Knight from "./ChessPieces/Knight";
import Rook from "./ChessPieces/Rook";
import Pawn from "./ChessPieces/Pawn";

function BoardEditor({ color, pieceColor, setPieceColor }: IBoardEditor) {
    let longColor;
    if (color === "b") {
        longColor = "black";
    } else {
        longColor = "white";
    }

    const { piece, setPiece } = useContext(PieceContext);
    if (!setPiece) return null;

    const selectPiece = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        setPieceColor(() => color);

        const selectedPiece: any = e.currentTarget.getAttribute("data-piece");
        setPiece((prevState) => {
            if (prevState === selectedPiece && pieceColor === color) return null;
            return selectedPiece;
        });
    };

    return (
        <div className='flex bg-gray-500 dark:bg-gray-700' style={{ height: "70px", width: "560px" }}>
            <div
                className={`${color === "w" ? "text-white" : "dark:text-black"} flex items-center justify-center ${
                    piece === "select-tool" && pieceColor === color ? "bg-blue-500" : null
                }`}
                style={{ height: "70px", width: "70px" }}
                onClick={selectPiece}
                data-piece='select-tool'
            >
                <FontAwesomeIcon icon={faArrowPointer} fontSize='45px' />
            </div>
            <div
                className={`flex items-center justify-center ${piece === "King" && pieceColor === color ? "bg-blue-500" : null}`}
                style={{ height: "70px", width: "70px" }}
                onClick={selectPiece}
                data-piece='King'
            >
                <King color={longColor} />
            </div>
            <div
                className={`flex items-center justify-center ${piece === "Queen" && pieceColor === color ? "bg-blue-500" : null}`}
                style={{ height: "70px", width: "70px" }}
                onClick={selectPiece}
                data-piece='Queen'
            >
                <Queen color={longColor} />
            </div>
            <div
                className={`flex items-center justify-center ${piece === "Bishop" && pieceColor === color ? "bg-blue-500" : null}`}
                style={{ height: "70px", width: "70px" }}
                onClick={selectPiece}
                data-piece='Bishop'
            >
                <Bishop color={longColor} />
            </div>
            <div
                className={`flex items-center justify-center ${piece === "Knight" && pieceColor === color ? "bg-blue-500" : null}`}
                style={{ height: "70px", width: "70px" }}
                onClick={selectPiece}
                data-piece='Knight'
            >
                <Knight color={longColor} />
            </div>
            <div
                className={`flex items-center justify-center ${piece === "Rook" && pieceColor === color ? "bg-blue-500" : null}`}
                style={{ height: "70px", width: "70px" }}
                onClick={selectPiece}
                data-piece='Rook'
            >
                <Rook color={longColor} />
            </div>
            <div
                className={`flex items-center justify-center ${piece === "Pawn" && pieceColor === color ? "bg-blue-500" : null}`}
                style={{ height: "70px", width: "70px" }}
                onClick={selectPiece}
                data-piece='Pawn'
            >
                <Pawn color={longColor} />
            </div>
            <div
                className={`${color === "w" ? "text-white" : "dark:text-black"} flex items-center justify-center ${
                    piece === "delete-tool" && pieceColor === color ? "bg-blue-500" : null
                }`}
                style={{ height: "70px", width: "70px" }}
                onClick={selectPiece}
                data-piece='delete-tool'
            >
                <FontAwesomeIcon icon={faTrashCan} fontSize='45px' />
            </div>
        </div>
    );
}

export default BoardEditor;
