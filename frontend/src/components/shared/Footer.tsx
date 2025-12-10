import React from 'react';
import { Box, Group, Stack, Text, useMantineTheme } from '@mantine/core';
import classes from './Footer.module.css';

function Footer() {
    const theme = useMantineTheme();

    return (
        <Box
            bg={theme.other.darkBackground}
            w="100%"
            p={{ base: 4, sm: 6, md: 8, lg: 12 }}
        >
            <Group justify="space-between" wrap="wrap" gap="sm">
                <Stack justify="flex-end" gap={2}>
                    <Text className={classes.footerText}>
                        (c) Forest Bar 2025
                    </Text>
                    <Text className={classes.footerText}>
                        Магазин экопродуктов
                    </Text>
                </Stack>
                <Group
                    gap="sm"
                    align="flex-end"
                    wrap="wrap"
                    justify="flex-end"
                >
                    <Stack gap={0} className={classes.hideOnMobile}>
                        <Text className={classes.footerText}>
                            Политика конфиденциальности
                        </Text>
                    </Stack>
                    <Stack gap={0}>
                        <Text
                            className={`${classes.footerText}`}
                        >
                            Пользовательское соглашение
                        </Text>
                    </Stack>
                </Group>
            </Group>
        </Box>
    );
}

export default Footer;
