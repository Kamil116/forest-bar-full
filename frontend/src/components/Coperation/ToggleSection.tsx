import { useState } from 'react';
import { Box, Stack, Title, Button, Group, useMantineTheme } from '@mantine/core';
import VacancyCards from "@/components/Coperation/VacancyCards/VacancyCards";
import ProfileCards from './ProfileCards/ProfileCards';
import Partnership from './Partnership';

export function ToggleSection() {
    const [value, setValue] = useState('job');
    const theme = useMantineTheme();

    return (
        <Box ta='center' w="100%" px={{ base: 'xs', md: 'md' }}>
            <Group gap="md" justify="center" wrap="wrap">
                <Button
                    size="md"
                    fz={{ base: 18, sm: 24, md: 36 }}
                    fw={500}
                    radius={theme.other.buttonRadius}
                    bg={value === 'job' ? theme.other.customYellow : theme.other.darkBackground}
                    c={value === 'job' ? 'white' : theme.other.customYellow}
                    onClick={() => setValue('job')}
                >
                    Работа
                </Button>
                <Button
                    size="md"
                    fz={{ base: 18, sm: 24, md: 36 }}
                    fw={500}
                    radius={theme.other.buttonRadius}
                    bg={value === 'cooperation' ? theme.other.customYellow : theme.other.darkBackground}
                    c={value === 'cooperation' ? 'white' : theme.other.customYellow}
                    onClick={() => setValue('cooperation')}
                >
                    Партнерство
                </Button>
            </Group>

            <Box mt={{ base: 'lg', md: 'xl' }}>
                {value === 'job' && (
                    <Stack align="center" justify="center" gap="lg">
                        <VacancyCards />
                        <Title 
                            fz={{ base: 28, sm: 36, md: 44, lg: 52 }} 
                            fw={400} 
                            tt="uppercase"
                            c='white'
                            ta="center"
                        >
                            Профили продавцов
                        </Title>
                        <ProfileCards />
                    </Stack>
                )}
                {value === 'cooperation' && (
                    <Partnership />
                )}
            </Box>
        </Box>
    );
}
