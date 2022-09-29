import { createContext } from "react";

import { IPieceContext } from "../types/IPiece";

const PieceContext = createContext<IPieceContext>({ piece: null, setPiece: null });

export default PieceContext;
