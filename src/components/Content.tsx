import { motion } from "framer-motion";

import { IContent } from "../types/IContent";

function Content({ children }: IContent) {
    return (
        <motion.div
            className='flex flex-col items-center overflow-auto gap-4 w-full'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {children}
        </motion.div>
    );
}

export default Content;
