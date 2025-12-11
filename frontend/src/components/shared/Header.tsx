import {
    Box,
    Button,
    Container,
    Drawer,
    Group,
    Stack,
    useMantineTheme,
    Image,
    Burger,
} from '@mantine/core';
import { IconUser } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { scrollToSection } from '@/utils/scrollToSection';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import classes from './Header.module.css';

function Header() {
    const theme = useMantineTheme();
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const [opened, { toggle, close }] = useDisclosure(false);

    const handleNavigation = (path: string, callback?: () => void) => {
        navigate(path);
        if (callback) {
            callback();
        }
        close();
    };

    const handleScrollToSection = () => {
        navigate('/');
        setTimeout(() => {
            scrollToSection('about-us');
            close();
        }, 100);
    };

    const navButtons = (
        <>
            <Button
                variant="subtle"
                color={theme.other.buttonColor}
                className={classes.mobileNavButton}
                p={{ base: 4, sm: 6 }}
                onClick={() => handleNavigation('/news')}
                fullWidth
            >
                Новости
            </Button>
            <Button
                variant="subtle"
                color={theme.other.buttonColor}
                className={classes.mobileNavButton}
                p={{ base: 4, sm: 6 }}
                onClick={() => handleNavigation('/catalog')}
                fullWidth
            >
                Каталог
            </Button>
            <Button
                variant="subtle"
                color={theme.other.buttonColor}
                className={classes.mobileNavButton}
                p={{ base: 4, sm: 6 }}
                onClick={handleScrollToSection}
                fullWidth
            >
                Команда
            </Button>
            {isAuthenticated ? (
                <Button
                    variant="subtle"
                    color={theme.other.buttonColor}
                    className={classes.mobileNavButton}
                    p={{ base: 4, sm: 6 }}
                    onClick={() => handleNavigation('/profile')}
                    fullWidth
                    rightSection={<IconUser size={16} />}
                >
                    Профиль
                </Button>
            ) : (
                <Button
                    variant="subtle"
                    color={theme.other.buttonColor}
                    className={classes.mobileNavButtonSmall}
                    p={{ base: 4, sm: 6 }}
                    onClick={() => handleNavigation('/registration')}
                    fullWidth
                    rightSection={<IconUser size={16} />}
                >
                    Регистрация
                </Button>
            )}
            <Button
                variant="subtle"
                color="red"
                className={classes.mobileNavButton}
                p={{ base: 4, sm: 6 }}
                onClick={() => handleNavigation('/admin')}
                fullWidth
            >
                Админка
            </Button>
        </>
    );

    return (
        <Box w="100%" bg={theme.other.darkBackground} className={classes.header}>
            <Container
                h="100%"
                fluid
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                px={{ base: 4, sm: 6, md: 8 }}
                py={{ base: 2, sm: 3, md: 4 }}
            >
                {/* Desktop Navigation */}
                <Group
                    w="100%"
                    justify="center"
                    gap="sm"
                    wrap="wrap"
                    style={{ gap: 'clamp(8px, 2vw, 32px)'}}
                    visibleFrom="md"
                >
                    <Button
                        variant="subtle"
                        color={theme.other.buttonColor}
                        className={classes.navButton}
                        p={{ base: 2, sm: 3, md: 4 }}
                        onClick={() => navigate('/news')}
                    >
                        Новости
                    </Button>
                    <Button
                        variant="subtle"
                        color={theme.other.buttonColor}
                        className={classes.navButton}
                        p={{ base: 2, sm: 3, md: 4 }}
                        onClick={() => navigate('/catalog')}
                    >
                        Каталог
                    </Button>
                    <Box className={classes.logoWrapper}>
                        <Image
                            src={`/images/logo.svg`}
                            className={classes.logoDesktop}
                            onClick={() => navigate('/')}
                        />
                    </Box>
                    <Button
                        variant="subtle"
                        color={theme.other.buttonColor}
                        className={classes.navButton}
                        p={{ base: 2, sm: 3, md: 4 }}
                        onClick={() => {
                            navigate('/');
                            setTimeout(() => scrollToSection('about-us'), 100);
                        }}
                    >
                        Команда
                    </Button>
                    {isAuthenticated ? (
                        <Button
                            variant="subtle"
                            color={theme.other.buttonColor}
                            className={classes.navButton}
                            p={{ base: 2, sm: 3, md: 4 }}
                            onClick={() => navigate('/profile')}
                            rightSection={<IconUser size={14} />}
                        >
                            Профиль
                        </Button>
                    ) : (
                        <Button
                            variant="subtle"
                            color={theme.other.buttonColor}
                            className={classes.navButton}
                            p={{ base: 2, sm: 3, md: 4 }}
                            onClick={() => navigate('/registration')}
                            rightSection={<IconUser size={14} />}
                        >
                            Регистрация
                        </Button>
                    )}
                    <Button
                        variant="subtle"
                        color="red"
                        className={classes.navButton}
                        onClick={() => navigate('/admin')}
                    >
                        Админка
                    </Button>
                </Group>

                {/* Mobile Navigation - Below md (768px) - phones and small tablets */}
                <Group
                    w="100%"
                    justify="space-between"
                    px="xs"
                    h='clamp(50px, 5vh, 200px)'
                    hiddenFrom="md"
                >
                    <Burger
                        opened={opened}
                        onClick={toggle}
                        size="sm"
                        color={theme.other.buttonColor}
                    />
                    <Box className={classes.logoWrapper} style={{ width: 'clamp(50px, 6vw, 80px)' }}>
                        <Image
                            src={`/images/logo.svg`}
                            className={classes.logoMobile}
                            onClick={() => navigate('/')}
                        />
                    </Box>
                    <Box w={40} /> {/* Spacer to center logo */}
                </Group>
            </Container>

            {/* Mobile Drawer */}
            <Drawer
                opened={opened}
                onClose={close}
                title="Меню"
                position="right"
                padding="md"
                size="xs"
                styles={{
                    content: {
                        backgroundColor: theme.other.darkBackground,
                    },
                    header: {
                        backgroundColor: theme.other.darkBackground,
                        borderBottom: `1px solid ${theme.other.buttonColor}`,
                    },
                    title: {
                        color: theme.other.buttonColor,
                        fontSize: 'clamp(32px, 4vw, 40px)',
                    },
                }}
            >
                <Stack gap="md">{navButtons}</Stack>
            </Drawer>
        </Box>
    );
}

export default Header;
