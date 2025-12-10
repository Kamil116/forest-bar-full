import { useState } from 'react';
import {
    Box,
    Text,
    Stack,
    ScrollArea,
    Card,
    useMantineTheme,
    Divider,
    Group,
} from '@mantine/core';
import classes from './VendorsPage.module.css';
import { IconMapPin } from '@tabler/icons-react';
import { mockVendors } from '@/data/mockVendors';
import { Vendor } from '@/types/vendor';

export default function VendorsPage() {
    const theme = useMantineTheme();
    const [selected, setSelected] = useState<Vendor | null>(null);
    const [hoveredId, setHoveredId] = useState<number | null>(null);

    const markers = mockVendors
        .filter(
            (v): v is Vendor & { coords: [number, number] } =>
                v.coords !== null && v.coords !== undefined
        )
        .map((v) => `${v.coords[1]},${v.coords[0]},pm2rdl`)
        .join('~');
    const center =
        selected && selected.coords
            ? `${selected.coords[1]},${selected.coords[0]}`
            : '85,61.5240';
    const zoom = selected ? 10 : 4;
    const mapUrl = `https://yandex.ru/map-widget/v1/?ll=${center}&z=${zoom}&l=map&pt=${markers}&lang=ru_RU`;

    return (
        <Box
            h="100vh"
            w="100%"
            p={{ base: 'xs', sm: 'sm', md: 'md' }}
            bg={theme.other.cardBackground}
        >
            <Stack h="100%" gap="md" w="100%" className={classes.mainStack}>
                <Text
                    fw={400}
                    c="white"
                    ta="center"
                    tt="uppercase"
                    fz={{ base: 28, sm: 36, md: 48, lg: 60 }}
                    className={classes.titleText}
                >
                    Наши партнеры
                </Text>

                <Box className={classes.responsiveGroup}>
                    <Box
                        className={classes.vendorBox}
                        style={{
                            borderRadius: theme.other.cardRadius,
                        }}
                        bg={theme.other.darkBackground}
                    >
                        <ScrollArea
                            className={classes.scrollArea}
                            px={{ base: 'xs', md: 'xs' }}
                            py={{ base: 'sm', md: 'xl' }}
                            scrollbarSize={8}
                            classNames={classes}
                        >
                            <Stack gap="lg" px={{ base: 'xs', md: 'md' }}>
                                {mockVendors.map((v) => (
                                    <Card
                                        key={v.id}
                                        p={{ base: 'sm', md: 'md' }}
                                        radius={theme.other.cardRadius}
                                        bg={
                                            selected?.id === v.id
                                                ? theme.other.customYellow
                                                : hoveredId === v.id
                                                  ? theme.other.cardBackground
                                                  : theme.other.darkBackground
                                        }
                                        className={`${classes.vendorCard} ${
                                            selected?.id === v.id
                                                ? classes.vendorCardSelected
                                                : hoveredId === v.id
                                                  ? classes.vendorCardHovered
                                                  : ''
                                        }`}
                                        style={{
                                            border: `1px solid ${theme.other.customYellow}`,
                                        }}
                                        onMouseEnter={() => {
                                            if (selected?.id !== v.id) {
                                                setHoveredId(v.id);
                                            }
                                        }}
                                        onMouseLeave={() => {
                                            setHoveredId(null);
                                        }}
                                        onClick={() => setSelected(v)}
                                    >
                                        <Group
                                            justify="space-between"
                                            align="center"
                                            wrap="nowrap"
                                            gap="md"
                                        >
                                            <Stack
                                                gap={0}
                                                className={classes.vendorStack}
                                            >
                                                <Text
                                                    className={
                                                        classes.vendorText
                                                    }
                                                    fw={700}
                                                    fz={{
                                                        base: 16,
                                                        sm: 16,
                                                        md: 24,
                                                    }}
                                                    c={
                                                        selected?.id === v.id
                                                            ? theme.other
                                                                  .darkBackground
                                                            : 'white'
                                                    }
                                                >
                                                    {v.region}
                                                </Text>
                                                <Divider
                                                    my="xs"
                                                    size={2}
                                                    color={
                                                        selected?.id === v.id
                                                            ? 'black'
                                                            : theme.other
                                                                  .customOrange
                                                    }
                                                    w="100%"
                                                />
                                                <Text
                                                    className={
                                                        classes.vendorText
                                                    }
                                                    size="sm"
                                                    fz={{
                                                        base: 12,
                                                        sm: 14,
                                                        md: 16,
                                                    }}
                                                    c={
                                                        selected?.id === v.id
                                                            ? theme.other
                                                                  .darkBackground
                                                            : 'rgba(255,255,255,0.7)'
                                                    }
                                                >
                                                    {v.address}
                                                </Text>
                                                <Text
                                                    size="sm"
                                                    fz={{
                                                        base: 12,
                                                        sm: 14,
                                                        md: 16,
                                                    }}
                                                    c={
                                                        selected?.id === v.id
                                                            ? theme.other
                                                                  .darkBackground
                                                            : 'rgba(255,255,255,0.7)'
                                                    }
                                                >
                                                    {v.phone}
                                                </Text>
                                            </Stack>
                                            <Box
                                                className={`${classes.iconContainer} ${
                                                    hoveredId === v.id
                                                        ? classes.iconContainerHovered
                                                        : ''
                                                }`}
                                                py={{ base: 'sm', md: 'md' }}
                                                px={{ base: 'sm', md: 'md' }}
                                                bg={theme.other.cardBackground}
                                                style={{
                                                    border:
                                                        hoveredId === v.id
                                                            ? `1px solid ${theme.other.customYellow}`
                                                            : 'none',
                                                }}
                                            >
                                                <IconMapPin
                                                    className={
                                                        classes.iconMapPin
                                                    }
                                                    size={24}
                                                    color={
                                                        selected?.id === v.id
                                                            ? 'lime'
                                                            : theme.other
                                                                  .customYellow
                                                    }
                                                />
                                            </Box>
                                        </Group>
                                    </Card>
                                ))}
                            </Stack>
                        </ScrollArea>
                    </Box>

                    <Box
                        className={classes.mapBox}
                        style={{
                            borderRadius: theme.other.cardRadius,
                        }}
                        p={{ base: 'xs', md: 'md' }}
                        bg={theme.other.cardBackground}
                    >
                        <iframe
                            src={mapUrl}
                            width="100%"
                            height="100%"
                            frameBorder="0"
                            title="Карта магазинов"
                            className={classes.mapIframe}
                            style={{ borderRadius: theme.other.cardRadius }}
                        />
                    </Box>
                </Box>
            </Stack>
        </Box>
    );
}
