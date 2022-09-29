export interface IBoardEditor {
    color: "w" | "b";
    pieceColor: "w" | "b";
    setPieceColor: React.Dispatch<React.SetStateAction<"w" | "b">>;
}
