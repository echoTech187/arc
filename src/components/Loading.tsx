import { AnimatePresence, motion } from "framer-motion";
import LoadingSpinner from "./LoadingSpinner";

type LoadingProps = {
    isProcessing: boolean,
    isConfirmed: boolean
}
export const Loading = ({ isProcessing, isConfirmed }: LoadingProps) => {
    return (
        <AnimatePresence>
            {isProcessing && (
                <motion.div
                    className="processing-container w-screen h-screen bg-blue-600 flex flex-col items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    key={'processing'}
                >
                    <div className="processing-circle">
                        <div className="processing-spinner"></div>
                        <span className="processing-icon">
                            <LoadingSpinner />
                        </span>
                    </div>
                    <p className="processing-text mt-4">Processing...</p>
                </motion.div>
            )}

            {isConfirmed && (
                <motion.div
                    className="processing-container w-screen h-screen bg-blue-600 flex flex-col items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    key={'confirmed'}
                >
                    <motion.div
                        className="confirmed-checkmark"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                        key={'checkmark'}
                    >
                        <svg viewBox="0 0 52 52">
                            <circle cx="26" cy="26" r="25" fill="none" />
                            <path d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                        </svg>
                    </motion.div>
                    <motion.p
                        className="processing-text mt-4"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        key={'confirmed-text'}
                    >
                        Confirmed!
                    </motion.p>
                </motion.div>
            )}
        </AnimatePresence>
    );
}