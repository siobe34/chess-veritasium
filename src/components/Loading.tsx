import { motion } from "framer-motion";

function Loading() {
    return (
        <div className='flex justify-center items-center w-24 h-24'>
            <motion.div
                className='border-8 border-gray-300 w-full h-full'
                style={{ borderTop: "8px solid #4299e1", borderRadius: "50%" }}
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, ease: "linear", duration: 1 }}
            />
        </div>
    );
}

export default Loading;
