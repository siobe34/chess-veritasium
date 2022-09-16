type ComponentProps = {
    children?: React.ReactNode;
    customUtils?: string | null;
};

export const TableBody = ({ children, customUtils}: ComponentProps) => {
    return (
        <tbody className={customUtils ?? ''}>{children}</tbody>
    )
};

export const TableRow = ({ children, customUtils}: ComponentProps) => {
    return (
        <tr className={`border border-blue-200 p-8 ${customUtils}`}>{children}</tr>
    )
};

export const TableCell = ({ children, customUtils}: ComponentProps) => {
    return (
        <td className={`border border-blue-200 p-4 ${customUtils}`}>{children}</td>
    )
};

function Table({ children, customUtils }: ComponentProps) {
    return (
        <table className={`border-collapse border-blue-200 ${customUtils}}`}>{children}</table>
    )
};

export default Table;