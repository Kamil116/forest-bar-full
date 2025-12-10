import { Box } from '@mantine/core';
import classes from './Hexagon.module.css';

interface HexagonProps {
    size?: number;
    color?: string;
    glow?: boolean;
    className?: string;
}

export function Hexagon({ size = 100, color, glow = false, className }: HexagonProps) {
    const style = {
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: color || 'rgba(247, 187, 26, 1)',
    };

    return (
        <Box
            className={`${classes.hexagon} ${glow ? classes.glow : ''} ${className || ''}`}
            style={style}
        />
    );
}
