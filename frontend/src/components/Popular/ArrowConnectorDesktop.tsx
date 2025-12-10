/**
 * ArrowConnectorDesktop - Desktop version of arrow connector
 * Renders curved arrows between hexagons for screens wider than 768px
 */
import { Box } from '@mantine/core';
import { useId } from 'react';
import classes from './ArrowConnector.module.css';

interface ArrowConnectorProps {
    direction: 'right-down' | 'right-up';
}

/**
 * Desktop arrow connector component
 * @param direction - 'right-down' connects from top hexagon to bottom, 'right-up' from bottom to top
 */
export function ArrowConnectorDesktop({ direction }: ArrowConnectorProps) {
    const markerId = useId(); // Unique ID for arrow marker to avoid conflicts
    
    return (
        <Box className={`${classes.arrow} ${classes[direction]}`}>
            <svg
                viewBox="0 0 250 150"
                preserveAspectRatio="none"
                className={classes.arrowSvg}
            >
                {/* Arrowhead marker definition */}
                <defs>
                    <marker
                        id={markerId}
                        markerWidth="8"
                        markerHeight="8"
                        refX="7"
                        refY="4"
                        orient="auto"
                        markerUnits="strokeWidth"
                    >
                        <path
                            d="M 0 0 L 8 4 L 0 8 Z"
                            fill="rgba(92, 61, 46, 1)"
                            stroke="none"
                        />
                    </marker>
                </defs>
                {/* Curved arrow path - uses cubic Bezier curves for smooth transitions */}
                <path
                    d={
                        direction === 'right-down'
                            ? 'M 50 0 C 50 25, 80 55, 115 85 C 150 115, 190 130, 245 105'
                            : 'M 65 145 C 50 125, 80 95, 115 65 C 150 35, 190 20, 245 5'
                    }
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

