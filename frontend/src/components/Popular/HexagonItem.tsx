import React from 'react';
import { Box, Text } from '@mantine/core';
import { HexagonImage } from './HexagonImage';
import { ArrowConnector } from './ArrowConnector';
import classes from './HexagonItem.module.css';

export interface HexagonItemData {
    id: number;
    image: string;
    label: string;
    position: 'top' | 'bottom';
}

interface HexagonItemProps {
    item: HexagonItemData;
    index: number;
    totalItems: number;
}

export function HexagonItem({ item, index, totalItems }: HexagonItemProps) {
    return (
        <Box
            className={`${classes.hexagonWrapper} ${
                item.position === 'top' ? classes.hexagonTop : classes.hexagonBottom
            }`}
        >
            {item.position === 'top' && (
                <Text
                    fz={{
                        base: 10,
                        sm: 14,
                        md: 18,
                        lg: 22,
                        xl: 28,
                    }}
                    fw={700}
                    c="white"
                    ta="center"
                    mb={{
                        base: 'xs',
                        sm: 'sm',
                        md: 'md',
                    }}
                    className={classes.hexagonLabel}
                >
                    {item.label}
                </Text>
            )}

            <Box className={classes.hexagonBox}>
                <HexagonImage src={item.image} alt={item.label} />
                {index < totalItems - 1 && (
                    <ArrowConnector
                        direction={
                            item.position === 'top' ? 'right-down' : 'right-up'
                        }
                    />
                )}
            </Box>

            {item.position === 'bottom' && (
                <Text
                    fz={{
                        base: 10,
                        sm: 14,
                        md: 18,
                        lg: 22,
                        xl: 28,
                    }}
                    fw={700}
                    c="white"
                    ta="center"
                    mt={{
                        base: 'xs',
                        sm: 'sm',
                        md: 'md',
                    }}
                    className={classes.hexagonLabel}
                >
                    {item.label}
                </Text>
            )}
        </Box>
    );
}

