import React from 'react';
import {
    Button,
    Box,
    Stack,
    Text,
    Image,
    useMantineTheme,
    Divider,
} from '@mantine/core';
import { Vendor } from '@/types/vendor';
import classes from './ProfileCard.module.css';

function ProfileCard({ leaderProfile }: { leaderProfile: Vendor }) {
    const theme = useMantineTheme();

    return (
        <Box
            bg={theme.other.darkBackground}
            py={{ base: 'sm', md: theme.other.cardPadding }}
            px={{ base: 'sm', md: theme.other.cardPadding }}
            style={{
                borderRadius: theme.other.cardRadius,
                minWidth: 'clamp(200px, 25vw, 400px)',
                maxWidth: '100%',
            }}
        >
            <Stack align="center" gap="xl">
                <Stack gap={0}>
                    <Image
                        src={`/images/home-bg.jpg`}
                        alt="Profile"
                        h={{ base: 100, sm: 120, md: 140, lg: 160 }}
                        radius="xl"
                        style={{
                            objectFit: 'cover',
                        }}
                    />
                    <Text 
                        className={classes.profileCardText}
                        c="white" 
                        tt="uppercase" 
                        fw={700}
                        ta="center"
                    >
                        {leaderProfile.last_name} {leaderProfile.first_name}{' '}
                        {leaderProfile.middle_name}
                    </Text>
                    <Divider
                        mx="auto"
                        size={2}
                        color={theme.other.customOrange}
                        w="80%"
                    />
                    <Text 
                        className={classes.profileCardText}
                        c={theme.other.customOrange} 
                        ta="center"
                    >
                        {leaderProfile.city}
                    </Text>
                </Stack>
                <Stack gap='md' align="center">
                    <Text 
                        className={classes.profileCardText}
                        c={theme.other.customOrange} 
                        ta="center"
                    >
                        {leaderProfile.phone}
                    </Text>
                    <Text 
                        className={classes.profileCardText}
                        c={theme.other.customOrange} 
                        td="underline"
                        ta="center"
                        style={{ wordBreak: 'break-word' }}
                    >
                        {leaderProfile.email}
                    </Text>
                    <Button
                        className={classes.profileCardButton}
                        color={theme.other.customOrange}
                        fw={500}
                        w="fit-content"
                        size="compact-md"
                    >
                        Реферальная ссылка
                    </Button>
                </Stack>
            </Stack>
        </Box>
    );
}

export default ProfileCard;
