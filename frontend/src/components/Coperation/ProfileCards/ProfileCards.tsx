import React from 'react';
import ProfileCard from '@/components/Coperation/ProfileCards/ProfileCard';
import {
    Box,
    Divider,
    Group,
    ScrollArea,
    useMantineTheme,
} from '@mantine/core';
import { mockVendors } from '@/data/mockVendors';
import styles from './ProfileCards.module.css';

function ProfileCards() {
    const theme = useMantineTheme();

    return (
        <>
            <Box w="100%" style={{ overflow: 'hidden' }}>
                <ScrollArea
                    classNames={styles}
                    type="auto"
                    ml={{ base: 'xs', md: 'xl' }}
                    mr={{ base: 'xs', md: 'xl' }}
                    offsetScrollbars
                    pb="md"
                >
                    <Group wrap="nowrap" gap="xl">
                        {mockVendors.map((leader, index) => (
                            <ProfileCard key={index} leaderProfile={leader} />
                        ))}
                    </Group>
                </ScrollArea>
            </Box>
            <Box pos="relative" w={{ base: '40%', md: '20%' }} mx="auto" my={{ base: 'md', md: 'xl' }}>
                <Divider size={2} color={theme.other.customOrange} />
                <Box
                    pos="absolute"
                    top="50%"
                    left="50%"
                    style={{
                        transform: 'translate(-50%, -50%)',
                        backgroundColor: theme.other.customOrange,
                        borderRadius: '50%',
                        width: 16,
                        height: 16,
                    }}
                />
            </Box>
        </>
    );
}

export default ProfileCards;
