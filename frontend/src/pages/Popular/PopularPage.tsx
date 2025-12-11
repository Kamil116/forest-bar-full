import React from 'react';
import {
    Box,
    Stack,
    Text,
    Button,
    useMantineTheme,
    Container,
    Image,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { HexagonList } from '@/components/Popular/HexagonList';
import type { HexagonItemData } from '@/components/Popular/HexagonItem';
import classes from './PopularPage.module.css';

const HEXAGON_DATA: HexagonItemData[] = [
    {
        id: 1,
        image: `https://avatars.mds.yandex.net/get-mpic/2008488/2a00000191fe6b0a6e31dafe859181efb74f/orig`,
        label: 'КАЛИНА',
        position: 'top',
    },
    {
        id: 2,
        image: `https://avatars.mds.yandex.net/get-mpic/5209134/2a00000191d7268e4dff942c6658d6f7a0d2/orig`,
        label: 'СМОРОДИНА',
        position: 'bottom',
    },
    {
        id: 3,
        image: `https://avatars.mds.yandex.net/get-mpic/1602935/img_id4332755094938820254.jpeg/orig`,
        label: 'МАЛИНА',
        position: 'top',
    },
    {
        id: 4,
        image: `https://mnogocvetik.ru/wp-content/uploads/2024/11/рюген-1-768x602.jpg`,
        label: 'ЗЕМЛЯНИКА',
        position: 'bottom',
    },
    {
        id: 5,
        image: `https://avatars.mds.yandex.net/get-mpic/5283122/2a00000191ffb91f92e1d3869c00bc2bf670/orig`,
        label: 'ВИШНЯ',
        position: 'top',
    },
];

export default function PopularPage() {
    const theme = useMantineTheme();
    const isMobile = useMediaQuery('(max-width: 768px)');
    
    // Show only 4 hexagons on mobile, all 5 on desktop
    const displayedHexagons = isMobile ? HEXAGON_DATA.slice(0, 4) : HEXAGON_DATA;

    return (
        <Stack gap={0} h="100vh">
            <Box
                className={classes.mainBackground}
                style={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                {/* Header with group_6.png - Outside Container for full width */}
                <Box className={classes.headerSection}>
                    <Image
                        src={`/images/group_6.png`}
                        alt="Header decoration"
                        className={classes.headerImage}
                    />
                </Box>

                <Container
                    size="xl"
                    fluid
                    // w='100vw'
                    px={{ base: 'xs', sm: 'sm', md: 'md', lg: 'lg' }}
                    style={{
                        height: '100%',
                        display: 'flex',
                    }}
                >
                    <Stack
                        gap="sm"
                        align="center"
                        w="100%"
                        py={{ base: 'xs', sm: 'sm', md: 'md' }}
                        style={{
                            justifyContent: 'space-between',
                        }}
                    >
                        {/* Title */}
                        <Text
                            fz={{ base: 20, sm: 28, md: 36, lg: 44, xl: 56 }}
                            fw={700}
                            c="white"
                            ta="center"
                            px={{ base: 'xs', sm: 'sm', md: 'md' }}
                            className={classes.titleText}
                        >
                            ПОПУЛЯРНО
                        </Text>

                        {/* Hexagons Container */}
                        <HexagonList items={displayedHexagons} />

                        {/* More Button */}
                        <Button
                            size="md"
                            // py='xl'
                            fz={{ base: 12, sm: 16, md: 20, lg: 26, xl: 32 }}
                            fw={500}
                            bg="rgba(219, 166, 25, 0.9)"
                            c="white"
                            radius={theme.other.buttonRadius}
                            px="xl"
                            className={classes.moreButton}
                            style={{
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                            }}
                        >
                            Больше
                        </Button>
                    </Stack>
                </Container>
            </Box>
        </Stack>
    );
}
