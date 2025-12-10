import { Box } from '@mantine/core';
import classes from './RecipeBannerBackground.module.css';

interface RecipeBannerBackgroundProps {
    imageUrl?: string;
}

export function RecipeBannerBackground({ imageUrl }: RecipeBannerBackgroundProps) {
    if (!imageUrl) {
        return null;
    }

    return (
        <Box 
            className={classes.backgroundImage}
            style={{
                backgroundImage: `url(${imageUrl})`,
            }}
        />
    );
}

