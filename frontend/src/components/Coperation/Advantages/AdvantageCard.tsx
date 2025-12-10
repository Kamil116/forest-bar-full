import React from 'react';
import { Box, Stack, Text, Title, useMantineTheme } from '@mantine/core';
import classes from './AdvantageCard.module.css';

function AdvantageCard({
    title,
    description,
}: {
    title: string;
    description: string;
}) {
    const theme = useMantineTheme();

    return (
        <Box
            bg={theme.other.darkBackground}
            p={{ base: 'sm', md: theme.other.cardPadding }}
            className={classes.advantageCard}
            style={{
                borderRadius: theme.other.cardRadius,
            }}
        >
            <Stack align="center" gap="md">
                <Title
                    order={2}
                    fz={{ base: 22, sm: 24, md: 32 }}
                    fw={400}
                    tt="uppercase"
                    c={theme.other.customOrange}
                    ta="center"
                >
                    {title}
                </Title>
                <Text
                    fz={{ base: 14, sm: 16, md: 18, lg: 20 }}
                    c="rgba(247, 187, 26, 0.6)"
                    ta="center"
                >
                    {description}
                </Text>
            </Stack>
        </Box>
    );
}

export default AdvantageCard;
