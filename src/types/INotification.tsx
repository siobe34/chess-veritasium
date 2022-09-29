export interface INotifications {
    children?: React.ReactNode;
}

export interface INotificationItem {
    notificationType?: "info" | "success" | "error" | "warning";
    children?: React.ReactNode;
    timeout?: number;
}

export interface INotificationMessage {
    message: string | null;
    type: INotificationItem["notificationType"];
    timeout: number;
}
