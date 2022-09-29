import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IButtonIcon } from "../types/IButton";

function ButtonIcon({ children, icon }: IButtonIcon) {
    return (
        <div className='flex items-center justify-between'>
            <FontAwesomeIcon className='pr-2' icon={icon} />
            {children}
        </div>
    );
}

export default ButtonIcon;
