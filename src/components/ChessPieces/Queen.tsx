import { IPiece } from "../../types/IPiece";

function Queen({ color }: IPiece) {
    return (
        <div className='flex justify-center' style={{ width: "70px", height: "70px" }}>
            <div
                // draggable='true'
                // TODO Shouldn't the entire component be draggable rather than just the Piece??
                style={{
                    opacity: 1,
                    zIndex: 5,
                    touchAction: "none",
                    cursor: "grab",
                }}
            >
                <svg viewBox='1 1 43 43' width='70' height='70'>
                    <g>
                        <svg xmlns='http://www.w3.org/2000/svg' version='1.1' width='45' height='45'>
                            <g
                                style={{
                                    fill: color === "black" ? "rgb(0, 0, 0)" : "rgb(255, 255, 255)",
                                    stroke: "rgb(0, 0, 0)",
                                    strokeWidth: 1.5,
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                }}
                            >
                                <path
                                    d='M 9,26 C 17.5,24.5 30,24.5 36,26 L 38.5,13.5 L 31,25 L 30.7,10.9 L 25.5,24.5 L 22.5,10 L 19.5,24.5 L 14.3,10.9 L 14,25 L 6.5,13.5 L 9,26 z'
                                    style={{
                                        strokeLinecap: "butt",
                                        fill: color === "black" ? "rgb(0, 0, 0)" : "rgb(255, 255, 255)",
                                    }}
                                />
                                <path d='m 9,26 c 0,2 1.5,2 2.5,4 1,1.5 1,1 0.5,3.5 -1.5,1 -1,2.5 -1,2.5 -1.5,1.5 0,2.5 0,2.5 6.5,1 16.5,1 23,0 0,0 1.5,-1 0,-2.5 0,0 0.5,-1.5 -1,-2.5 -0.5,-2.5 -0.5,-2 0.5,-3.5 1,-2 2.5,-2 2.5,-4 -8.5,-1.5 -18.5,-1.5 -27,0 z' />
                                <path d='M 11.5,30 C 15,29 30,29 33.5,30' />
                                <path d='m 12,33.5 c 6,-1 15,-1 21,0' />
                                <circle cx='6' cy='12' r='2' />
                                <circle cx='14' cy='9' r='2' />
                                <circle cx='22.5' cy='8' r='2' />
                                <circle cx='31' cy='9' r='2' />
                                <circle cx='39' cy='12' r='2' />
                                <path
                                    style={{
                                        fill: "none",
                                        stroke: color === "black" ? "rgb(0, 0, 0)" : "transparent",
                                        strokeLinecap: "butt",
                                    }}
                                    d='M 11,38.5 A 35,35 1 0 0 34,38.5'
                                />
                                <g
                                    style={{
                                        fill: "none",
                                        stroke: color === "black" ? "rgb(255, 255, 255)" : "transparent",
                                    }}
                                >
                                    <path d='M 11,29 A 35,35 1 0 1 34,29' />
                                    <path d='M 12.5,31.5 L 32.5,31.5' />
                                    <path d='M 11.5,34.5 A 35,35 1 0 0 33.5,34.5' />
                                    <path d='M 10.5,37.5 A 35,35 1 0 0 34.5,37.5' />
                                </g>
                            </g>
                        </svg>
                    </g>
                </svg>
            </div>
        </div>
    );
}

export default Queen;
