import { createContext } from "react";

type PieceType = {
    King: boolean;
    Queen: boolean;
    Bishop: boolean;
    Knight: boolean;
    Rook: boolean;
    Pawn: boolean;
    "select-tool": boolean;
    "delete-tool": boolean;
};

export type PieceContextType = {
    piece: keyof PieceType | null;
    setPiece: React.Dispatch<React.SetStateAction<keyof PieceType | null>> | null;
};

const PieceContext = createContext<PieceContextType>({ piece: null, setPiece: null });

export default PieceContext;
