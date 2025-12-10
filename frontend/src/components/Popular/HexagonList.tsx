import React from 'react';
import { Box } from '@mantine/core';
import { HexagonItem, type HexagonItemData } from './HexagonItem';
import classes from './HexagonList.module.css';

interface HexagonListProps {
    items: HexagonItemData[];
}

export type { HexagonItemData };
export function HexagonList({ items }: HexagonListProps) {
    return (
        <Box className={classes.hexagonsContainer} >
            {items.map((item, index) => (
                <HexagonItem
                    key={item.id}
                    item={item}
                    index={index}
                    totalItems={items.length}
                />
            ))}
        </Box>
    );
}

