import { IconProp } from "@fortawesome/fontawesome-svg-core";

export interface IButton {
    children?: React.ReactNode;
    buttonStyle?: "primary" | "secondary" | "success" | "error";
    customUtils?: string | null;
    onClick?: React.MouseEventHandler;
}

export interface IButtonIcon {
    children?: React.ReactNode;
    icon: IconProp;
}
