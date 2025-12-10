import { Box, Image } from '@mantine/core';
import classes from './HexagonImage.module.css';

interface HexagonImageProps {
    src: string;
    alt: string;
    size?: number;
}

export function HexagonImage({ src, alt }: HexagonImageProps) {
    return (
        <Box className={classes.hexagonWrapper}>
            <Box className={classes.hexagonContainer}>
                <Image
                    src={src}
                    alt={alt}
                    className={classes.hexagonImage}
                    fit="cover"
                    w="100%"
                    h="100%"
                />
            </Box>
        </Box>
    );
}
