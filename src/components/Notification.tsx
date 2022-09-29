import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faCircleInfo, faCircleCheck, faCircleExclamation, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";

import { INotifications, INotificationItem } from "../types/INotification";

const variantsItem = {
    hidden: {
        y: "-100vh",
        opacity: 0,
    },
    visible: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.75 },
    },
    exit: {
        y: "-100vh",
        opacity: 0,
        transition: { duration: 0.75 },
    },
};

export const NotificationItem = ({ notificationType, children, timeout }: INotificationItem) => {
    let icon = faCircleInfo;
    let notificationClass;
    if (notificationType === "success") {
        icon = faCircleCheck;
        notificationClass = "bg-green-500";
    }
    if (notificationType === "error") {
        icon = faCircleExclamation;
        notificationClass = "bg-red-500";
    }
    if (notificationType === "warning") {
        icon = faTriangleExclamation;
        notificationClass = "bg-yellow-500";
    }
    if (!timeout) timeout = 5000;
    const [itemState, setItemState] = useState<boolean>(true);

    useEffect(() => {
        if (!itemState) return;

        setTimeout(() => {
            setItemState(false);
        }, timeout);
    }, [itemState, timeout]);

    return (
        <AnimatePresence exitBeforeEnter>
            {itemState && (
                <motion.span
                    className={`relative flex items-center justify-between py-2 px-4 w-full overflow-hidden rounded bg-blue-500 text-white ${notificationClass}`}
                    variants={variantsItem}
                    initial='hidden'
                    animate='visible'
                    exit='exit'
                >
                    <div>
                        <FontAwesomeIcon className='mr-2' icon={icon} />
                        {children}
                    </div>
                    <FontAwesomeIcon className='cursor-pointer ml-2' icon={faClose} onClick={() => setItemState(false)} />
                </motion.span>
            )}
        </AnimatePresence>
    );
};

const variantsContainer = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
    },
    exit: {
        opacity: 0,
    },
};

function Notifications({ children }: INotifications) {
    return (
        <motion.div
            className='z-50 fixed flex flex-col items-center justify-center gap-1 p-4'
            variants={variantsContainer}
            initial='hidden'
            animate='visible'
            exit='exit'
        >
            {React.Children.map(children, (child) => {
                if (React.isValidElement(child)) return React.cloneElement(child);
                return null;
            })}
        </motion.div>
    );
}

export default Notifications;
