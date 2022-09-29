export interface IButton {
    children?: React.ReactNode;
    buttonStyle?: "primary" | "secondary" | "success" | "error";
    customUtils?: string | null;
    onClick?: React.MouseEventHandler;
}
