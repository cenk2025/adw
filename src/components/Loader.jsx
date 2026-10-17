import React from 'react';
import { motion } from 'framer-motion';

export default function Loader({ progress }) {
    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="loader-overlay"
            role="status"
            aria-label="Ladataan"
        >
            <div className="loader-logo">
                <img src="/voon-logo-96.webp" alt="VOON IQ" width="347" height="96" />
            </div>
            <div className="loader-bar-container">
                <motion.div
                    className="loader-bar-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                />
            </div>
            <div className="loader-text">{Math.round(progress)}%</div>
        </motion.div>
    );
}
