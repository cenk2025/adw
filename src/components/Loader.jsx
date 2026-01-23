import React from 'react';
import { motion } from 'framer-motion';

export default function Loader({ progress }) {
    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="loader-overlay"
        >
            <div className="loader-logo">
                VOON
            </div>
            <div className="loader-bar-container">
                <motion.div
                    className="loader-bar-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                />
            </div>
            <div className="loader-text">
                {Math.round(progress)}%
            </div>
        </motion.div>
    );
}
