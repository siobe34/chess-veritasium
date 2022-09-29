export interface IPiece {
    color: string;
}

export interface IPieceType {
    King: boolean;
    Queen: boolean;
    Bishop: boolean;
    Knight: boolean;
    Rook: boolean;
    Pawn: boolean;
    "select-tool": boolean;
    "delete-tool": boolean;
}

export interface IPieceContext {
    piece: keyof IPieceType | null;
    setPiece: React.Dispatch<React.SetStateAction<keyof IPieceType | null>> | null;
}
