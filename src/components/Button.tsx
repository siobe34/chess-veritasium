import { IButton } from "../types/IButton";

const PRIMARY_BTN = "bg-blue-500 hover:bg-transparent text-white dark:text-white hover:text-blue-700 border-blue-500";
const SECONDARY_BTN = "bg-transparent hover:bg-blue-500 text-blue-700 dark:text-white hover:text-white hover:border-transparent border-blue-500";
const SUCCESS_BTN = "bg-green-500 hover:bg-transparent text-white dark:text-white hover:text-green-700 border-green-500 text-white";
const ERROR_BTN = "bg-red-500 hover:bg-transparent text-white dark:text-white hover:text-red-700 border-red-500 text-white";

function Button({ children, buttonStyle, customUtils, onClick }: IButton) {
    let btnStyle = SECONDARY_BTN;
    if (buttonStyle === "primary") btnStyle = PRIMARY_BTN;
    if (buttonStyle === "success") btnStyle = SUCCESS_BTN;
    if (buttonStyle === "error") btnStyle = ERROR_BTN;
    return (
        <button className={`py-2 px-4 rounded border ${btnStyle} ${customUtils}`} onClick={onClick}>
            {children}
        </button>
    );
}

export default Button;
