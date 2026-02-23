'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TextRevealProps {
    text: string;
    className?: string;
    delay?: number;
    staggerDelay?: number;
    elementType?: React.ElementType;
}

export function TextReveal({
    text,
    className,
    delay = 0,
    staggerDelay = 0.05,
    elementType: Element = 'div',
}: TextRevealProps) {
    // Split text into words, keeping spaces
    const words = text.split(' ').map(word => `${word}\u00A0`);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: staggerDelay,
                delayChildren: delay,
            },
        },
    };

    const wordVariants: any = {
        hidden: {
            y: '100%',
            opacity: 0,
            rotate: 5
        },
        visible: {
            y: 0,
            opacity: 1,
            rotate: 0,
            transition: {
                ease: "circOut", // Expo ease-out for a very premium snap feel
                duration: 0.8,
            },
        },
    };

    // Convert string Element to any valid motion element, safely casting.
    const MotionTag = motion.div as any;

    return (
        <MotionTag
            className={cn('inline-flex flex-wrap overflow-hidden', className)}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            as={Element}
        >
            {words.map((word, i) => (
                <span key={i} className="overflow-hidden inline-flex">
                    <motion.span variants={wordVariants} className="inline-block origin-bottom-left">
                        {word}
                    </motion.span>
                </span>
            ))}
        </MotionTag>
    );
}
