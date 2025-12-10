import React from 'react';
import {
    Box,
    Stack,
    Text,
    Button,
    useMantineTheme,
    Container,
    Group,
    Progress,
    Paper,
} from '@mantine/core';
import { IconTree, IconLogout } from '@tabler/icons-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import classes from './ProfilePage.module.css';

export default function ProfilePage() {
    const theme = useMantineTheme();
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <Box className={classes.profilePage}>
            <Header />
            <Box className={classes.mainContent}>
                <Container
                    size="xl"
                    py={{ base: 8, sm: 10, md: 12 }}
                    px={{ base: 'xs', sm: 'sm', md: 'md' }}
                    className={classes.contentContainer}
                >
                    <Button
                        className={classes.logoutButton}
                        leftSection={<IconLogout size={16} />}
                        onClick={handleLogout}
                        bg={theme.other.cardBackground}
                        c="white"
                        radius={theme.other.buttonRadius}
                        size="sm"
                        fz={{ base: 12, sm: 14 }}
                    >
                        Выйти
                    </Button>
                    <Stack gap="sm" style={{ height: '100%', justifyContent: 'space-between', overflow: 'hidden' }}>
                        <Group align="flex-start" gap="sm" wrap="wrap" style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
                            <Stack gap="xs" style={{ flex: 0, minWidth: '280px', maxWidth: '400px' }}>
                                <Paper
                                    bg={theme.other.customYellow}
                                    p={{ base: 'xs', sm: 'sm' }}
                                    radius={theme.other.cardRadius}
                                    style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)' }}
                                >
                                    <Text
                                        fz={{ base: 14, sm: 18, md: 22, lg: 26 }}
                                        fw={700}
                                        c="white"
                                        ta="left"
                                        style={{ letterSpacing: '0.5px' }}
                                    >
                                        ЛЕСНОЙ АККАУНТ
                                    </Text>
                                </Paper>
                                <Paper
                                    bg={theme.other.customYellow}
                                    p={{ base: 'xs', sm: 'sm' }}
                                    radius={theme.other.cardRadius}
                                    style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)' }}
                                >
                                <Stack gap={4}>
                                    {/* Phone Field */}
                                <Stack gap={2}>
                                    <Box className={classes.inputField}>
                                        <Text
                                            fz={{ base: 14, sm: 16, md: 18 }}
                                            fw={500}
                                            c="white"
                                            style={{ letterSpacing: '0.3px' }}
                                        >
                                            +7 902 076 28 37
                                        </Text>
                                    </Box>
                                    <Text
                                        fz={{ base: 11, sm: 12, md: 13 }}
                                        c="white"
                                        style={{ cursor: 'pointer', paddingLeft: '4px' }}
                                        className={classes.changeLabel}
                                    >
                                        ИЗМЕНИТЬ ТЕЛЕФОН
                                    </Text>
                                </Stack>

                                {/* Email Field */}
                                <Stack gap={2}>
                                    <Box className={classes.inputField}>
                                        <Text
                                            fz={{ base: 14, sm: 16, md: 18 }}
                                            fw={500}
                                            c="white"
                                            style={{
                                                textDecoration: 'underline',
                                                textUnderlineOffset: '2px',
                                                letterSpacing: '0.2px',
                                            }}
                                        >
                                            vcojasi299@gmail.com
                                        </Text>
                                    </Box>
                                    <Text
                                        fz={{ base: 11, sm: 12, md: 13 }}
                                        c="white"
                                        style={{ cursor: 'pointer', paddingLeft: '4px' }}
                                        className={classes.changeLabel}
                                    >
                                        ИЗМЕНИТЬ ПОЧТУ
                                    </Text>
                                </Stack>

                                {/* Password Field */}
                                <Stack gap={2}>
                                    <Box className={classes.inputField}>
                                        <Text
                                            fz={{ base: 14, sm: 16, md: 18 }}
                                            fw={500}
                                            c="white"
                                            style={{ letterSpacing: '2px' }}
                                        >
                                            ************
                                        </Text>
                                    </Box>
                                    <Text
                                        fz={{ base: 11, sm: 12, md: 13 }}
                                        c="white"
                                        style={{ cursor: 'pointer', paddingLeft: '4px' }}
                                        className={classes.changeLabel}
                                    >
                                        ИЗМЕНИТЬ ПАРОЛЬ
                                    </Text>
                                </Stack>

                                {/* City Field */}
                                <Stack gap={2}>
                                    <Box className={classes.inputField}>
                                        <Text
                                            fz={{ base: 14, sm: 16, md: 18 }}
                                            fw={500}
                                            c="white"
                                            style={{ letterSpacing: '0.3px' }}
                                        >
                                            Нижний Новгород
                                        </Text>
                                    </Box>
                                    <Text
                                        fz={{ base: 11, sm: 12, md: 13 }}
                                        c="white"
                                        style={{ cursor: 'pointer', paddingLeft: '4px' }}
                                        className={classes.changeLabel}
                                    >
                                        ИЗМЕНИТЬ ГОРОД
                                    </Text>
                                </Stack>
                            </Stack>
                                </Paper>
                            </Stack>

                            {/* Right Column */}
                            <Stack gap="xs" style={{ flex: 1, minWidth: '250px' }}>
                                <Paper
                                    bg={theme.other.customYellow}
                                    p={{ base: 'xs', sm: 'sm' }}
                                    radius={theme.other.cardRadius}
                                    style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)' }}
                                >
                                    <Text
                                        fz={{ base: 12, sm: 16, md: 20, lg: 24 }}
                                        fw={700}
                                        c="white"
                                        ta="center"
                                        style={{ letterSpacing: '0.5px' }}
                                    >
                                        ЛЕСНИЧИЙ БАР
                                    </Text>
                                </Paper>
                                <Paper
                                    bg={theme.other.customYellow}
                                    p={{ base: 'xs', sm: 'sm' }}
                                    radius={theme.other.cardRadius}
                                    style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)' }}
                                >
                                    <Stack align="center" gap={2}>
                                    <Box
                                        style={{
                                            width: 'clamp(50px, 8vw, 80px)',
                                            height: 'clamp(50px, 8vw, 80px)',
                                            borderRadius: '50%',
                                            background: theme.other.cardBackground,
                                            border: '2px solid rgba(255, 255, 255, 0.5)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                                        }}
                                    >
                                        <Text
                                            fz={{ base: 24, sm: 32, md: 40 }}
                                            c="white"
                                        >
                                            👤
                                        </Text>
                                    </Box>
                                    </Stack>
                                </Paper>

                                {/* Tree Icon */}
                                <Box className={classes.treeIllustration}>
                                    <IconTree
                                        size={100}
                                        stroke={2.5}
                                        color="rgba(200, 150, 10, 1)"
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            maxWidth: '120px',
                                            maxHeight: '100px',
                                            objectFit: 'contain',
                                        }}
                                    />
                                </Box>
                            </Stack>
                        </Group>

                        {/* ПРОГРЕСС СКИДОК Section */}
                        <Stack gap="xs" style={{ flexShrink: 0 }}>
                            <Paper
                                bg={theme.other.customYellow}
                                p={{ base: 'xs', sm: 'sm' }}
                                radius={theme.other.cardRadius}
                                style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)' }}
                            >
                                <Text
                                    fz={{ base: 14, sm: 18, md: 22, lg: 26 }}
                                    fw={700}
                                    c="white"
                                    ta="left"
                                    style={{ letterSpacing: '0.5px' }}
                                >
                                    ПРОГРЕСС СКИДОК
                                </Text>
                            </Paper>
                            <Paper
                                bg={theme.other.customYellow}
                                p={{ base: 'xs', sm: 'sm' }}
                                radius={theme.other.cardRadius}
                                style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)' }}
                            >
                            <Stack gap={4}>

                            <Group gap={8} align="flex-end" wrap="wrap">
                                <Stack
                                    gap={2}
                                    style={{ flex: 1, minWidth: '200px' }}
                                >
                                    <Group justify="space-between" mb={2}>
                                        <Text
                                            fz={{ base: 14, sm: 16, md: 20 }}
                                            fw={600}
                                            c="white"
                                            style={{ letterSpacing: '0.5px' }}
                                        >
                                            297/1000
                                        </Text>
                                    </Group>
                                    <Progress
                                        value={29.7}
                                        size="sm"
                                        radius="xl"
                                        color="rgba(180, 110, 5, 1)"
                                        bg="rgba(255, 255, 255, 0.25)"
                                        style={{ height: '16px', boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)' }}
                                    />
                                    <Group justify="space-between" mt={2}>
                                        <Text
                                            fz={{ base: 11, sm: 12, md: 13 }}
                                            fw={500}
                                            c="white"
                                            style={{ opacity: 0.95 }}
                                        >
                                            10%
                                        </Text>
                                        <Text
                                            fz={{ base: 11, sm: 12, md: 13 }}
                                            fw={500}
                                            c="white"
                                            style={{ opacity: 0.95 }}
                                        >
                                            10%
                                        </Text>
                                        <Text
                                            fz={{ base: 11, sm: 12, md: 13 }}
                                            fw={500}
                                            c="white"
                                            style={{ opacity: 0.95 }}
                                        >
                                            10%
                                        </Text>
                                        <Text
                                            fz={{ base: 11, sm: 12, md: 13 }}
                                            fw={500}
                                            c="white"
                                            style={{ opacity: 0.95 }}
                                        >
                                            10%
                                        </Text>
                                    </Group>
                                </Stack>

                                <Paper
                                    p={{ base: 'xs', sm: 'sm' }}
                                    radius={theme.other.cardRadius}
                                    className={classes.explanationBox}
                                    style={{ maxWidth: '350px' }}
                                >
                                    <Text
                                        fz={{ base: 11, sm: 12, md: 13 }}
                                        c="white"
                                        ta="left"
                                        style={{ lineHeight: 1.5, letterSpacing: '0.2px' }}
                                    >
                                        С каждой покупки прогресс скидок
                                        заполняется на 1% от суммы покупок
                                    </Text>
                                </Paper>
                            </Group>
                        </Stack>
                            </Paper>
                        </Stack>
                    </Stack>
                </Container>
            </Box>
            <Footer />
        </Box>
    );
}
