import React from 'react';
import { Box, Stack, Title, useMantineTheme } from '@mantine/core';
import { ToggleSection } from '@/components/Coperation/ToggleSection';
import Advantages from '@/components/Coperation/Advantages/Advantages';

function CooperationPage() {
    const theme = useMantineTheme();

    return (
        <Box bg={theme.other.cardBackground} p={{ base: 'xs', sm: 'sm', md: 'md', lg: 'xl' }}>
            <Stack h="100%" align="center" justify="space-between" gap="xl">
                <Title 
                    fw={700} 
                    fz={{ base: 28, sm: 36, md: 44, lg: 52 }} 
                    tt="uppercase" 
                    c="white" 
                    py={{ base: 20, md: 40 }}
                    ta="center"
                >
                    Сотрудничество
                </Title>
                <Advantages />
                <ToggleSection />
            </Stack>
        </Box>
    );
}

export default CooperationPage;
