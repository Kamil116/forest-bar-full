import React from 'react';
import { Box, Group } from '@mantine/core';
import AdvantageCard from '@/components/Coperation/Advantages/AdvantageCard';
import { mockAdvantages } from '@/data/mockAdvantages';

function Advantages() {
    return (
        <Box px={{ base: 'xs', md: 'md' }}>
            <Group gap="xl" justify="center" wrap="wrap">
                {mockAdvantages.map((advantage) => (
                    <AdvantageCard
                        key={advantage.id}
                        title={advantage.title}
                        description={advantage.description}
                    />
                ))}
            </Group>
        </Box>
    );
}

export default Advantages;
