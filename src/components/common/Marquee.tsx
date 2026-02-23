'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface MarqueeProps {
    text: string;
    speed?: number; // Speed in seconds for one full translation
}

export function Marquee({ text, speed = 20 }: MarqueeProps) {
    // We duplicate the text multiple times to ensure the screen is filled and loops seamlessly.
    const repeatedText = Array(4).fill(text).join('\u00A0\u00A0\u00A0|\u00A0\u00A0\u00A0');

    return (
        <div className="relative flex overflow-hidden w-full bg-black text-white py-3 border-y border-white flex-nowrap group">
            <motion.div
                className="flex shrink-0 w-max items-center justify-center whitespace-nowrap"
                animate={{
                    x: ['0%', '-50%'],
                }}
                transition={{
                    repeat: Infinity,
                    ease: 'linear',
                    duration: speed,
                }}
            >
                <span className="font-headline font-bold uppercase tracking-widest text-xs pr-12 group-hover:text-gray-400 transition-colors">
                    {repeatedText}
                </span>
                <span className="font-headline font-bold uppercase tracking-widest text-xs pr-12 group-hover:text-gray-400 transition-colors">
                    {repeatedText}
                </span>
            </motion.div>
        </div>
    );
}
