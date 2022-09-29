import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

type ComponentProps = {
    children?: React.ReactNode;
    icon: IconProp;
};

function ButtonIcon({ children, icon }: ComponentProps) {
    return (
        <div className='flex items-center justify-between'>
            <FontAwesomeIcon className='pr-2' icon={icon} />
            {children}
        </div>
    );
}

export default ButtonIcon;
