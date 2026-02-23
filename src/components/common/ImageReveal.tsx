'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ImageRevealProps {
    children: React.ReactNode;
    className?: string;
}

export function ImageReveal({ children, className }: ImageRevealProps) {
    return (
        <div className={`overflow-hidden ${className || ''}`}>
            <motion.div
                className="w-full h-full"
                initial={{ scale: 1.15, filter: 'blur(5px)' }}
                whileInView={{ scale: 1, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                    duration: 1.5,
                    ease: [0.16, 1, 0.3, 1], // Expo ease-out
                }}
            >
                {children}
            </motion.div>
        </div>
    );
}
