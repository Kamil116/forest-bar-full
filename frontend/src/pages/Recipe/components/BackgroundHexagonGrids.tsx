import { Box } from '@mantine/core';
import classes from './BackgroundHexagonGrids.module.css';

interface BackgroundHexagonGridsProps {
    imageUrl?: string;
}

export function BackgroundHexagonGrids({ 
    imageUrl = `${import.meta.env.BASE_URL}/images/honey-bg.png` 
}: BackgroundHexagonGridsProps = {}) {
    return (
        <Box 
            className={classes.backgroundContainer}
            style={{
                backgroundImage: `url(${imageUrl})`,
            }}
        />
    );
}

