import { ITable } from "../types/ITable";

export const TableBody = ({ children, customUtils }: ITable) => {
    return <tbody className={customUtils ?? ""}>{children}</tbody>;
};

export const TableRow = ({ children, customUtils }: ITable) => {
    return <tr className={`border border-blue-200 p-8 ${customUtils}`}>{children}</tr>;
};

export const TableCell = ({ children, customUtils }: ITable) => {
    return <td className={`border border-blue-200 p-4 ${customUtils}`}>{children}</td>;
};

function Table({ children, customUtils }: ITable) {
    return <table className={`border-collapse border-blue-200 ${customUtils}}`}>{children}</table>;
}

export default Table;
