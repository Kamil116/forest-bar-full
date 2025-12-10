import { Group, Paper, Text, useMantineTheme } from '@mantine/core';

interface RecipeTitleCardsProps {
    mainTitle: string;
    subTitle: string;
}

export function RecipeTitleCards({
    mainTitle,
    subTitle,
}: RecipeTitleCardsProps) {
    const theme = useMantineTheme();

    return (
        <Group gap="md" justify="center" w="100%" wrap="wrap">
            <Paper
                radius={theme.other.cardRadius}
                bg={theme.other.customYellow}
                p={{ base: 'xs', sm: 'sm', md: 'md', lg: 'lg' }}
                style={{
                    flex: '2 1 300px',
                    minWidth: 'clamp(180px, 25vw, 300px)',
                }}
            >
                <Text
                    c="white"
                    fz={{ base: 18, sm: 24, md: 32, lg: 40, xl: 48 }}
                    fw={500}
                    ta="center"
                >
                    {mainTitle}
                </Text>
            </Paper>
            <Paper
                radius={theme.other.cardRadius}
                bg={theme.other.customYellow}
                p={{ base: 'xs', sm: 'sm', md: 'md', lg: 'lg' }}
            >
                <Text
                    c="white"
                    fz={{ base: 18, sm: 24, md: 32, lg: 40, xl: 48 }}
                    fw={500}
                    ta="center"
                >
                    {subTitle}
                </Text>
            </Paper>
        </Group>
    );
}
