/**
 * ArrowConnectorMobile - Mobile version of arrow connector
 * Renders curved arrows between hexagons for screens 768px and below
 * Uses a more circular curve optimized for vertical mobile layout
 */
import { Box } from '@mantine/core';
import { useId } from 'react';
import classes from './ArrowConnector.module.css';

export function ArrowConnectorMobile({
    direction,
}: {
    direction: 'right-down' | 'right-up';
}) {
    const markerId = useId(); // Unique ID for arrow marker to avoid conflicts

    /**
     * Mobile arrow paths - optimized for vertical stacking
     * Both arrows are symmetric, point to the right, and go from top to bottom
     * Control points create smooth circular curves:
     * - right-down: symmetric curve pointing right (starts left at x=40, ends right at x=80)
     * - right-up: more curved, starts further right (x=60), curves left then right (ends at x=80)
     */
    const mobilePath =
        direction === 'right-down'
            ? 'M 40 0 C 100 50, 100 110, 80 160'
            : 'M 60 0 C 0 50, 0 110, 50 160';

    return (
        <Box
            className={`${classes.arrow} ${classes.mobileArrow} ${classes[direction]}`}
        >
            <svg
                viewBox="0 0 120 160"
                preserveAspectRatio="none"
                className={classes.arrowSvg}
            >
                {/* Arrowhead marker definition - smaller for mobile */}
                <defs>
                    <marker
                        id={markerId}
                        markerWidth="7"
                        markerHeight="7"
                        refX="6"
                        refY="3.5"
                        orient="auto"
                        markerUnits="strokeWidth"
                    >
                        <path
                            d="M 0 0 L 7 3.5 L 0 7 Z"
                            fill="rgba(92, 61, 46, 1)"
                            stroke="none"
                        />
                    </marker>
                </defs>

                {/* Curved arrow path with circular curve */}
                <path
                    d={mobilePath}
                    stroke="rgba(92, 61, 46, 1)"
                    strokeWidth="3"
                    fill="none"
                    markerEnd={`url(#${markerId})`}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </Box>
    );
}
